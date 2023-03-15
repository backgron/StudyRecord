# TypeORM



## 数据库


### 连接数据库
```ts
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "",
    port: 3306,
    username: "",
    password: "",
    database: "",
    synchronize: true, 
    entities: [User],
})

AppDataSource.initialize().then(res=>{
  console.log('数据库连接成功')
}).catch(err=>{
  console.log('数据库连接失败',err)
})


```

### 设置实例

```ts
import { Auth } from "@/typings"
import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique:true,nullable:false,length:35})
    @Index()
    email: string

    @Column({nullable:false,default:"123456",length:18})
    password?:string

    @Column({length:15})
    name?: string

    @Column()
    giteeEmail?:string

    @Column()
    giteeName?:string

    @Column({nullable:false,default:Auth.developer})
    auth?:Auth
}
```



## 查询

### 查询所有

```ts
const allUser = await AppDataSource.manager.find(User)
```

### 条件查询或（满足其一）

```ts
const user = await AppDataSource.manager.findOne(User,{
    where:[
      {name:condition},
      {email:condition},
      {id:parseInt(condition)}
   ]
})
```

### 条件查询与（全部满足）

```ts
const user = await AppDataSource.manager.findOne(User,{
    where:{name:condition,email:condition,id:parseInt(condition)},
})
```

### 分页查询

```ts
const users = await AppDataSource.manager.find(User,{
    skip:(page-1)*limit,
    take:limit
})
```

## 添加

### 添加一条数据

```ts
 AppDataSource.manager.save(user)
```

## 删除

### 删除一条数据

```ts
 AppDataSource.manager.delete(entity,condition)
```