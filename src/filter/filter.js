import React, { Component, Fragment } from 'react';
import StyledMenuItem from './styles';
// import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import DraftsIcon from '@material-ui/icons/Drafts';
// import SendIcon from '@material-ui/icons/Send';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import StyledMenu from './StyledMenu';
import Axios from 'axios';


const firebase = require('firebase')


class FilterComponent extends Component{

  constructor(){
    super();
    this.state={
      anchorEl:null,
      filterChoice:null,
      categories:[]
    }
  }


  render(){

    

    const handleClick = (event) => {
      this.setState({
        anchorEl:event.currentTarget
      })
    };
  
    const handleClose = () => {
      this.setState({
        anchorEl:null
      })
    };

    
  
    return (
      <div>
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
          disableElevation
        >
          Filter Menu
        </Button>
        <StyledMenu
          id="customized-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={handleClose}
        >
          {/* <StyledMenuItem onClick={(e)=> this.displayValue("Categorie 1")}>
            <ListItemIcon>
              <ArrowForwardIosIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Categorie 1" />
          </StyledMenuItem>

          <StyledMenuItem onClick={(e)=> this.displayValue("Categorie 2")}>
            <ListItemIcon>
              <ArrowForwardIosIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Categorie 2" />
          </StyledMenuItem>

          <StyledMenuItem onClick={(e)=> this.displayValue("Categorie 3")}>
            <ListItemIcon>
              <ArrowForwardIosIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Categorie 3" />
          </StyledMenuItem>

          <StyledMenuItem onClick={(e)=> this.displayValue("Categorie 4")}> 
            <ListItemIcon>
              <ArrowForwardIosIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Categorie 4" />
          </StyledMenuItem>

          <StyledMenuItem onClick={(e)=> this.displayValue("Categorie 5")}>
            <ListItemIcon>
              <ArrowForwardIosIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Categorie 5" />
          </StyledMenuItem>

          <StyledMenuItem onClick={(e)=> this.displayValue("Categorie 6")}>
            <ListItemIcon>
              <ArrowForwardIosIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Categorie 6" />
          </StyledMenuItem> */}

          {this.createCategories()}
        </StyledMenu>
      </div>
    );
  }

  createCategories = () =>{
    let arr = []

    arr = this.state.categories;


    return arr.map((obj,index)=>{
      return (
          <StyledMenuItem key={index} onClick={(e)=> this.displayValue(obj.categorie)} >
            <ListItemIcon>
              <ArrowForwardIosIcon fontSize ="small" />
            </ListItemIcon>
            <ListItemText primary={obj.categorie} />
          </StyledMenuItem>
      )
    })


  }

  
  displayValue = (value) =>{
    this.setState({
      filterChoice:value
    })
    console.log(this.state.filterChoice)
  }

  componentDidMount = () =>{
    this.getCategories()
  }

  getCategories = () =>{
    Axios.post('http://localhost:3030/getCategories')
    .then(res => {
      //console.log(res.data)
      this.setState({
        categories:res.data
      })
    })
    .catch(err =>{
      console.log(err)
    })
  }



}


export default FilterComponent;