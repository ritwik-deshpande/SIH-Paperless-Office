import api from '../utils/api'
import axios from 'axios';
var bcrypt = require('bcryptjs');

export const GetUser = (id, password) => {
    return (dispatch, getState) =>{

        console.log("getstate : " ,getState().auth.loggedIn)
        let userObj = getState().auth.userObj
        var salt = "$2a$04$XkEO9KJolCWvmniNP4VHWe";
        
        console.log("password", password)
        if( userObj && userObj.id.localeCompare(id))
        {
            
            console.log("userobj", userObj.password)
            if(bcrypt.compareSync(password, userObj.password)){
                    
                dispatch({type: 'USER_VERIFIED',payload: userObj})
            }
            else{
                dispatch({type: 'INVALID_PASSWORD',payload: userObj})
                alert("Invalid Password");
            }
        }
        else{

            api.users().getByid(id).then(
                res =>{
                    console.log("The user",res.data.password)
    
                    if(res.data.length== 0){
                        alert("Invalid Id");
                    }
                    else if(bcrypt.compareSync(password, res.data.password)){
                        var hash = bcrypt.hashSync(res.data.pin, salt);
                        console.log(hash)
                        dispatch({type: 'USER_VERIFIED',payload: res.data})
                    }
                    else{
                        dispatch({type: 'INVALID_PASSWORD',payload: res.data})
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
	      alert("Updated User Successfully !")
              window.location.reload(true)
            }
          )
    }
}

export const logout = (userObj) =>{
    return (dispatch, getState) =>
    {
        console.log(userObj)
        dispatch({type:'USER_LOGOUT', payload:userObj})
        // maybe send data 
        // api.users().update(userObj.id,userObj).then(
        //     res =>{
        //       console.log(res)
        //       console.log("Saved ESIGN")
        //       dispatch({type:'SAVE_SIGN', payload:res.data})
        //     }
        //   )
    }
}
