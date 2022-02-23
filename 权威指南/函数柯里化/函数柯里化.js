// 通过闭包的特性，对函数进行柯里化

//#region  柯里化前

// //柯里化前 ：
// function getPath(adr, api, apiName) {
//   return `${adr}/${api}/${apiName}`
// }

// //柯里化前 可能会出现很多重复的代码
// let adminGetStudent = getPath('https://localhost:8080', 'admin', 'adminGetStudent')
// let adminGetStudentDetail = getPath('https://localhost:8080', 'admin', 'adminGetStudentDetail')
// console.log(adminGetStudent);
// console.log(adminGetStudentDetail);

//#endregion

//#region  一次柯里化

// // 对函数进行一层柯里化:
// function getPathAdrCurrying(adr) {
//   return function (api, apiName) {
//     return `${adr}/${api}/${apiName}`
//   }
// }

// //一层柯里化后
// let getAdrPath = getPathAdrCurrying('https://localhost:8080')

// let adminGetStudent = getAdrPath('admin', 'adminGetStudent')
// let adminGetStudentDetail = getAdrPath('admin', 'adminGetStudentDetail')
// console.log(adminGetStudent);
// console.log(adminGetStudentDetail);

//#endregion

//#region  两层柯里化

//同样思路 可以在对 admin 的属性项进行柯里化 ， 对于很多个接口来说，柯里化可以很大程度的减少代码量，增加代码的复用性
function getPathAdminCurrying(adr) {
  return function (api) {
    return function (apiName) {
      return `${adr}/${api}/${apiName}`
    }
  }
}

let getAdrPath = getPathAdminCurrying('https://localhost:8080')
let getAdminPath = getAdrPath('admin')

let adminGetStudent = getAdminPath('adminGetStudent')
let adminGetStudentDetail = getAdminPath('adminGetStudentDetail')
console.log(adminGetStudent);
console.log(adminGetStudentDetail);

//#endregion