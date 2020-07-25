import React, {Component} from 'react'
import './Root.css'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from '../Login/Login'
import Main from '../Main/Main'
import Profile from '../Profile/Profile'
import {toast, ToastContainer} from 'react-toastify'

class Root extends React.Component {
    showToast = (type, message) => {
        // 0 = warning, 1 = success
        switch (type) {
            case 0:
                toast.warning(message)
                break
            case 1:
                toast.success(message)
                break
            default:
                break
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    {/* <ToastContainer
                        autoClose={500}
                        hideProgressBar={true}
                        position={toast.POSITION.BOTTOM_RIGHT}
                    /> */}
                    <Switch>
                        <Route
                            absolute
                            path="/chat"
                            render={props => <Login showToast={this.showToast} userObj={this.props.userObj}{...props} />}
                        />
                        <Route
                            path="/main"
                            render={props => <Main showToast={this.showToast} userObj={this.props.userObj} {...props} />}
                        />
                        <Route
                            path="/profile"
                            render={props => (
                                <Profile showToast={this.showToast} userObj={this.props.userObj}{...props} />
                            )}
                        />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}
export default Root
