import { getMovie } from '../../services/getMovie'

export const actionTypes = {
  setDatas: 'movies/setDatas',
  fetchMovies: 'movies/fetchMovies',
}

export function setDatas(datas) {
  return { type: actionTypes.setDatas, payload: datas }
}

export function fetchMovies() {
  return async function (dispatch) {
    const res = await getMovie()
    dispatch(setDatas(res.products))
  }
}
