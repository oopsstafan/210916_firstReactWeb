import { LOGIN, LOGOUT, SHOW_DETAIL, SAVE_PRODLIST } from '../action_types'


export const createLoginAction = (data) => {
    localStorage.setItem('username', data.username)
    localStorage.setItem('id', data._id)
    localStorage.setItem('isLogin', true)    
    localStorage.setItem('roleName', data.role_name)    
    return {type: LOGIN, data}
}
export const createLogoutAction = () => {    
    localStorage.clear()    
    return {type: LOGOUT}
}
export const createShowDetailAction = (data) => {    
    return {type: SHOW_DETAIL, data}
}
export const createSaveProdListAction = (data) => {    
    return {type: SAVE_PRODLIST, data}
}
