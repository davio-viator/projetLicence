import React,{Component, Fragment} from 'react';

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
import { Checkbox, FormControlLabel } from '@material-ui/core';
import Axios from 'axios';

const firebase = require("firebase");


class SignupComponent extends Component{

    constructor(){
        super();
        this.state = {
            passwordConfirmation:null,
            signupError:'',
            societyBtnClicked:false,
            name:null,
            email:null,
            phone:null,
            password:null,
            companyName:null,
            companyWebsite:null,
            proMail:null,
        };
    }

    render(){

        const {classes} = this.props;

        return(
            <div>
                <NavBarComponent history={this.props.history} />
                <main className={classes.main}>
                <CssBaseline/>
                <Paper className={classes.paper}>
                    <Typography component='h1' variant='h5'>
                        Sign Up!
                    </Typography>
                    <form onSubmit={(e)=> this.submitSignup(e)} className={classes.form}>
                        <FormControl required fullWidth margin='normal'>
                            <InputLabel htmlFor="signup-name-input"> Enter your name</InputLabel>
                            <Input type="username" autoFocus id="signup-name-input" onChange={(e)=> this.userTyping('name',e)}></Input>
                        </FormControl>
                        <FormControl required fullWidth margin='normal'>
                            <InputLabel htmlFor="signup-email-input"> Enter your email</InputLabel>
                            <Input type="email" id="signup-email-input" onChange={(e)=> this.userTyping('email',e)}></Input>
                        </FormControl>
                        <FormControl fullWidth margin='normal'>
                            <InputLabel htmlFor="signup-phone-input"> Enter your phone number</InputLabel>
                            <Input type="tel" id="signup-phone-input" onChange={(e)=> this.userTyping('phone',e)}></Input>
                        </FormControl>
                        <FormControl required fullWidth margin="normal">
                            <InputLabel htmlFor="signup-password-input">Create a password</InputLabel>
                            <Input type="password" id="signup-password-input" onChange={(e)=> this.userTyping('password',e)}></Input>
                        </FormControl>
                        <FormControl required fullWidth margin="normal">
                            <InputLabel htmlFor="signup-password-comfirmation-input">Confirm your password</InputLabel>
                            <Input type="password" id="signup-password-comfirmation-input" onChange={(e)=> this.userTyping('passwordConformation',e)}></Input>
                        </FormControl>
                        <FormControlLabel
                        value="hidden"
                        control={<Checkbox color="primary" />}
                        label="Are u a company"
                        labelPlacement="end"
                        onChange={(e) => this.handleCompanyForm(e)}
                        />
                        <FormControl className="companyDisplay hide" fullWidth margin="normal">
                            <InputLabel htmlFor="signup-password-comfirmation-input">Company name</InputLabel>
                            <Input type="text" id="signup-company-name-input" onChange={(e)=> this.userTyping('companyName',e)}></Input>
                        </FormControl>
                        <FormControl className="companyDisplay hide" fullWidth margin="normal">
                            <InputLabel htmlFor="signup-password-comfirmation-input">Company website</InputLabel>
                            <Input type="text" id="signup-company-website-input" onChange={(e)=> this.userTyping('companyWebsite',e)}></Input>
                        </FormControl>
                        <FormControl className="companyDisplay hide" fullWidth margin="normal">
                            <InputLabel htmlFor="signup-password-comfirmation-input">Professional email</InputLabel>
                            <Input type="email" id="signup-professional-email-input" onChange={(e)=> this.userTyping('proMail',e)}></Input>
                        </FormControl>
                        <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>Submit</Button>
                        
                    </form>

                    {
                    this.state.signupError ? 
                    <Typography className={classes.errorText} component="h5" variant="h6">
                        {this.state.signupError}
                    </Typography>:
                    null
                    }

                    <Typography component="h5" variant="h6" className={classes.hasAccountHeader}> 
                        Already have a account ?
                    </Typography>
                    <Link className={classes.logInLink} to="/login">Log In!</Link>
                </Paper>
            </main>
            </div>
        )
    }

    handleCompanyForm = (e) =>{
        let b = !this.state.societyBtnClicked;
        this.setState({
            societyBtnClicked:!this.state.societyBtnClicked,
        })
        let [...inputs] = document.getElementsByClassName('companyDisplay');
        if(b){
            inputs.forEach(element =>{
                element.classList.remove('hide');
                element.classList.add('show');
            })
        }else{
            inputs.forEach(element =>{
                element.classList.add('hide');
                element.classList.remove('show');
            })
        }

    }


    formIsValis = () => this.state.password === this.state.passwordConfirmation;

    userTyping = (type,e)=>{
        switch (type) {
            case "name":
                this.setState({
                    name:e.target.value
                })
                break;
        
            case "email":
                this.setState({
                    email:e.target.value
                })
                break;

            case "phone":
                this.setState({
                    phone:e.target.value
                })
                break;
        
            case "password":
                this.setState({
                    password:e.target.value
                })
                break;
        
            case "passwordConformation":
                this.setState({
                    passwordConfirmation:e.target.value
                })
                break;
            case "companyName":
                this.setState({
                    companyName:e.target.value
                })
                break;
            case "companyWebsite":
                this.setState({
                    companyWebsite:e.target.value
                })
                break;
            case "proMail":
                this.setState({
                    proMail:e.target.value
                })
                break;
        
            default:
                break;
        }
    }

    submitSignup = (e) =>{
        e.preventDefault();
        if(!this.formIsValis){
            this.setState({signupError:"passwords don't match"})
            return;
        }

       

        console.log("submit",this.state)
        let companyState
        this.state.societyBtnClicked ? companyState=true : companyState=false
        
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then(authRes =>{
            const userObj = {
                email:authRes.user.email,
                name:this.state.name,
                email:this.state.email,
                phone:this.state.email,
                isCompany:companyState,
                companyName:this.state.companyName,
                companyWebsite:this.state.companyWebsite,
                emailPro:this.state.proMail,
                
            };
            firebase
            .firestore()
            .collection('users')
            .doc(this.state.email)
            .set(userObj)
            .then(()=>{
                this.props.history.push('/home')
                this.createUser();
            },dbError=>{
                console.log(dbError);
                this.setState({signupError:dbError.message})
            })
        },authErr =>{
            console.log(authErr);
            this.setState({signupError:authErr.message})
        })
        
        
       
        
    }

    createUser = () =>{
        let values = []
        values.push({name:this.state.name});
        values.push({phone:this.state.phone});
        values.push({email:this.state.email});
        values.push({password:this.state.password});
        this.state.societyBtnClicked ? values.push({isCompany:true}):values.push({isCompany:false})
        values.push({companyName:this.state.companyName});
        values.push({companySite:this.state.companyWebsite});
        values.push({proMail:this.state.proMail});
        values = [...values]
        Axios.post('http://localhost:3030/addUser',values)
        .then(res =>{
            console.log("succes")
        })
        .catch(err => {
            console.error(err)
        })
    }



}

export default withStyle(styles)(SignupComponent);