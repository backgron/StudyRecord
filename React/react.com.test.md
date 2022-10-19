# React 组件测试

## npm包
  + jest
  + @testing-library/jest-dom
  + @testing-library/react

## 一些方法
  #### import  { xxx }  from '@testing-library/react'
  ```ts
  render(ReactElement)   //将react元素挂载到dom上
  ```
    

## 一些断言
  #### import '@testing-library/jest-dom'
  ```ts
  .toHaveClass('anyClassName');  // 判断元素是否包含此class
  ```