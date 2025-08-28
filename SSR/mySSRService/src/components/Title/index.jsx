import { useState } from 'react'
import styles from './index.css'

const Title = ()=>{

  const [count,setCount] = useState(0)

  return <div>
    <h1>This is TitleComponent:{count}</h1>
    <button className={styles.btn} onClick={()=>{
      setCount(count+1)
    }}>+1</button>
  </div>
}

export default Title
