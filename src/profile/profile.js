import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core';
import styles from './styles';
import NavBarComponent from '../navbar/navBar';
import {Link} from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Checkbox, FormControlLabel } from '@material-ui/core';

import Axios from 'axios';
import { firestore } from 'firebase';
import { green } from '@material-ui/core/colors';

const firebase = require('firebase')

class ProfileComponent extends Component{

  constructor(){
    super();
    this.state={
      produits : [],
      username:null,
      email:null,
      isCompany:false,
      users:[],
      suivisClient:false,
    }
  }

  render(){

    const {classes} = this.props;

    const cssP ={
      textAlign:"center",
    }

    const cssPValidation ={
      textAlign:"center",
      color:"green",
    }

    return(
      <div>
        <NavBarComponent history={this.props.history}/>
            <main className={classes.main}> 
                <CssBaseline/>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Bonjour {this.state.username} !
                    </Typography>
                    <form className={classes.form} onSubmit={(e)=> this.submitLogin(e)}>
                    <p style={cssP}>message quelconque</p>
                     {this.state.isCompany ? 
                     <Fragment>
                      <FormControlLabel id="boutonSuivi"
                          value="hidden"
                          control={<Checkbox color="primary" />}
                          label="Vous etes un commercant voulez vous activer le mode de suivis client"
                          labelPlacement="end"
                          onChange={(e) => this.handleSuiviClient(e)}
                      />
                      <p id="messageValidationAccount" className="hide" style={cssPValidation}>vous avez activié le suivis de client</p>
                    </Fragment>
                     : null}
                    </form>
                </Paper>
            </main>
      </div>
    )
  }


  componentDidMount = () =>{
    this.GetProduit();
    firebase.auth().onAuthStateChanged(async _usr =>{
      if(!_usr)
          //this.props.history.push("/login");
          console.log()
      else{
        this.testFunction(_usr.email)
      }
  })
    
  }

  testFunction = async (username) =>{
    const db = firebase.firestore()
    const data = await db.collection("users").get().then( snapshot =>{
    const users = []
    snapshot.forEach(doc =>{
      const userInfo = doc.data()
      users.push({userInfo})
      //console.log(userInfo?.email,username)
        if(userInfo.email === username) this.setState({username:userInfo.name,isCompany:userInfo.isCompany,email:userInfo.email})
    })
    this.setState({users:users})
    //console.log(this.state.users)
    })
    .catch(error => console.log(error))
  }

  handleSuiviClient = () =>{

    this.setState({suivisClient:true})

    let btn = document.getElementById('boutonSuivi');
    btn.classList.add('hide')

    let text = document.getElementById('messageValidationAccount');
    text.classList.add('showblock')

    let value = {email:this.state.email}
    Axios.post('http://localhost:3030/activeSuiviClient',value)
    .then(res =>{
      console.log("succes")
    })
    .catch(err =>{
      console.error(err)
    })
    this.props.history.push('./')
  }


  getStatus = () =>{
    let email = this.state.email
    Axios.post('http://localhost:3030/getStatus')
  }

  GetProduit = () =>{
    Axios.post('http://localhost:3030/getFirst10')
    .then(res =>{
      // console.log(res.data)
      this.setState({
        produits:res.data
      })
    })
    .catch(err =>{
      console.log(err)
    })
  }



}

export default withStyles(styles)(ProfileComponent);