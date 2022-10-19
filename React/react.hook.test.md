# React 组件测试

## npm包
  + jest
  + @testing-library/react-hooks
  + @testing-library/react

## 一些方法
  #### import { renderHook, act } from '@testing-library/react-hooks'
  ```ts
  renderHook(()=>Object))   // render内部的hook
  act()  // 执行hook内部方法（renderHook返回值可以返回内部方法）
  ```
    

## 一些断言
