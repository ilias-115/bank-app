import React, { Component } from 'react';
import '../styles/main.css';
import '../styles/banks/societe_generale.css';
import '../bulma.min.css';
import socgen from '../images/bank_icons/societe_generale.png';
import visa from '../images/visa.png';
import mastercard from '../images/masterard.png';
import axios from 'axios';

import { faSignOutAlt, faArrowDown, faArrowUp, faPhone, faEnvelope, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Compte extends Component {
  
  state = {
    n_account : 0,
    balance : 0,
    firstName : "",
    lastName : "",
    id : 0,
    email : "",

    bankName : "",
    bankDescription : "",
    bankPhone : "",
    bankMail : "",

    destinataire : '',
    montant : '',

    decouvert : '',

    tmpid : 0,
    tmpnumCompte : 0,
    tmpemail : "",
    tmpfirstName : "",
    tmplastName : "",
    tmpbalance : 0,

    retrait : 100,
    depot : 100,

  }

  componentDidMount() {
    var data = require('../data/societe_generale.json');
    this.setState({
      bankName : data.name,
      bankDescription : data.description,
      bankPhone : data.phoneNumber,
      bankMail : data.mail
    })

    var req = "/" + this.props.whoisconnected
    // On récupère les infos du compte connecté 
    axios.get('http://localhost:8080/db_bank/comptes/email' + req)
      .then(response => {
        this.setState({
          n_account : response.data.numCompte,
          balance : response.data.balance,
          firstName :response.data.firstName,
          lastName :response.data.lastName,
          id : response.data.id,
          email : response.data.email
        })
      })
      .catch(error => {
        // Si le compte n'existe pas on ne se connecte pas 
        alert("Compte inexistant !")
        this.deconnexion()
        console.log(error)
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

  withdraw = () => {
    if(this.state.balance - this.state.retrait < this.state.decouvert
      || parseInt(this.state.retrait) < 0) {
      //Retourne une alerte si le retrait depasse le decouvert autorise
      alert("Découvert atteint !\nImpossible de retirer plus")
    } else {
      //Sinon requete vers le serveur pour mettre a jour la valeur dans la base de donnees
      var req = {
        "id" : this.state.id,
        "numCompte" : this.state.n_account,
        "email" : this.state.email,
        "firstName" : this.state.firstName,
        "lastName" : this.state.lastName,
        "balance" : this.state.balance-this.state.retrait
       }
       axios.put('http://localhost:8080/db_bank/comptes/operation/'+this.state.id, req)
        .then(response => {
          this.setState({
            balance : response.data.balance
          })
        })
        .catch(error => {
        console.log(error)
      })
    }
  }

  deposit = () => {
    if(parseInt(this.state.depot) < 0 ) {
      //Retourne une alerte si le montant est negatif 
      alert("Transfert impossible !")
      return
    } 
    var req = {
        "id" : this.state.id,
        "numCompte" : this.state.n_account,
        "email" : this.state.email,
        "firstName" : this.state.firstName,
        "lastName" : this.state.lastName,
        "balance" : this.state.balance+parseInt(this.state.depot)
    }
    //Requete vers le serveur pour mettre a jour la valeur dans la base de donnees
    axios.put('http://localhost:8080/db_bank/comptes/operation/'+this.state.id, req)
      .then(response => {
        this.setState({
          balance : response.data.balance
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

  //Handle de transfert d'une somme d'un compte vers un autre
  transfert = event => {
    event.preventDefault();

    if(this.state.balance - parseInt(this.state.montant) < this.state.decouvert
    || parseInt(this.state.montant) < 0 || this.state.destinataire === this.state.n_account) {
      //Retourne une alerte si le retrait depasse le decouvert autorise ou si le montant est negatif
      // ou si le destinataire est le meme que le compte courant 
      alert("Transfert impossible !")
    } else {
      axios.get('http://localhost:8080/db_bank/comptes/transfert/' 
                          + this.state.destinataire + '/' + this.state.montant)
      .catch(error => {
        console.log(error)
      })

      var req = {
        "id" : this.state.id,
        "numCompte" : this.state.n_account,
        "email" : this.state.email,
        "firstName" : this.state.firstName,
        "lastName" : this.state.lastName,
        "balance" : this.state.balance - parseInt(this.state.montant)
      }
      axios.put('http://localhost:8080/db_bank/comptes/operation/'+this.state.id, req)
      .then(response => {
        this.setState({
          balance : response.data.balance
        })
      }) 
      .catch(error => {
        console.log(error)
      })

    }
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
            <h1 className="title primary-color-text" id="bankNameContainer">{this.state.bankName}</h1>
            <h2 className="subtitle secondary-color-text" id="bankDescriptionContainer">{this.state.bankDescription}</h2>
          </div>
        </section>
      
        <div className="columns is-mobile">
      
          <div className="column is-4 is-offset-0">
            <div className="box">
              <article className="media">
                <div className="media-left">
                  <figure className="image is-64x64">
                    <img src={socgen} alt="neMarchePas" />
                  </figure>
                </div>
                <div className="media-content">
                  <div className="content">
                    <p>
                    <strong> {this.state.firstName} {this.state.lastName}</strong> <br />
                      <text>Account n° <span id="accountId">{this.state.n_account}</span></text> <br />
                      <small>Current balance : <span id="accountBalance">{this.state.balance}</span>
                        <span id="accountCurrency"></span></small>
                    </p>
                  </div>
                  <nav className="level is-mobile">
                    <div className="level-left">
                      <a className="level-item" href="https://www.societe_generale.fr/fr/index.html" aria-label="info">
                        <span className="icon is-small primary-color-text">
                        <FontAwesomeIcon icon={faInfoCircle}/>
                        </span>
                      </a>
                    </div>
                  </nav>
                </div>
              </article>
            </div>
          </div>

          <div className="column is-4 is-offset-0">
            <div className="box">
              <form onSubmit={this.transfert}>
                <strong>Transfert</strong>
                <br/>
                <label>Destinataire (N° compte) : </label><br/>
                <input type="text" name="destinataire" value={this.state.destinataire} placeholder='numero de compte' onChange={this.handleForm}/>
                <br/>
                <label>Montant : </label><br/>
                <input type="text" name="montant" value={this.state.montant} placeholder='montant' onChange={this.handleForm}/>
                <br/><br/>
                <input type="submit" value="Transferer"/>
              </form>
            </div>
          </div>

          <div className="column is-4 is-offset-0">
            <iframe title="Converter" src="https://xeconvert.com/widget1?from=usd&to=eur&lang=&theme=blue&font=12"
              width="100%" height="100%"></iframe>
          </div>


        </div>
      
        <div className="columns is-mobile">
          <div className="column is-2 is-offset-0">
            <div className="box" style={{textAlign: 'center'}}>
              <input type="text" style={{ width:"50px" }} name="retrait" value={this.state.retrait} placeholder='retrait' onChange={this.handleForm}/>
              <br/><br/>
              <button id="withdraw-button" onClick={this.withdraw} className="button primary-color">
              <span className="icon">
              <FontAwesomeIcon icon={faArrowDown}/>
              </span>
              <span>Withdraw</span>
              </button>
            </div>
          </div>
          
          <div className="column is-2 is-offset-8">
            <div className="box" style={{textAlign: 'center'}}>
              <input type="text" style={{ width:"50px" }} name="depot" value={this.state.depot} placeholder='depot' onChange={this.handleForm}/>
              <br/><br/>
              <button id="withdraw-button" onClick={this.deposit} className="button secondary-color">
              <span className="icon">
              <FontAwesomeIcon icon={faArrowUp}/>
              </span>
              <span>Deposit</span>
              </button>
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

export default Compte;