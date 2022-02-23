let strFn = "(function name() {console.log('执行了')})()"

let fn = new Function(strFn)
fn()