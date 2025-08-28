// const url = 'https://www.mocklib.com/mock/public/products'

import request from './request'

export async function getMovie() {
  const res = await request.get(`/mock/public/products`)
  return res.data
}
