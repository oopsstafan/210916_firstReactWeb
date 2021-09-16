// let p = Promise.resolve('ok')
// p.then(result =>{
//     console.log(result)
//     return new Promise((resolve, reject) =>{
//         reject('err')
//     })
// }).then(result => {
// }, reason =>{
//     console.warn(reason)
// })
// console.log(p)


// const encoded = new URLSearchParams({username: 'admin', password: 'admin'})
// console.log(encoded.toString())


// setInterval(() => {
//     let dateTime = new Date().toLocaleString('en-AU');
//     console.log(dateTime)
// }, 1000)
// var count = 10
// const timer = setInterval(()=>{
//     if (count >= 0){
//         console.log(count)
//         count = count - 1
//     }else clearInterval(timer)
// }, 1000)


// let url = 'name=zhangsan&age=18'
// let newUrl = new URLSearchParams(url)
// let kiss = JSON.parse(newUrl)
// console.log(kiss)


// const arr = [1, 2,3,4,5]
// const arr1 = arr.filter(num=>{
//     return num + 1 == 2
// })
// console.log(arr1)


const str = ''
if (str){
    console.log('yes!')
}else console.log('no')