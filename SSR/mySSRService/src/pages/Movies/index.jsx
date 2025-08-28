import StoreCounter from '@/components/StoreCounter'
import { useEffect } from 'react'
import { fetchMovies } from '@/store/actions/movies'
import { connect } from 'react-redux'

const Movies = ({ movies, loadMovies }) => {
  useEffect(() => {
    if (window.requestPath === '/front/movies') return

    loadMovies()
  }, [])

  return (
    <>
      <h1>Movies Page</h1>
      <StoreCounter />
      <h1>渲染：</h1>
      <ul>
        {movies.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  )
}

Movies.loadData = (store) => {
  console.log('Movies loadData run')
  return store.dispatch(fetchMovies())
}

function mapStateToProps(state) {
  return {
    movies: state.movies,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadMovies: () => dispatch(fetchMovies()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies)
