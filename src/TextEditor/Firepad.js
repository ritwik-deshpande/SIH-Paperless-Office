import React from 'react'
import firepad from 'firepad'
import firebase from 'firebase'

import CodeMirror from 'codemirror'
global.CodeMirror = CodeMirror(document.getElementById('firepad'), {lineWrapping: true})

class FirepadEditor extends React.Component{

    constructor(props)
    {
        super(props)

    }
    // Helper to get hash from end of URL or generate a random one.
    getExampleRef = () => {
        var ref = firebase.database().ref();
        var hash = window.location.hash.replace(/#/g, '');
        if (hash) {
          ref = ref.child(hash);
        } else {
          ref = ref.push(); // generate unique location.
          window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
        }
        if (typeof console !== 'undefined') {
          console.log('Firebase data: ', ref.toString());
        }
        return ref;
      }
    componentDidMount(){
        var config = {
            apiKey: "AIzaSyDf_LAIJ5ZRxg4zB1RLQePdaF8Aze_l8v8",
            authDomain: "digidocs-db5cd.firebaseapp.com",
            databaseURL: "https://digidocs-db5cd.firebaseio.com",
        };
          
        //firebase.initializeApp(config);
    
        //// Get Firebase Database reference.
        
        var firepadRef = this.getExampleRef
        var myFirePad = firepad.fromCodeMirror(firepadRef, global.CodeMirror.editor
            , { richTextShortcuts: true, richTextToolbar: true, defaultText: "Start typing here"});

    }

    render(){
        return(
            <div>
                <div id="firepad"></div>
            </div>
        )
    }
}

export default FirepadEditor;