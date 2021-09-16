import React, { Component } from 'react'
import screenfull from 'screenfull'
import { withRouter } from 'react-router-dom'
import PubSub from 'pubsub-js'
import { connect } from 'react-redux'
import { Button, Modal } from 'antd'
import {
    FullscreenOutlined,
    FullscreenExitOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons'

import { createLogoutAction } from '../../../redux/actions/test_actions'
import 'antd/dist/antd.less'
import {reqWeather} from '../../../api/index'

const { confirm } = Modal
class HeaderList extends Component {
    state = {
        userName: '',
        dateTime: '',
        weatherObj: {}
    }

    logout = () => {
        // if (window.confirm('Are you sure you want to log out?')) this.props.logoutAction()
        // else return

        confirm({
            title: 'Do you Want to Log Out?',
            icon: <ExclamationCircleOutlined />,
            content: 'If you log out you gotta log in again',
            onOk: ()=> {
                this.props.logoutAction()
            },
            onCancel: ()=> {
                return
            },
        });
    }

    handleFullScreen = () => {
        screenfull.toggle()
    }
    getWeatherObj = async ()=>{
        
        let weatherObj = await reqWeather('47401')
        // this.setState({locationName: weatherObj.location.name, centigrade: weatherObj.current.temp_c, weatherCondition: weatherObj.current.condition.text})
        if (this.isUnmounted){
            return
        }else{
            this.setState({weatherObj})
        }
        
        
        // console.log(weatherObj)
    }


    componentDidMount() {
        
        
        this.timer = setInterval(() => {
            let dateTime = new Date().toLocaleString('en-AU')
            this.setState({ dateTime })
        }, 1000)

        this.setState({userName: this.props.login.username})

        screenfull.on('change', ()=>{
            if (screenfull.isFullscreen) {
                this.fullscreenIcon1.style.display = 'none'
                this.fullscreenIcon2.style.display = ''
                this.fullscreenIcon2.style.margin = '0px'
            }else{
                this.fullscreenIcon1.style.display = ''
                this.fullscreenIcon1.style.margin = '0px'
                this.fullscreenIcon2.style.display = 'none'
            }
        })
        
        this.getWeatherObj()

    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.headerPub)
        clearInterval(this.timer)
        this.isUnmounted = true
        
    }

    getHeaderListTitle = ()=>{
        const {pathname} = this.props.history.location
        const pathnameArr = pathname.split('/')
        if (pathnameArr.length < 3) return <h1>{pathnameArr[1].toUpperCase()}</h1>
        else return <h1>{pathnameArr[2].toUpperCase()}</h1>
    }

    render() {
        const { weatherObj } = this.state
        if (weatherObj.location === undefined){
            return <div>loading</div>
        }else{
            return (
                <div className="headerContent clearfix">
                    {
                        this.getHeaderListTitle()
                    }
                    <div className="triangleDown"></div>
                    <section className="headerRightContent">
                        <Button className="fullscreenbtn"  onClick={this.handleFullScreen}>
                            <FullscreenOutlined ref={c => this.fullscreenIcon1 = c}/>
                            <FullscreenExitOutlined ref={c => this.fullscreenIcon2 = c} style={{display:'none'}}/>
                        </Button>
                        <h2>Welcome to the System, {this.state.userName}</h2>
                        <Button type="link" onClick={this.logout}>Log out</Button>
                        <div className="weather">{this.state.dateTime}, {weatherObj.location.name}, {weatherObj.current.temp_c} °C <img src={weatherObj.current.condition.icon} alt="" style={{height:'30px', margin:'0 0 5px 0'}}/></div>
                        
                    </section>
                </div>
            )
        }
    }
}




export default connect(
    state => ({ login: state.loginReducer }),
    {
        logoutAction: createLogoutAction
    }
)(withRouter(HeaderList))