import React, { Component } from 'react';
import '../styles/main.css';
import '../styles/banks/cic.css';
import '../bulma.min.css';
import visa from '../images/visa.png';
import mastercard from '../images/masterard.png';
import axios from 'axios';

import { faSignOutAlt, faPhone, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Admin extends Component {

    state = {
        bankPhone : "",
        bankMail : "",

        decouvert : 0,
        montant : '',

        numCompte : '',
        email : "",

        firstName : "",
        lastName : "",

        numCompteDel : ""

    }

    componentDidMount() {
        var data = require('../data/cic.json');
        this.setState({
          bankPhone : data.phoneNumber,
          bankMail : data.mail
        })
        //Requete pour recuperer le montant de decouvert actuel
        axios.get('http://localhost:8080/db_bank/comptes/getDecouvert')
        .then(response => {
          this.setState({
            decouvert : response.data
          })
        })
        .catch(error => {
          console.log(error)
        })
       
    }

    deconnexion = () => {
      this.props.logout()
    }

    // Handle de récupération des données d'un formulaire
    handleForm = event => {
      this.setState({
        [event.target.name] : event.target.value
      })
    }

    // Handle de mise à jour du découvert
    handleDecouvert = event => {
      event.preventDefault();
      if(parseInt(this.state.montant) > 0) {
        alert("Veuillez saisir un montant inférieur ou égal à 0. ")
      } else {
        //Requete de modification du decouvert
        axios.get('http://localhost:8080/db_bank/comptes/setDecouvert/' + this.state.montant)
          .then(response => {
            this.setState({
              decouvert : response.data
            })
          })
          .catch(error => {
            console.log(error)
          })
      }

    }

    // Handle de creation d'un nouveau compte client
    handleCreationCompte = event => {
      event.preventDefault();

      var req = {
        numCompte : this.state.numCompte,
        email : this.state.email,
        firstName : this.state.firstName,
        lastName : this.state.lastName,
        balance : 0          
      }

      //Requete de creation d'un nouveau compte
      axios.post('http://localhost:8080/db_bank/comptes', req)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })

      this.setState({
        email : '',
        numCompte : '',
        firstName : '',
        lastName : ''
      })
    }

    // Handle de creation d'un nouveau compte client
    handleSuppressionCompte = event => {
      event.preventDefault();

      //Requete de suppression d'un compte
      axios.get('http://localhost:8080/db_bank/comptes/delete/' + this.state.numCompteDel)
      .then(response => {
        if(response.data) {
          alert("Compte numéro " + this.state.numCompteDel + " supprimé.")
        } else {
          alert("Compte numéro " + this.state.numCompteDel + " inexistant.")
        }
      })
      .catch(error => {
        console.log(error)
      })
    }

    render() {
    return (
      <div className="container" style={{marginTop: '5%'}}>

        <div className="column" style={{textAlign: 'right'}}>
          <span id="logout-button-container">
            <button className="button is-danger is-outlined" id="logout-button" onClick={this.deconnexion}>
              <span className="icon">
                <FontAwesomeIcon icon={faSignOutAlt} />
              </span>
              <span>Logout</span>
            </button>
          </span> 
          <span id="logged-tag" className="tag is-success is-medium">Connected</span>
        </div>

        <section className="section">
          <div className="container">
            <h1 className="title primary-color-text" id="bankNameContainer">Compte administrateur</h1>
          </div>
        </section>
      
        <div className="columns is-mobile">
      
          <div className="column is-4 is-offset-0">
            <div className="box">
              <form onSubmit={this.handleDecouvert}>
                <strong>Découvert</strong><br/><br/>
                Montant découvert actuel : <strong>{this.state.decouvert}</strong>
                <br/><br/>
                <label>Nouveau montant autorisé : </label><br/>
                <input type="text" name="montant" value={this.state.montant} placeholder='montant' onChange={this.handleForm}/>
                <br/><br/>
                <input type="submit" value="Valider"/>
              </form>
            </div>
          </div>

          <div className="column is-4 is-offset-0">
            <div className="box">
              <form onSubmit={this.handleCreationCompte}>
                <strong>Création de compte client : </strong>
                <br/><br/>
                <label>Numéro de compte : </label><br/>
                <input type="text" name="numCompte" value={this.state.numCompte} placeholder='numero de compte' onChange={this.handleForm}/>
                <br/>
                <label>Adresse email : </label><br/>
                <input type="text" name="email" value={this.state.email} placeholder='email' onChange={this.handleForm}/>
                <br/>
                <label>Prénom : </label><br/>
                <input type="text" name="firstName" value={this.state.firstName} placeholder='firstName' onChange={this.handleForm}/>
                <br/>
                <label>Nom : </label><br/>
                <input type="text" name="lastName" value={this.state.lastName} placeholder='lastName' onChange={this.handleForm}/>
                <br/><br/>
                <input type="submit" value="Créer" />
              </form>
            </div>          
          </div>    

          <div className="column is-4 is-offset-0">
            <div className="box">
              <form onSubmit={this.handleSuppressionCompte}>
                <strong>Suppression d'un compte client : </strong>
                <br/><br/>
                <label>Numéro de compte : </label><br/>
                <input type="text" name="numCompteDel" value={this.state.numCompteDel} placeholder='Numéro de compte' onChange={this.handleForm}/>
                <br/><br/>
                <input type="submit" value="Supprimer" />
              </form>
            </div>          
          </div>        
        </div>



        <div className="columns is-mobile">
          <div className="column is-6">
            <div className="content secondary-color-text">
              Contact
              <ul>
                <li>
                  <FontAwesomeIcon icon={faPhone} />
                  <span id="phoneNumberContainer"> {this.state.bankPhone}</span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span id="mailContainer"> {this.state.bankMail}</span>
                </li>
              </ul>
            </div>
          </div>
      
          <div className="column is-offset-4 is-2">
            <div className="columns is-mobile">
              <div className="column is-half">
                <figure className="image is-64x64">
                  <img src={mastercard} alt="neMarchePas" />
                </figure>
              </div>
              <div className="column is-half">
                <figure className="image is-64x64">
                  <img style={{marginTop: '13px'}} src={visa} alt="neMarchePas" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;