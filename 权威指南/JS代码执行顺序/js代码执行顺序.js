//执行栈->同步任务->微任务->宏任务

function fn() {
  console.log(1);

  setTimeout(() => {
    console.log(2);
    Promise.resolve().then(() => {
      console.log(3);
    });
  }, 0);

  new Promise((resolve, reject) => {
    console.log(4);
    resolve(5);
  }).then(data => {
    console.log(data);
  });

  setTimeout(() => {
    console.log(6);
  }, 0);

  console.log(7);
}
fn(); // 1 4 7 5 2 3 6

// 同步任务 > 微任务(Promise) > 宏任务