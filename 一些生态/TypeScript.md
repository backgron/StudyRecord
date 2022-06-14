# TypeScript

## 类型

### never 

+ 被定义`never`表示没有返回值类型即程序无法执行到返回结果 如死循环、报错
+ `never` 是所有类型的子类型

### void

+ 函数被定义`void`表示返回为空，返回值会为`undefined`
+ 变量被定义`void`类型后，只能复制为`undefined`或者`null`

### any

+ 任何类型 / 动态类型
+ 所有类型都可以是any类型

### unknow

+ 

### 联合类型 A | B

+ 可以是A或者是B

### 交叉类型 A & B

+ 同时满足类型A和B

## 关键字

### keyof

### extends

### in

### infer

### typeof

## 语法

### 三元表达式 A ? B ：C

## 内置工具

### Partial  将一个类型的属性全部变为可选

+ 定义

  ```typescript
  type Partial<T> = {
      [P in keyof T]?: T[P];
  };
  ```

+ 使用

  ```typescript
  interface Student {
    name: string
    age: number
  }
  // 不写age也不会报错
  let student: Partial<Student> = {
    name: "name",
  }
  ```

### Required 将一个类型的属性变为全部必选

+ 定义

  ```typescript
  type Required<T> = {
      [P in keyof T]-?: T[P];
  };
  ```

+ 使用

  ```typescript
  interface Student {
    name?: string
    age?: number
  }
  // 不写age也会报错
  let student: Required<Student> = {
    name: "name",
  }
  ```

### Readonly 将一个类型的属性全部变为只读状态

+ 定义

  ```typescript
  type Readonly<T> = {
      readonly [P in keyof T]: T[P];
  };
  ```

+ 使用

  ```typescript
  interface Student {
    name?: string
    age?: number
  }
  
  let student: Readonly<Student> = {
    name: "name",
    age:15
  }
  // 报错，提示name为只读属性
  student.name='other'
  ```
  

### Record 构造一个字面量对象 Type

+ 定义

  ```typescript
  type Record<K extends keyof any, T> = {
      [P in K]: T;
  };
  ```

+ 使用

  ```typescript
  type Student = Record<"name" | "age", string | number>
  
  //等价于
  type Student = {
    name: string | number
    age: string | number
  }
  ```
  
+ 使用2

  ```typescript
  type Key = "name" | "age"
  type Value = { thisValueIs: string }
  
  type Res = Record<Key, Value>
  //等价于
  type Res = {
    name: Value
    age: Value
  }
  ```

  

### Pick 从一个Type中选出一些属性来构造一个新的Type

+ 定义

  ```typescript
  type Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };
  ```

+ 使用

  ```typescript
  interface Student {
    name: string
    age: number
    sex: 0 | 1
  }
  
  type pickStudent = Pick<Student, "name" | "sex">
  
  //等价于
  type pickStudent = {
    name: string
    sex: 0 | 1
  }
  ```

### Omit 从一个Type中删除一些属性，用剩下的构造一个新的Type

+ 定义

  ```typescript
  type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
  ```

+ 使用

  ```typescript
  interface Student {
    name: string
    age: number
    sex: 0 | 1
  }
  
  type omitStudent = Omit<Student, "name" | "sex">
  
  //等价于
  type omitStudent = {
    sex: 0 | 1
  }
  
  ```

### Exclude 排除一个联合类型中的某一些类型，来构建一个类型

+ 定义

  ```typescript
  type Exclude<T, U> = T extends U ? never : T;
  ```

+ 使用

  ```typescript
  type uniteType = string | number | Object
  
  type ExcludeUite = Exclude<UniteType, string>
  
  //等价于
  type excludeUite = number | Object
  ```

### Extract 提取一个联合类型中的某些类型，来构造一个新的类型

+ 定义

  ```typescript
  type Extract<T, U> = T extends U ? T : never;
  ```

+ 使用

  ```typescript
  type Student = {
    name: string
    age: number
  }
  
  type UniteType = string | number | Student
  
  type ExtractUite = Extract<UniteType, Student>
  
  //等价于
  type ExtractUite = Student
  
  ```

### Readonly 将一个类型的属性全部变为只读状态

+ 定义

  ```typescript
  type NonNullable<T> = T extends null | undefined ? never : T;
  ```

+ 使用

  ```typescript
  type Student = {
    name?: string
    age: number
    other: undefined
  }
  
  type NonNullableStudent = NonNullable<Student | undefined | string>
  
  //等价
  type NonNullableStudent = Student | string
  ```

### Readonly 将一个类型的属性全部变为只读状态

+ 定义

  ```typescript
  ```

+ 使用

  ```typescript
  ```

### Readonly 将一个类型的属性全部变为只读状态

+ 定义

  ```typescript
  ```

+ 使用

  ```typescript
  ```

### Readonly 将一个类型的属性全部变为只读状态

+ 定义

  ```typescript
  ```

+ 使用

  ```typescript
  ```

### Readonly 将一个类型的属性全部变为只读状态

+ 定义

  ```typescript
  ```

+ 使用

  ```typescript
  ```

### Readonly 将一个类型的属性全部变为只读状态

+ 定义

  ```typescript
  ```

+ 使用

  ```typescript
  ```

### Readonly 将一个类型的属性全部变为只读状态

+ 定义

  ```typescript
  ```

+ 使用

  ```typescript
  ```

### Readonly 将一个类型的属性全部变为只读状态

+ 定义

  ```typescript
  ```

+ 使用

  ```typescript
  ```

### Readonly 将一个类型的属性全部变为只读状态

+ 定义

  ```typescript
  
  ```

+ 使用

  ```typescript
  ```

### Readonly 将一个类型的属性全部变为只读状态

+ 定义

  ```typescript
  ```

+ 使用

  ```typescript
  ```

## 其他

### 练习：

+ https://github.com/type-challenges/type-challenges/blob/master/README.zh-CN.md 
