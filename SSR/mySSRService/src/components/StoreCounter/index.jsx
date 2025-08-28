import { connect } from 'react-redux'
import {increase, decrease} from '../../store/actions/counter'

 function StoreCounter({ number = 0, onIncrease, onDecrease }) {
  return (
    <>
      <h1>Redux Counter：</h1>
      <button onClick={onIncrease}>增加</button>
      <strong style={{ margin: '0 10px' }}>{number}</strong>
      <button onClick={onDecrease}>减少</button>
    </>
  )
}

const mapStateToProps = (state) => ({
  number: state.counter
})

const mapDispatchToProps = (dispatch) => ({
  onIncrease: () => dispatch(increase()),
  onDecrease: () => dispatch(decrease())
})

export default connect(mapStateToProps, mapDispatchToProps)(StoreCounter)
