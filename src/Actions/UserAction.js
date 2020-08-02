import api from '../utils/api'
import axios from 'axios';
import { setLogLevel } from 'firebase';
var bcrypt = require('bcryptjs');
var RSA = require('hybrid-crypto-js').RSA;
var Crypt = require('hybrid-crypto-js').Crypt;
var aesjs = require('aes-js');
const NodeRSA = require('node-rsa');
const crypto = require("crypto");

export const GetUser = (id, password) => {
    return (dispatch, getState) =>{

        //console.log("getstate : " ,getState().auth.loggedIn)
        let userObj = getState().auth.userObj
        var salt = "$2a$04$XkEO9KJolCWvmniNP4VHWe";
        //const cipher = crypto.createCipher("aes-128-cbc", "aesEncryptionKey");
        //var encrypted = cipher.update("$2a$04$XkEO9KJolCWvmniNP4VHWe25Nao8/AAadzlRONio8WOnBRGFOnoVO", "utf8", "base64");
        //encrypted += cipher.final("base64");
        //console.log(encrypted);
        const decipher = crypto.createDecipher("aes-128-cbc", "aesEncryptionKey");
        
        //console.log("password", password)
	    //var hash = bcrypt.hashSync('1234', salt);
        //console.log('1234',hash)
        var rsa = new RSA();
            //var publicKey =null
            //var privateKey = null
            

            //console.log(rsa.publicKey, rsa.privateKey )

        if( userObj && userObj.id.localeCompare(id) === 0)
        {
            
            console.log("userobj", userObj.password)
            //var decrypted = decipher.update("IYxPde03BBX/jXWGg+nv0Q01Sr5ayVQ2yWb4nyGdPLKbmCZUqsafcJuv7wE6aRX4Uz11QUZhAt2A7VO+fRv1zw==", "base64", "utf8");
            var decrypted = decipher.update(userObj.password,'base64','utf8')
            decrypted += decipher.final("utf8");
            console.log(decrypted);
            if(bcrypt.compareSync(password, decrypted)){
                    
                dispatch({type: 'USER_VERIFIED',payload: userObj})
            }
            else{
                dispatch({type: 'INVALID_PASSWORD',payload: userObj})
                alert("Invalid Password");
            }
        }
        else{
            
                
                api.users().getByid(id,).then(
                    res =>{
                        console.log("The user",res.data)
        
                        if(res.data.length== 0){
                            alert("Invalid Id");
                        }
                        else{
                            //var decrypted = decipher.update("IYxPde03BBX/jXWGg+nv0Q01Sr5ayVQ2yWb4nyGdPLKbmCZUqsafcJuv7wE6aRX4Uz11QUZhAt2A7VO+fRv1zw==", "base64", "utf8");
                            var decrypted = decipher.update(res.data.password,'base64','utf8')
                            decrypted += decipher.final("utf8");
                            console.log(decrypted);
                            if(bcrypt.compareSync(password, decrypted)){
                                // var hash = bcrypt.hashSync('keskar', salt);
                                // console.log(hash)
                                dispatch({type: 'USER_VERIFIED',payload: res.data})
                            }
                            else{
                                dispatch({type: 'INVALID_PASSWORD',payload: res.data})
                                alert("Invalid Password");
                            }
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
        api.notification().delete(userObj.id,sessionStorage.getItem("token")).then(
            res=>{
                console.log(res.data);
            }
        )
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
