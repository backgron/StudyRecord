const fn = () => {
  Promise.resolve().then(() => {
    fn()
    console.log(1)
  })
}
fn()
