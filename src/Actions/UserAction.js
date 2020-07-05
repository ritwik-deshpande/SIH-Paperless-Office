import api from '../utils/api'
import axios from 'axios';

export const GetUser = (username, password) => {
    return (dispatch, getState) =>{

        console.log("getstate : " ,getState().auth.loggedIn)
        let userObj = getState().auth.userObj

        if( userObj && userObj.username.localeCompare(username)==0)
        {
            if(password.localeCompare(userObj.password)==0){
                    
                dispatch({type: 'USER_VERIFIED',payload: userObj})
            }
            else{
                dispatch({type: 'INVALID_PASSWORD',payload: userObj})
                alert("Invalid Password");
            }
        }
        else{

            api.users().get(username).then(
                res =>{
                    console.log("The user",res.data[0])
    
                    if(res.data.length== 0){
                        alert("Invalid Username");
                    }
                    else if(password.localeCompare(res.data[0].password)==0){
                        
                        dispatch({type: 'USER_VERIFIED',payload: res.data[0]})
                    }
                    else{
                        dispatch({type: 'INVALID_PASSWORD',payload: res.data[0]})
                        alert("Invalid Password");
                    }
                
                })
        }
        
    }
    
}

export const saveSign = (userObj) =>{
    return (dispatch, getState) =>
    {
        console.log(userObj)
        api.users().update(userObj.id,userObj).then(
            res =>{
              console.log(res)
              console.log("Saved ESIGN")
              dispatch({type:'SAVE_SIGN', payload:res.data})
            }
          )
    }
}
