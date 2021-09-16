import {SHOW_DETAIL,SAVE_PRODLIST} from '../action_types'




const initState = [
    {
        name: '',
        desc: '',
        price: '',
        categoryName: '',
        imgs: [],
        detail: ''
    }
]
export default function showDetailReducer(preState=initState, action){
    const {type, data} = action
    switch (type) {
        case SHOW_DETAIL:
            let newState = {
                id: data._id, 
                name: data.name, 
                desc: data.desc, 
                price: data.price, 
                categoryName: data.categoryName,
                imgs: data.imgs
            }
            // console.log(newState)
            return newState
        case SAVE_PRODLIST:
            
            return data
        default:
            return preState
    }
}