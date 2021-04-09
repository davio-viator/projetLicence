import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import styles from './styles';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, Typography, } from '@material-ui/core';
import { Share as ShareIcon,MoreVert as MoreVertIcon,ExpandMore as ExpandMoreIcon,Favorite as FavoriteIcon } from '@material-ui/icons';
import hdd from '../assets/hhd.jpg';
import AddIcon from '@material-ui/icons/Add';
import ShopIcon from '@material-ui/icons/Shop';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import Axios from 'axios'

const firebase = require("firebase")

class CardComponent extends Component{

  constructor(){
    super();
    this.state = {
      expanded:false,
    }
  }

  render(){
    const {classes} = this.props;
      
    const handleExpandClick = () => {
      let b = !this.state.expanded;
      this.setState({
        expanded:b,
      })
      console.log("bouton acheter cliquer",this.props)
      let values ={id:this.props.idProduit,name:this.props.name}
      Axios.post("http://localhost:3030/testAchat",values)
      .then(res=>{

      })
      .catch(err =>{
        console.error(err)
      })

    };
    return(
      <div className="card">
        <Card className={classes.root}>
          
          <CardMedia
            className={classes.media }
            image = {this.props.Url}
            title="Paella dish"
          />
          <hr></hr>
          <CardContent className={classes.cardTextHeight}>
            <Typography align="center" variant="h6" color="textPrimary" component="p">
              {this.props.name}
              <br></br>
              {this.props.prix} €
            </Typography>
          </CardContent>

          <CardActions disableSpacing>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="show more"
            >
              <ShopIcon/>
            </IconButton>
            </CardActions>
          
        </Card>
      </div>
      
    );
  }
}

export default withStyles(styles)(CardComponent);
