import fs from 'fs'
import path from 'path'

export default function () {
  const publicJsPath = path.resolve('public/js')
  return fs
    .readdirSync(publicJsPath)
    .filter((file) => file.endsWith('.js'))
    .map((file) => `<script src="/js/${file}"></script>`)
    .join('\n')
}
