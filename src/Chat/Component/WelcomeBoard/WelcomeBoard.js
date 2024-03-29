import React, {Component} from 'react'
import 'react-toastify/dist/ReactToastify.css'
import './WelcomeBoard.css'

export default class WelcomeBoard extends Component {
    render() {
        return (
            <div className="viewWelcomeBoard">
                <br></br>
        <span className="textTitleWelcome">{`Welcome, ${
            this.props.currentUserNickname
            }`}</span>
                <img
                    className="avatarWelcome"
                    src={require('../../../images/'+this.props.currentUserAvatar+".jpg")}
                    alt="icon avatar"
                />
                <span className="textDesciptionWelcome">
          Please select a Contact from the list to start
        </span>
            </div>
        )
    }
}
