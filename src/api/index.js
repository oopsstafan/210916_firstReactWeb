import myAxios from './myAxios'
import axios from 'axios'
import {BASE_URL} from '../config'


export const reqLogin = (username, password) => {
    // axios.post('http://localhost:3000/api1/login', { username, password })
    //     .then((response) => {
    //         if (response.data.status === 0) alert(`Welcome to system ${username}`)
    //         else alert(`Your username ${username} is not existed`)
    //     }, reason => {
    //         alert(reason)
    //     })

    // try {
    //     const result = await axios.post('http://localhost:3000/api1/login', new URLSearchParams({username, password}).toString())
    //     console.log(result)
    //     if (result.data.status === 0) alert(`Welcome to system ${username}`)
    //     else alert(`Your username ${username} is not existed`)
    // } catch (e) {
    //     alert(e)
    // }

    return myAxios.post(`${BASE_URL}/api1/login`, {username, password},
    {withCredentials: true})
}

export const reqWeather = (zipcode) => {

    return myAxios.get(`http://api.weatherapi.com/v1/current.json`, {
        params: {
            key: 'a1db5b34672a4f4a86a82809212308',
            q: zipcode,
            aqi: 'yes'
        }
    })
}

export const reqUserCookie = ()=>{
   return axios.get(`/api1/user`)
//    .then(response=>{
//         console.log(response)
//          if (response.data.status === 0){
//              message.success("Welcome to the System", 1) 
//              this.props.loginAction(response.data.data)
//              this.props.history.replace('/admin/home')
//          } else message.warning(result.msg, 1)
//     }).catch(err=>{
//         console.log(err)
//     })
}


export const reqCategoryList = ()=>{
    return axios.get(`/api1/manage/category/list`)
}

export const reqAddCategory = (categoryName)=>{
    return axios.post('/api1/manage/category/add', {categoryName})
}

export const reqUpdateCategory = (categoryName, categoryId)=>{
    return axios.post('/api1/manage/category/update', {categoryName, categoryId})
}

export const reqProductList = (pageNum, pageSize)=>{
    return axios.get(`/api1/manage/product/list?pageNum=${pageNum}&pageSize=${pageSize}`)
}

export const reqUpdateProductStatus = (productId, status)=>{
    return axios.post('/api1/manage/product/updateStatus', {productId, status})
}

// export const reqSearchProduct = (productName, productDesc)=>{
//     return axios.get('/api1/manage/product/search', {
//         params: {
//             productName,
//             productDesc
//         }
//     })
// }


export const reqSearchProduct = (pageNum, pageSize, searchType, keyWord)=>{
    return axios.get('/api1/manage/product/search', {
        params: {
            pageNum,
            pageSize,
            [searchType]: keyWord
        }
    })
}

export const reqProductById = (productId)=>{
    return axios.get('/api1/manage/product/id', 
    {
        params: {
            productId 
        }
    })
}

export const reqRemoveImg = (name) =>{
    return axios.post('/api1/manage/img/remove', {name})
}

export const reqAddProduct = (product)=>{
    return axios.post('/api1/manage/product/add', product)
}


export const reqRoleList = ()=>{
    return axios.get('/api1/manage/role/list')
}

export const reqAddRole = (roleName)=>{
    return axios.post('/api1/manage/role/add', {roleName})
}

export const reqUpdateRole = (role)=>{
    return axios.post('/api1/manage/role/update', role)
}

export const reqRoleByRoleName = (roleName)=>{
    return axios.get('/api1/manage/role/listByName',
    {
        params: {
            roleName
        }
    })
}

export const reqUsersList = ()=>{
    return axios.get('/api1/manage/user/list')
}

export const reqAddUser = (userObj)=>{
    return axios.post('/api1/manage/user/add', userObj)
}

export const reqDeleteUser = (userId)=>{
    return axios.post('/api1/manage/user/delete', {userId})
}

export const reqUpdateUser = (user)=>{
    return axios.post('/api1/manage/user/update', user)
}