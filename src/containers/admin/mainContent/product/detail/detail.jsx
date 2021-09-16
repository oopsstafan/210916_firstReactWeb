import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Button, Card } from 'antd'
import {
    LeftOutlined
  } from '@ant-design/icons'
import {Link} from 'react-router-dom'

import {reqProductById} from '../../../../../api/index'
import {createShowDetailAction, createSaveProdListAction} from '../../../../../redux/actions/test_actions'
import './detail.less'

class detail extends Component {
    state={
        currentProductObj:{}
    }
    componentDidMount(){
        const {id} = this.props.match.params
        const {productObjArr} = this.props
        // console.log(id)
        // console.log(this.props.productObjArr)
        if (this.props.productObjArr.name){
            const result = productObjArr.filter(productObj=>{
                return id === productObj._id                    
            })
            this.setState({currentProductObj: result[0]})
            
        }else this.getProductById(id)
        
        
    }

    getProductById = async (id)=>{
        const result1 = await reqProductById(id)
        // console.log(result1.data.data)
        this.setState({currentProductObj: result1.data.data })
    }
    render() {
        
        if (this.state.currentProductObj.name !== undefined){
            // console.log(this.state.currentProductObj)
            return (
                <Card 
                    title={
                        <div>
                            <Button type="link"><Link to="/admin/product"><LeftOutlined /></Link></Button>Product Management
                        </div>
                    }
                    style={{height: '100%'}}
                >
                    <label htmlFor="">Name: </label><span>{this.state.currentProductObj.name}</span><hr />
                    <label htmlFor="">Description: </label><span>{this.state.currentProductObj.desc}</span><hr />
                    <label htmlFor="">Price: </label><span>{this.state.currentProductObj.price}</span><hr />
                    <label htmlFor="">Category: </label><span>{this.state.currentProductObj.categoryName}</span><hr />
                    <label htmlFor="">Picture: </label>
                    {
                        this.state.currentProductObj.imgs.map(item=>{
                            return <img src={`http://localhost:5000/uploads/`+ item} alt="product-imgs" style={{height: '100px', marginRight: '25px'}}/>
                        })
                    }               
                    <hr />
                    <label htmlFor="">Detail: </label><span>{this.state.currentProductObj.detail}</span><hr />
                </Card>
            )
        }else{
            return <div>loading</div>
        }
        
        
    }
}
export default connect(
    state => ({ productObjArr: state.showDetailReducer }),
    {
        showDetailAction: createShowDetailAction,
        saveProdListAction: createSaveProdListAction
    }
)(detail)
