import api from '../utils/api'
import axios from 'axios';
import { setLogLevel } from 'firebase';
var bcrypt = require('bcryptjs');
var RSA = require('hybrid-crypto-js').RSA;
var Crypt = require('hybrid-crypto-js').Crypt;
var aesjs = require('aes-js');
const NodeRSA = require('node-rsa');

export const GetUser = (id, password) => {
    return (dispatch, getState) =>{

        //console.log("getstate : " ,getState().auth.loggedIn)
        let userObj = getState().auth.userObj
    var salt = "$2a$04$XkEO9KJolCWvmniNP4VHWe";
        
        //console.log("password", password)
	    //var hash = bcrypt.hashSync('1234', salt);
        //console.log('1234',hash)
        var rsa = new RSA();
            //var publicKey =null
            //var privateKey = null
            

            //console.log(rsa.publicKey, rsa.privateKey )

        if( userObj && userObj.id.localeCompare(id) === 0)
        {
            
            console.log("userobj", userObj)
            if(bcrypt.compareSync(password, userObj.password)){
                    
                dispatch({type: 'USER_VERIFIED',payload: userObj})
            }
            else{
                dispatch({type: 'INVALID_PASSWORD',payload: userObj})
                alert("Invalid Password");
            }
        }
        else{
            rsa.generateKeyPair(function(keyPair) {
                // Callback function receives new 1024 bit key pair as a first argument
                var publicKey = keyPair.publicKey;
                var privateKey = keyPair.privateKey;
                console.log(publicKey, privateKey )
                var enc = 'AoFE8EIOdh1zxvc06dQnh0kuWU7tItRZzxYa3l6o7BQzJuvvUKBKVJVykQZLEugWTS+NDPgqBdLKEus1YNoKNGxw4pok5X0BdhWRjJ3mA9jY3bVvO3AHPAeovaJ9JMYiEZU5MXp66s71lFpH7NBNfourROs4gwx292cCt6f2TxI='
                const key = new NodeRSA('-----BEGIN RSA PRIVATE KEY-----\n'+
                'MIICXAIBAAKBgQCI76wVLqBErn2EjdAs5lJEvCm3oatXDMXhWJWuuW2ZZnElZt6f\n'+
                '9tYYCArt324/YVZ83jiuEn6h8ND+oO1JDNAIklSOAGmz7Ksuq6wlmlCVQDlXwwZA\n'+
                'pV6TOgqfk4o5N83enweSdSAaAlcaCbCGDN7HK0U/Qr+V7LxdU8NZr+OGvwIDAQAB\n'+
                'AoGAbEkjSojZghZ9+YFvWuIzslkdoDH/XVIjdQTpMQc/TSw+UzZa3CKEwPIzOlIS\n'+
                'S5p8mzfbmIPVkdfuXT0DB15TbxSWO+RrDT/2SrM9JsPWthHDA9Xt83nbmgKRLjex\n'+
                'LA/ZGJDOCeL9zK4+asTBuMKh36hY+iJ6XkFuy5braA6OKaECQQDo/N+IX7QKb4Vy\n'+
                'lI9thQfGijuN/WEgRao/3TeidCKc2m7hNHq/qo6GS4UCvH40WkHwUGTPFol3U91q\n'+
                'XO/dtIZvAkEAlnYfXhOGYb+uX1xY5KI1MhKgnHaSbo/foCU7XI/3fXC8ImxtaZjG\n'+
                'xAQl1/CPd+xyA4ZiaO3H7l8QkTx9gECssQJATRoh/0dslWeCigCP1naHtDRasQqA\n'+
                '8eUcCjZzCtfT/IRs3So41OTkdZzYT6eBPGICIDz6n22d4FdolqJa3su3EQJANY8s\n'+
                '0U8/+dHC350+43w+VWm+FJQ8wfCjGR3HyMZSwit8PQC93eYNcz9KvVibqYPYfhq7\n'+
                'M0DZd6gNfLW8swfSsQJBANjujHYcGtfCykGejGmc6qyXOXl/+lLWqDbdnCaqebuA\n'+
                'aY3DFYj3vUhPkhE5EQPOdy9nMPLvRE9AIDFGGpQkDUg=\n'+
                '-----END RSA PRIVATE KEY-----');

                var aes_key = 'Ow8ozxc4hQjKh4JP2FB/uQ=='
                var aesCtr = new aesjs.ModeOfOperation.ctr(aes_key, new aesjs.Counter(5));
                var decryptedBytes = aesCtr.decrypt(aesjs.utils.hex.toBytes('LxMgvAWHBMYvu9HplZK1Hg=='));
 
                // Convert our bytes back into text
                var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
                console.log(decryptedText);
                //var plaintext = aes

                //console.log(key.decrypt(enc,'utf8'))
                
                api.users().getByid(id,).then(
                    res =>{
                        console.log("The user",res.data)
        
                        if(res.data.length== 0){
                            alert("Invalid Id");
                        }
                        else if(bcrypt.compareSync(password, res.data.password)){
                            var hash = bcrypt.hashSync('keskar', salt);
                            console.log(hash)
                            dispatch({type: 'USER_VERIFIED',payload: res.data})
                        }
                        else{
                            dispatch({type: 'INVALID_PASSWORD',payload: res.data})
                            alert("Invalid Password");
                        }
    
                        
                    
                    })

            }, 1024); 
            
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
