import React, { Component } from 'react'
import NavBarComponent from '../navbar/navBar';
import CardComponent from '../card/card';

import Axios from 'axios';

const firebase = require('firebase')

class HomeComponent extends Component{
  
  constructor(){
    super();
    this.state = {
      produits : []
    }
  }

  render(){
    return(
      <div>
        <NavBarComponent onChange={this.onSubmit} 
        produits={this.state.produits} history={this.props.history}/>
        <div className="card_container">
          {this.createCard()}
        </div>
      </div>
    )
  }

  createCard = () =>{
    let arr = []

    arr = this.state.produits

    return arr.map((obj,index)=>{
      return (
        <CardComponent name={obj.nom} prix={obj.prix} 
        description={obj.description} Url={obj.Url} idProduit={obj.refProduit} key={index}/>
      )
    })
  }

  componentDidMount = () =>{
    this.GetProduit();
    firebase.auth().onAuthStateChanged(async _usr =>{
      if(!_usr)
          //this.props.history.push("/login");
          console.log()
      else{
        console.log("connecté")
      }
  })
    
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

  onSubmit = (data) =>{
    console.log('Input received in parent component')
    this.setState({
      produits:data
    })
    console.log(data)
    this.createCard()
  }

}

export default HomeComponent;