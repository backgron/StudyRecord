# React

+ 用于构建用户界面的JavaScript库
+ 声明式：不同于命令式，让交互式UI变得轻而易举。
+ 组件化：创建拥有各自状态的组件，提高复用，方便开发。
+ 一次学习，随处编写：虚拟DOM根据不同的渲染引擎可以兼容各个平台

## 生命周期

### 生命周期状态

+ 生命周期主要分为三个状态：
  + Mounting（挂载）：已经插入真实DOM
  + Updating（更新）： 正在被重新渲染
  + Unmounting（卸载）：已经移除真实DOM

### 生命周期钩子函数

+ 生命周期中的钩子函数：
  + Mounting （挂载）阶段：
    1. **constructor() **: 在React组件挂在之前，会调用它的构造函数
    2. getDerivedStateFromProps()：在调用render方法之前执行
    3. **render()**：此方法是class组件中必须实现的方法
    4. **componentDidMount()**：在组件挂在后（插入DOM树后）调用
  + Updating （更新阶段）：
    1. getDerivedStateFromProps()：在调用render方法之前调用，根据shouldComponentUpdate()的返回值，判断React组件的输出是否受当前state或props更改的影响。
    2. **shouldComponentUpdate()**：当props或者state发生变化时，会在渲染执行之前被调用。
    3. **render()**：render方法
    4. getSnapshotBeforeUpdate()：在最近一次渲染输出（提交到DOM节点）之前调用
    5. **componentDidUpdate()**：在更新后立即被调用
  + Unmounting （卸载阶段）：
    1. **componentWillUnmount()**：在组件卸载销毁之前调用。

### 生命周期主要钩子函数和用途

+ **render()**：
  + 返回React元素 / JSX
  + 返回Fragments（可以不产生多余的div)
  + 返回Protals
  + 字符串或者数值类型（渲染为DOM中的文本节点）
  + 布尔类型或者null （什么都不渲染）

+ **constructor(props)**：
  + 如果不初始化state或不进行方法绑定，则不需要为React组件实现构造函数。
  + 通过给 this.state 赋值初始对象来初始化内部state。
  + 为事件处理函数绑定实例 **this.handle = this.handle.bind(this)**
  + 注意：
    1. 调用**super(props) **来获取 this.props
    2. 在构造函数中不要调用setState()方法，直接为this.state赋值
+ **componentDidMount()**：
  + 在组建挂在DOM后立即调用
  + 可以进行DOM操作
  + 通过网络请求获取数据
  + 添加订阅
  + 可以直接调用 setState() ，会触发额外渲染(render) 但此次渲染会发生在浏览器更新屏幕之前，中间状态不会被用户看见
+ **componentDidUpdate(prevProps, prevState, snapshot)**：
  + 在组建更新后被调用，首次渲染不会执行
  + 可以进行DOM操作
  + 通过网络请求获取数据（需要props发生变化）
  + 直接调用setState()，但是需要被包含在一个条件语句里。不然可能会进入渲染死循环。
  + 注意：如果shouldComponentUpdate() 返回false，则不会调用componentDidUpdate()
+ **componentWillUnmount()**：
  + 会在组件卸载以及销毁之前调用。
  + 清理定时器
  + 取消网络请求
  + 不应该调用 **setState()** 组件卸载后永远不会重新渲染
+ **shouldComponentUpdate(nextProps , nextState)**：
  + 根据返回值判断React组建的输出是否受state或者props更改的影响。默认情况每次变化都渲染。
  + 会在渲染执行前被调用，首次渲染或者使用forceUpdate()时不会调用该方法
  + 可以考虑使用内置的**PureComponent**组件
  + 不建议在shouldComponentUpdate()中进行深层次比较，会非常影响效率。

## Hooks

### Hooks的优势

+ 在组件之间复用逻辑很难，Hook 在无需修改组件结构的情况下复用状态逻辑
+ 生命周期函数将很多不相关的逻辑放在同一个生命周期函数中，逻辑变得不清晰。Hook 将组件中相互关联的部分拆成更小的函数
+ 减少了class组件中的this带来的开发不便。

### 常用的Hook

+ **useState()**

  ```jsx
  const [count,setCount] = useState(0)
  setCount(count + 1)
  ```

  + 一般来说，在函数退出后变量就会消失，而state中的变量会被React保留
  + useState()方法中唯一的参数是对应state的初始值
  + useState()方法的返回值为一个数组，第一个元素是state，第二个元素是setState。可以通过数组结构获取。

+ **useEffect()**

  ```jsx
  useEffect(()=>{
      console.log('useEffect')
      console.log('渲染')
      return(()=>{
          console.log('卸载')
      })
  },[a,b])
  ```

  + useEffect() 中的第一个参数会在DOM更新后执行
  + 利用闭包可以获取到组件中的变量
  + useEffect() 默认会在每次渲染/更新后执行。
  + 第一个参数的函数体会在每次渲染/更新后执行
  + 第一个参数的返回值也是一个函数，会在组件卸载时执行。
  + 第二个参数是一个数组。可以控制在哪个状态改变时执行useEffect() 否则不执行。
  + 不写第二个参数：每次都执行
  + 第二个参数为空数组：只在第一次渲染时执行。

+ **useContext()**

  ```jsx
  export const MyContext = React.createContext('默认值')
  // 上层JSX
  <MyContext.Provider value={'context赋值'}>
      //下层JSX
      <UseContextComponent />
  <MyContext.Provider> 
  
  //下层组件获取Context  (需要引入MyContext对象)
  import MyContext from '../'
  const value = useContext(MyContext)
  ```

  + 当前的`context`值由上层组件中距离最近的`<MyContext.Provider>`的`value prop`决定
  + 当组件上层最近的`<MyContext.Provider>`更新时，该`Hook`会触发重新渲染，并使用最新传递给`MyContext provider`的`context value` 值。即使祖先使用 `React.memo`或者`shouldConponentUpdate`，也会在组件本身使用`useContext`时重新渲染。
  + 如果开销较大，可以使用`memoization`来优化

+ **useReducer**

  ```jsx
  function reducer(state,action){
      switch(action.type){
         case 'decrement':
           return {count:state.count+1}
         default:
           throw new Error();
      }
  }
  const [state,dispatch] = useReducer(reducer,initialState,init)
  //使用：
  <span>{state}</span>
  <button onClick={()=>dispatch({type:'decrement'})}></button>
  ```

  + `React` 会确保`dispatch`函数标识是稳定的，不会在组件重新渲染时改变。所以可以不再`useEffect`或者`useCallback`的依赖列表中添加`dispatch`
  + 第一个参数为`reducer`
  + 第二个参数为`state`的初始值`initialState`
  + 第三个参数为`init`方法，可以惰性创建初始的`state`，这样`state`将被设置为`init(initialArg)`
  + 跳过`dispatch`:如果`Reducer Hook`的返回值与当前的`state`相同，React将跳过自组建的渲染以及副作用的执行 (通过`Object.is`来比较`state`)

+ **useCallback()**

  ```jsx
  const memoizedCallback = useCallback(
  	()=>{
          doSometion(a,b)
      },
      [a,b]
  )
  ```

  + 返回一个`memoized`回调函数。
  + 相当于`useMemo(()=>fn,deps)`
  + 将当前的方法引用缓存起来，不会再每次组件重新渲染时都创建一个新的方法。

+ **useMemo()**

  ```jsx
  const memoizedValue = useMemo(()=>{
     	computeExpensiveValue(a,b)
  	},
      [a,b]
  )
  ```

  + 返回一个`memoized`值
  + 传入的`useMemo`的函数会在渲染期间执行。
  + 将计算结果缓存起来，当依赖数组`[a , b]` 不发生变化时，不进行重新计算。
  + 如果没有提供依赖数组，`useMemo`在每次渲染时都会计算新的值。
  + 注意：**可以把`useMemo`作为性能优化的手段，但不要把它当作语义上的保证**将来，React可能会选择"遗忘"一些memoized的值，并在下次渲染时重新计算他们，比如离屏组件释放内存。可以先编写没有useMemo的情况也可以执行的代码，然后在添加useMemo。

+ **useRef()**

  ```jsx
  const inputRef = useRef(initialValue);
  <input type='text' ref={inputRef}>
  ```

  + useRef() 返回一个可变的ref对象，其`.current`属性被初始化为传入的参数(`initialValue`)。返回的ref对象在组件的整个生命周期存在。
  + useRef 像是可以在其`.current`属性中保存一个可变值的“盒子”
  + 以`<input type='text' ref={inputRef}>`形式传入组件，无论该节点如何改变，React都会将ref对象的`.current`属性设置为相应的DOM节点。
  + `useRef()` 和 `ref`属性不同，他可以保存任何可变的值，类似于class中使用实例字段的方式。
  + `ref`创建的是一个普通的Javascript对象，而`useRef()`和自建的`{current:...}`唯一的区别是`useRef()`会在每次渲染时返回同一个ref对象
  + `ref`对象发生变化时，`useRef`不会通知你。变更`.current`属性不会引发组件重新渲染。

+ **useLayoutEffect()**

  ```jsx
  useLayoutEffect(()=>{}.[])
  ```

  + 和`useEffect`相同，会在所有DOM变更之后同步调用effect。
  + 推荐优先使用`useEffect`
  + 注意：不同于`useEffect`
    1. `useEffect`会在DOM渲染后执行，`useLayoutEffect`会在DOM渲染前执行
    2. `useEffect`不会阻塞DOM，而`useLayoutEffect`会阻塞DOM
  + 如果我们希望某些操作发生之后再更新DOM，可以使用`useLayoutEffect`

## 性能优化

### React.PureComponent 组件

+ **类组件**通过继承`React.PureComponent`对props进行浅比较（深比较开销很大，可能会得不偿失）。

### React.memo 缓存组件

+ 通过React.Memo 可以缓存组件，Memo方法传入一个组件，在这个组件状态没有变化时，不会进行重新渲染。
+ **高阶组件**：类组件和函数组件都可以使用。
+ `memo`的第二个参数接受一个函数，可以自定义渲染逻辑，返回true不进行渲染，返回false进行渲染。

### shouldComponentUpdate() 生命周期

+ 根据不同的渲染条件自定义 shouldComponent 来减少不必要的渲染。
+ 返回true进行渲染，返回false不进行渲染。

### useEffect() Hooks

+ 传入第二个参数（依赖参数），减少不必要的执行。
+ 注意在组件卸载时清理掉定时器、注册的全局事件等。

### 多个React组件优化 & key优化

+ key是react组建的身份证号（同级只能有一个）
+ 添加了key之后，react在DIFF时就知道那个元素是重新添加的还是之前的改变的。

### useMemo() 缓存大量的计算

+ 通过useMemo() 来缓存开销比较大的计算（不安全，可能会被删除缓存）

### 使用Fragment来减少额外的div节点

+ 通过Fragment代 替不必要的根节点。
+ 也可以通过空标签 `<> </>`来包裹，但是Fragment可以加一些属性。

### 使用组件懒加载  lazy方法

+ lazy 方法接受一个函数，函数的返回值为 import 命令

```jsx
import {lazy} from 'react'
import Home = lazy(()=>import ('./Home'))

//也可以在组件内部根据条件进行组件懒加载。
if(true){
    lazy(()=>import('./Home'))
}
```

### 类组件this 指向问题

+ constructor()   **最佳方法**

  ```jsx
  constructor(){
      this.handle = this.handle.bind(this)
  }
  //构造函数只执行一次，所以函数绑定this的操作也只执行一次
  ```

+ 使用箭头函数

  ```jsx
  handle = ()=>{}
  //通过箭头函数是将函数挂载到实例上，而不是原型链上，所以每次复用组件的时候都会创造一个自己的相同的实例方法。
  ```

+ 绑定事件时绑定this

  ```jsx
  <button onClick={this.handle.bind(this)}></button>
  //render方法每次执行都会调用bind方法生成新的函数实例
  ```

### 避免使用内联样式属性

+ 内联样式属性添加的内联样式为JavaScript对象，需要被先转换为等效的CSS样式规则，然后应用到元素，涉及到脚本执行的开销。
+ 最好将CSS文件导入，能通过CSS做的事情就不要用JS做，JS操作DOM开销更大一点。

### key 优化

+ 给列表或者变动的组件元素加上key值，可以优化更新速度。

## Fiber

## 数据通讯 & 状态管理  

### 父组件传递给子组件

1. 通过`props`传递
2. 多层嵌套时通过`context`传递

### 子组件向父组件传值

1. `render props`

   ```jsx
   // 父组件通过props将封装好的对象传给子组件
   <Child cb={callback}/>
   // 子组件调用传入的方法，将需要传递的值通过callback传参形式传回
   cb(args)
   ```

2. 状态提升

   ```jsx
   const [args,setArgs] = useState();
   <Child args={args} setArgs={setArgs}/>
   //子组件通过setArgs改变args传递值
   ```

### 兄弟传值

1. 以父组件为介质传递
2. 以父组件为介质进行状态提升

### Redux & useReducer

+ 基本概念

  1. Store对象：包含所有数据，是一个容器，整个应用只能由一个Stroe
  2. State对象：包含所有数据，如果想得到某个时点的数据，就要对Store生成快照，这种时点的数据集合就叫做State
  3. Action对象：State的变化会导致View的变化，但是用户接触不到State，只能接触到View，State的变化必须是View导致的，Action就是View发出的通知。表示State应该要发生变化了。
  4. dispatch方法：是View发出Action的唯一方法。
  5. reducer方法：Store收到Action以后必须给出一个新的State，这样View才会发生变化，这种State的计算过程就是reducer

+ 基本流程：

  1. 创建`Stroe`
  2. 创建`action`
  3. 创建`reducer`
  4. 通过`dispatch`发送`action`
  5. `Store`调用`reducer`并传入当前`state`和收到的`action`
  6. `reducer`返回新的`state`
  7. 通过`Stroe.getState()`获取状态(`state`)

+ 其他

  1. 使用`useReducer()`不需要手动管理store

     ```jsx
     const [state,dispatch]=useReducer(reducer,initialState,init)
     ```

  2. redux中的`connect`方法允许我们将`store`中的数据作为`props`绑定到组件上

     ```jsx
     connect([mapStateToProps],[mapDispatchToProps],[mergeProps],[options])
     ```

## 高阶组件HOC 



## React.memo 

## 自定义hooks 

## 渲染流程 

## 虚拟DOM & DIFF 算法 

+ 虚拟DOM：React元素（普通对象/JSX）
+ 虚拟DOM树：React元素组成的树形结构

### 协调

+ 在`state`和`props`更新时，`render()`方法会返回一个和原来不同的虚拟DOM树，React基于这两个树的差别来判断如何更有效率的更新真实的DOM树（UI）
+ 原则：
  1. 两个不同类型的袁术会产生出不同的DOM树
  2. 可以通过key prop 来暗示那些子元素在不同的渲染下能保持稳定。

### DIFF算法

+ **对比不同类型的元素**

  + 当根节点为不同类型的React元素时，React会卸载原有的树，并建立了新的树。
  + 如：`<a>`变成`<img>` 或者组件 `<Button>`变为`<Input>`
  + 当卸载原有的树的时对应的真实DOM节点也会被卸载，组件执行`componentWillUnmount()`方法，所有关联的`state`也会被销毁。
  + 当建立一棵新的树时，对应的节点会被插入到真实的DOM中。组件执行`componentWillMount()`方法，之后执行`componentDidMount()`方法。

+ **对比同一类型的元素**

  + 当对比两个相同类型的React元素时，React会保留DOM节点，仅仅对比对更新有改变的属性。

    ```jsx
    <div className='before' title='stuff'></div>
    <div className='after' title='stuff'></div>
    //通过对比 React只会修改对应的className属性，style样式也一样
    ```

+ **对比同一类型的组件元素**

  + 当一个组件更新时，组件实例保持不变，这样`state`在跨越不同的渲染时保持一致。React将更新该组件实例的`props`以跟最新的元素保持一致
  + 调用组件的render()方法，递归以上的过程。

+ **对子节点进行递归**

  + 在默认条件下，递归DOM节点子元素时，React会同时遍历两个子元素列表，产生差异时生成一个`mutation`
  + 在子元素列表尾部新增元素时开销较小。React会先匹配前面元素对应的树，然后插入元素。
  + 在子元素头部插入的话开销比较大。React会对每一个子元素`mutate`，并替换所有的子元素。
  + 通过给子元素绑定`key`可以让React知道子元素是变化还是移动

## Key的作用 

+ 当子元素拥有`key`时，React使用`key`来匹配原有树上的子元素。
+ 头部插入节点将变得高效起来
+ `key`需要在**同级**保持唯一
+ 使用`index`作为`key`的话，在元素不进行重新排序时比较合适，如果一旦修改顺序，DIFF就会变得很慢
+ 当基于下标的组件进行排序时，组件实例是基于他们的`key`决定是否更新，修改顺序后回到是非受控组件的`state`（比如输入框）可能会相互篡改。

## Refs & DOM

## JSX

+ JSX是JavaScript的语法扩展，可以很好的描述UI。
+ JSX可以防止注入攻击（XSS）
+ Babel会把JSX翻译成`React.createElement()`函数。

## Portals

## Fragments

## 错误边界
