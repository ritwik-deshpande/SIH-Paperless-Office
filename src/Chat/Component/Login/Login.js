import firebase from 'firebase'
import React, {Component} from 'react'
import ReactLoading from 'react-loading'
import {withRouter} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import {myFirebase, myFirestore} from '../../Config/MyFirebase'
import './Login.css'
import {AppString} from './../Const'

class Login extends Component {
    constructor(props) {
        super(props)
        this.provider = new firebase.auth.GoogleAuthProvider()
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        //localStorage.clear();
        this.checkLogin()
        //this.props.history.push('/main')
    }

    checkLogin = () => {
        if (localStorage.getItem(AppString.ID) && localStorage.getItem(AppString.ID).localeCompare(this.props.userObj.id)===0) {
            this.setState({isLoading: false}, () => {
                this.setState({isLoading: false})
                this.props.showToast(1, 'Login success')
                this.props.history.push('/main')
            })
        } else {
            this.setState({isLoading: false})
            this.onLoginPress()
        }
    }

    onLoginPress = () => {
        this.setState({isLoading: true})
        // myFirebase
        //     .auth()
        //     .signInWithPopup(this.provider)
        //     .then(async result => {
                console.log(this.props.userObj)
                let user = this.props.userObj
                if (user) {
                    myFirestore
                        .collection(AppString.NODE_USERS)
                        .where(AppString.ID, '==', user.id)
                        .get()
                        .then(result => {

                            if (result.docs.length === 0) {
                                // Set new data since this is a new user
                                myFirestore
                                    .collection('users')
                                    .doc(user.id)
                                    .set({
                                        id: user.id,
                                        nickname: user.name,
                                        aboutMe: '',
                                        //photoUrl: user.photoURL
                                    })
                                    .then(data => {
                                        // Write user info to local
                                        localStorage.setItem(AppString.ID, user.id)
                                        localStorage.setItem(AppString.NICKNAME, user.name)
                                        //localStorage.setItem(AppString.PHOTO_URL, user.photoURL)
                                        this.setState({isLoading: false}, () => {
                                            this.props.showToast(1, 'Login success')
                                            this.props.history.push('/main')
                                        })
                                    })
                            } else {
                                // Write user info to local
                                console.log(result)
                                localStorage.setItem(AppString.ID, result.docs[0].data().id)
                                localStorage.setItem(
                                    AppString.NICKNAME,
                                    result.docs[0].data().nickname
                                )
                                // localStorage.setItem(
                                //     AppString.PHOTO_URL,
                                //     result.docs[0].data().photoUrl
                                // )
                                localStorage.setItem(
                                    AppString.ABOUT_ME,
                                    result.docs[0].data().aboutMe
                                )
                                this.setState({isLoading: false}, () => {
                                    this.props.showToast(1, 'Login success')
                                    this.props.history.push('/main')
                                })
                            }
                        })
                    
                } else {
                    this.props.showToast(0, 'User info not available')
                }
            // })
            // .catch(err => {
            //     this.props.showToast(0, err.message)
            //     this.setState({isLoading: false})
            // })
    }

    render() {
        return (
            <div className="viewRoot">
                {/* <div className="header">CHAT DEMO</div>
                <button className="btnLogin" type="submit" onClick={this.onLoginPress}>
                    Sign in with Google
                </button> */}

                {this.state.isLoading ? (
                    <div className="viewLoading">
                        <ReactLoading
                            type={'spin'}
                            color={'#203152'}
                            height={'3%'}
                            width={'3%'}
                        />
                    </div>
                ) : null}
            </div>
        )
    }
}

export default withRouter(Login)
