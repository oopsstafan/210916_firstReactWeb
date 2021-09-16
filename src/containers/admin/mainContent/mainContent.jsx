import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'


import Category from './category/category'
import Product from './product/product'
import User from './user/user'
import Role from './role/role'
import Barchart from './barchart/barchart'
import Linechart from './linechart/linechart'
import Piechart from './piechart/piechart'
import Home from './home/home'
import Edit from './product/edit/edit'
import Detail from './product/detail/detail'

export default class mainContent extends Component {
    render() {
        return (
            <div className="mainContentWrapper">
                <Switch>
                    <Route path="/admin/home" component={Home}/>
                    <Route path="/admin/category" component={Category}/>
                    <Route path="/admin/product" component={Product} exact/>
                    <Route path="/admin/product/edit/:id" component={Edit}/>
                    <Route path="/admin/product/detail/:id" component={Detail}/>
                    <Route path="/admin/user" component={User}/>
                    <Route path="/admin/role" component={Role}/>
                    <Route path="/admin/barchart" component={Barchart}/>
                    <Route path="/admin/linechart" component={Linechart}/>
                    <Route path="/admin/piechart" component={Piechart}/>
                </Switch>
            </div>
        )
    }
}
