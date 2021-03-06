# MongoDB

## 数据查询 

```js
//全部查询 
db.collectionName.find()
//条件查询                 小于         以zhang开头         分数为 80或90
db.collectionName.find({age:{$gt:20},name:/^zhang/,$or[{"score":80},{"score":90}]})
//查询字段                  1显示  0不显示
db.collectionName.find({},{name:1,_id:0,age:1})
//排序               1正    -1逆
db.collectionName.find().sort({name:-1})
//查询个数
db.collectionName.find().limit(3)
//跳过几个
db.collectionName.find().skip(2)
//查询第一条数据
db.collectionName.findOne()  =  db.collectionName.find().limit(1)
//查询数量
db.collectionName.find().count()

//分页查询
db.collectionName.find().skip(0).limit(3)   //第一页
db.collectionName.find().skip(3).limit(3)	//第二页
db.collectionName.find().skip(6).limit(3)	//第三页

//查询执行时间信息
db.collectionName.find().explain("executionStats")

//查询数组中是否包含某个数
db.tests.find({arr:{$elemMatch:{$eq:12}}})
```

## 索引

```js
//给name字段添加索引
db.collectionName.createIndex({'name':1})
//联合索引   1代表索引按升序存储    -1代表索引按降序存储
db.collectionName.ensureIndex({"name":1,"age":-1})
//获取当前集合的索引
db.collectionName.getIndexes()
//删除name索引
db.collectionName.dropIndex({"name":1})
//删除所有索引
db.collectionName.dropIndexes()

//配置索引
db.collectionName.createIndex({"name":1},option)
option = {"unique":true}  //唯一索引
option = {"background":true}  //在后台添加
```

## 聚合管道    -   基本查询

```js
db.collectionName.aggregate([{
    $project: {         //显示的字段
      trade_no: 1,
      all_price: 1
    }
  },
  {
    $match: {          //条件筛选
      all_price: {
        $gte: 90
      }
    }
  },
  {
    $sort: {         //排序
      all_price: -1
    }
  },
  {                 
    $limit: 2        //查询个数
  },
  {
    $skip: 1        //跳过个数
  }
])
```

## 聚合管道 - 双表联合查询

```js
db.collectionName.aggregate([{
  $lookup: {                   //联合查询 
    from: 'collectionName2',   //关联的表 
    localField: 'order_id',    //当前表中用于和关联表匹配的字段 
    foreignField: 'order_id',  //关联表中用于和当前表匹配的字段
    pipeline:[                 //副表的管道
        {
            $project:{_id:0}
        }
    ],
    as: 'item'                 //查找到的数据放到item中
  }
}, {
  $match: {                    //基本查询中的条件查询
    "all_price": {
      $gte: 90
    }
  }
}])
```

## 聚合管道 - 多表联合查询

```js
db.collectionName.aggregate([{
  $lookup: {                   //联合查询 
    from: 'collectionName2',   //关联的表 
    localField: 'order_id',    //当前表中用于和关联表匹配的字段 
    foreignField: 'order_id',  //关联表中用于和当前表匹配的字段
    as: 'item2'                 //查找到的数据放到item中
  }
},{
  $lookup: {                   
    from: 'collectionName3',   
    localField: 'order_id',    
    foreignField: 'order_id',  
    as: 'item3'                 
  }
},{
  $match: {                    //基本查询中的条件查询
    "all_price": {
      $gte: 90
    }
  }
}])
```

## 备份与还原    导出与导入

+ 备份/导出

  ```js
  mongodump -h dbhost -d dbname -o dbdirectory
  ```

  ```js
  mongodump -h 127.0.0.1 -d student -o C:\User\...
  ```

+ 还原/导入

  ```js
  mongorestore -h dbhost -d dbname <path>
  ```

  ```js
  mongorestore -h 127.0.0.1 -d student C:\User\...
  ```

# Node 中使用mongodb

## mongodb包

### 安装 

  ```js
  npm i mongodb --save--dev
  ```

### 创建

  ```js
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";
   
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("数据库已创建!");
    let dbo = db.db("dbName")
      ...
      
    db.close();
  });
  ```

### 插入一条数据

  ```js
  let myObj = {
          name:"name",
          age:20
      }
  dbo.collection('collectionName').insertOne(myObj,function(error,result){
          if(error){
              return console.log("插入失败",error)
          }else{
              return console.log("插入成功")
          }
      })
  ```

### 删除一条数据

  ```js
    dbo.collection('stu').deleteOne({
      name: "lisi",
      age: 27
    }, function (error, result) {
      if (error) {
        console.log(error);
        console.log("删除错误");
      } else {
        console.log(result);
        console.log("删除成功");
        db.close()
      }
    })
  ```

### 查询数据

  ```js
  async function such(dbo, db) {
    let list = []
    let data = dbo.collection('stu').find({})
    await data.forEach((item) => {
      list.push(item)
    })
    console.log('查询成功');
    db.close()
    return list
  }
  ```


## mongoose包

### 安装

  ```npm
  npm i mongoose
  ```

### 创建

  ```js
  const mongoose = require('mongoose')
  
  mongoose.connect('mongodb://127.0.0.1:27017/student?authSource=admin&authMechanism=SCRAM-SHA-1', {
    useNewUrlParser: true
  }, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('数据库连接成功');
    }
  })
  ```

### 定义数据表映射  Schema    

  ```js
  //定义数据表（集合的）映射   字段名和数据库保持一致
  var stuSchema = mongoose.Schema({
    name: String,
    age: Number,
    status: {
      type: Number,
      default: 1
    }
  })
  ```

### 定义model操作数据库

  ```js
  var StuModel = mongoose.model("Stu", stuSchema, 'stu')
  ```

### 操作数据库 

+ 查找 StuModel.find()

  ```js
  StuModel.find({}, function (err, doc) {
    if (err) {
      console.log(err);
      return
    } else {
      console.log(doc);
    }
  })
  ```

+ 添加  stu.save

  ```js
  var stu = new StuModel({
    name: 'xiaoli',
    age: 30
  })
  
  stu.save(function (err) {
    if (err) {
      console.log('添加失败');
      return
    } else {
      console.log("添加成功");
    }
  })
  ```

+ 扩展方法

  ```js
  //静态方法  添加到Schema.statics上   要写再创建 Schema的下面   创建Module的上面
  stuSchema.statics.findByAge=function(age,callBack){
      //this  就是  stuModule
      this.find({"age":age},function(err,docs){
          callBack(err,docs)
      })
  }
  
  //通过 Module使用
  stuModule.findByAge(20,function(err,docs){
      //处理结果
  })
  
  
  //实例方法  添加到Schema.methods上
  stuSchema.methods.print=function(){
      console.log('这是一个实例方法')
      console.log(this)  // this 是stu实例
  }
  
  //通过实例调用
  stu.print()
  ```

+ 添加索引

  ```js
  var stuSchema = mongoose.Schema({
      sn:{
          type:Number,
          unique:true   //添加唯一索引
      },
      name:{
          type:String,
          index:true    //添加普通索引
      }
  })
  ```

+ 聚合管道

  ```js
  OrderModel.aggregate([
      {
          $lookup:{
              from:'order_item',
              localField:'order_id',
              foreignField:'order_id',
              as:'item'
          }
      },
      {
          $match:{
              "all_price":{$gt:90},
              //mongoose 中获取 ObjectId 的方法
              //  mongoose.Types.ObjectId('5b74...')
              "_id":mongoose.Types.ObjectId('5b74...')
          }
      }
  ],function(err,docs){
      //需要将docs转换
      console.log(JSON.stringify(docs))
  })
  ```

  

### 格式化：预定义修饰符和自定义修饰符

```js
var stuSchema = mongoose.Schema({
  name: {
    //  自带的预定义修饰符
    type: String,  //定义类型
    trim: true, //去掉左右空格
    lowercase: true, //转小写
    uppercase: true, //转大写
    default: "noName" //默认值
  },
  age: {
    type: Number,
    //自定义修饰符：增加数据的时候进行处理
    set(params) { //params 是传入的 age
      let setAge = params
      return setAge //  setAge为 实际保存到数据库的值
    },
    get() {
      //没什么用   不是修改从数据库中获取的值
      //知识修改 获取实例时的值  stu=new Stu({}).age
    }
  },
  status:{
  	type:Number,
    default:1
  }
})
```

### 数据校验

```js
//定义数据表（集合的）映射   字段名和数据库保持一致
var stuSchema = mongoose.Schema({
  name: {
  	type:String,
  	maxlength:10,   //最大长度
    minlength:2,    //最小长度
    match:/^zh(.*)/i,    //正则，以zh开头
    require:true   //必须
  },
  age: {
  	type:Number,
    max:100,     //最大值（只能在Number)
    min:0,		//最小值（只能在Number)
  	validate:function(age){    //自定义数据校验规则
        return age % 2 === 0
    }
  },
  status: {
    type: Number,
    default: "success",   //默认值
    enum:[    //结果枚举 只能为 ‘success'或者'error'  (只能在String)
        "success",
        "error"
    ]
  }
})
```