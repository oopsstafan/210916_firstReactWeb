import {LOGIN, LOGOUT} from '../action_types'

let username = localStorage.getItem('username')
let id = localStorage.getItem('id')
let isLogin = localStorage.getItem('isLogin')
let roleName = localStorage.getItem('roleName')

// const initState = {
//     id: '',
//     username: '',
//     isLogin: isLogin
// }
const initState = {
   id: id || '',
   username: username || '',
   isLogin: isLogin,
   roleName: roleName || ''
}
export default function loginReducer(preState=initState, action){
    // preState = {...preState, isLogin: false}
    // console.log(newState)
    const {type, data} = action
    switch (type) {
        case LOGIN:
            let newState = {id: data._id, username: data.username, isLogin: true, roleName: data.role_name}
            // console.log(newState)
            return newState
        case LOGOUT:
            return {}
        default:
            return preState
    }
}



