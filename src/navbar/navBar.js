import { withStyles } from '@material-ui/core';
import React, { Component } from 'react';

import styles from './styles';

// import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
// import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
// import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import MailIcon from '@material-ui/icons/Mail';
// import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import FilterComponent from'../filter/filter';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

// import Image from 'material-ui-image';

import Axios from 'axios';

import logo from '../assets/amazon_logo.png';


const firebase = require("firebase");


class NavBarComponent extends Component{
  constructor(){
    super();
    this.state ={
      anchorEl:null,
      anchorEl2:null,
      mobileMoreAnchorEl:null,
      mobileMoreAnchorEl2:null,
      loggedIn : false,
      categories : [],
      username : null,
      nbItems:0,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render(){

    const {classes} = this.props;
    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(this.state.anchorEl);
    const isMobileMenuOpen = Boolean(this.state.mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
      //setAnchorEl(event.currentTarget);
      this.setState({
        anchorEl:event.currentTarget
      })
    };

    const handleMobileMenuClose = () => {
      // setMobileMoreAnchorEl(null);
      this.setState({
        mobileMoreAnchorEl:null
      })
    };

    const handleMenuClose = () => {
      // setAnchorEl(null);
      this.setState({
        anchorEl:null
      })
      handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
      // setMobileMoreAnchorEl(event.currentTarget);
      this.setState({
        mobileMoreAnchorEl:event.currentTarget
      })
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={this.state.anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        {this.state.loggedIn ? <MenuItem onClick={this.handleProfileClick}>{this.state.username}</MenuItem> :<MenuItem onClick={this.handleProfileClick}>logIn</MenuItem>}
        <MenuItem onClick={this.handleAccountClick}>My account</MenuItem>
        {
          this.state.loggedIn ? <MenuItem onClick={this.signOut}>Log out</MenuItem>  :  null
        }
        
      </Menu>
    );


    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={this.state.mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            color="inherit"
            >
            <ShoppingCartIcon />
          </IconButton>
          <p>Cart</p>
        </MenuItem>
      </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => this.handlePageChange("home")}
          >
            <img className={classes.imageSize} src={logo} alt="logo" ></img>
          </IconButton>
          <FilterComponent categories={this.state.categories} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              
              onKeyDown={this.handleSubmit}
              inputProps={{ 'aria-label': 'search' }}
              onSubmit={()=> console.log("icon button clicked")}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={this.handleCartClick}
              color="inherit"
            >
              <ShoppingCartIcon />
              <p className={classes.itemNumber} id="itemNumber">{this.state.nbItems}</p>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
    )
  }

  handleSubmit = (e) =>{
    if(e.keyCode === 13){
      // console.log("enter works here's the value",e.target.value)
      let value = {nom:e.target.value}
      Axios.post('http://localhost:3030/submit',value)
      .then(res => {
        // console.log("submit succes")
        console.log(res.data)
         this.onSubmit(res.data)
      })
      .catch(err =>{
        console.log(err)
      })
    }
  }

  onSubmit = (e) =>{
    this.props.onChange(e);

  }

  handleCartClick = () =>{
    console.log("cart button clicked")
  }

  handleProfileClick =() =>{
    console.log("profile button clicked")
    firebase.auth().onAuthStateChanged(async _usr =>{
      if(!_usr)
          this.props.history.push("/login");
      else{
        this.props.history.push("/profile")
      }    
    })
    this.handleMenuClose()
  }

  handlePageChange(pageName){
    this.props.history.push("/",pageName,'"')
  }

  handleAccountClick =() =>{
    console.log("account button clicked")
    this.handleMenuClose()
  }

  signOut = () => {
    firebase.auth().signOut();
  }

  componentDidMount = () =>{
    firebase.auth().onAuthStateChanged(async _usr =>{
      if(_usr){
        this.setState({
          loggedIn:true
        })
       
        await firebase
              .firestore()
              .collection("users")
              .get()
              .then(snapshot =>{
                const chats = snapshot.docs.map(_doc=>_doc.data())
                 snapshot.forEach(doc =>{
                   const info = doc.data()
                   if(_usr.email === info.email){
                    this.setState({
                      username:_usr.email,
                      nbItems:info.cart
                    });
                    // this.getNumberCart();
                   }
                 })
              })
                  
              
      }
      else{
        
      }
    })
    //this.getCategories()
    
    
  }


  handleProfileMenuOpen = (event) => {
    //setAnchorEl(event.currentTarget);
    this.setState({
      anchorEl:event.currentTarget
    })
  };

  handleMobileMenuClose = () => {
    // setMobileMoreAnchorEl(null);
    this.setState({
      mobileMoreAnchorEl:null
    })
  };

  handleMenuClose = () => {
    // setAnchorEl(null);
    this.setState({
      anchorEl:null
    })
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = (event) => {
    // setMobileMoreAnchorEl(event.currentTarget);
    this.setState({
      mobileMoreAnchorEl:event.currentTarget
    })
  };

}

export default withStyles(styles)(NavBarComponent);