import fs from 'fs'
import path from 'path'

export default function () {
  const publicJsPath = path.resolve('public/css')
  return fs
    .readdirSync(publicJsPath)
    .filter((file) => file.endsWith('.css'))
    .map((file) => `<link rel="stylesheet" href="/css/${file}">`)
    .join('\n')
}
