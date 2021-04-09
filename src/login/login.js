import React,{Component} from 'react';

import {Link} from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import withStyle from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from './styles';
import NavBarComponent from '../navbar/navBar';

const firebase = require("firebase")



class LoginComponent extends Component{


    constructor(){
        super();
        this.state = {
            email:null,
            password:null,
            LoginError:'',
        }
    }
    render(){

        const {classes} = this.props;

        return(
          <div>
            <NavBarComponent history={this.props.history}/>
            <main className={classes.main}> 
                <CssBaseline/>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Log In!
                    </Typography>
                    <form className={classes.form} onSubmit={(e)=> this.submitLogin(e)}>
                        <FormControl required fullWidth margin='normal'>
                            <InputLabel htmlFor="login-email-input">Enter your email</InputLabel>
                            <Input type="email" autoComplete="email" autoFocus id="login-email-input" onChange={(e)=> this.userTyping('email',e)}></Input>
                        </FormControl>
                        <FormControl required fullWidth margin='normal'>
                            <InputLabel htmlFor="login-password-input">Enter your password</InputLabel>
                            <Input type="password" id="login-password-input" onChange={(e)=> this.userTyping('password',e)}></Input>
                        </FormControl>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Log In</Button>
                    </form>

                    {
                        this.state.LoginError ? 
                        <Typography className={classes.errorText} component="h5" variant="h6">
                            Incorrect Login information
                        </Typography> :
                        null
                    }

                    <Typography component="h5" variant="h6" className={classes.noAccountHeader}>Don't have a account ?</Typography>
                    <Link className={classes.signUpLink} to="/signup">Sign Up!</Link>
                </Paper>
            </main>
        
          </div>
            )
    }

    submitLogin = (e) =>{
        e.preventDefault();

        firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email,this.state.password)
        .then(()=>{
            this.props.history.push("/home")
        },err =>{
            this.setState({LoginError:'Server error'})
            console.log(err)
        })
    }

    userTyping = (type,e) =>{
        // console.log(type,e.target.value);
        switch (type) {
            case "email":
                this.setState({email:e.target.value})
                break;
        
            case "password":
                this.setState({password:e.target.value})
                break;
        
            default:
                break;
        }
    }




}

export default withStyle(styles)(LoginComponent);