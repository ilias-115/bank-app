import React, { Component } from 'react';
import '../styles/main.css';

import '../bulma.min.css';

import socgen from '../images/bank_icons/societe_generale.png';


import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import { faMicrosoft } from '@fortawesome/free-brands-svg-icons';

import { faGithub } from '@fortawesome/free-brands-svg-icons';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import socialMediaAuth from '../service/auth';

import { googleProvider } from '../Config/authMethods';

import { githubProvider } from '../Config/authMethods';


import visa from '../images/visa.png';
import mastercard from '../images/masterard.png';

import { faPhone, faEnvelope} from '@fortawesome/free-solid-svg-icons';

class Connexion extends Component {
 
  state = {
    admin : "bank.app.adm@gmail.com",
    bankPhone : "",
    bankMail : "",
    bankDescription : "",
    bankName : "",
  }

  componentDidMount() {
    var data = require('../data/societe_generale.json');
    this.setState({
      bankName : data.name,
      bankDescription : data.description,
      bankPhone : data.phoneNumber,
      bankMail : data.mail
    })
  }

  //Passe par firebase pour la connexion aux comptes
  handleOnClick = async (provider) => {
    const res = await socialMediaAuth(provider);
    console.log(res)
    if(res.email === this.state.admin) {
      //Connexion de l'administrateur
      this.props.fctAdmin()
    }
    if(res.emailVerified === true) {
      //Appeler la fonction du Composant App, l'utilisateur est connecte donc passer l'etat connected a true
      //Passer en parametre l'adresse email de l'utilisateur qui vient de se connecter
      this.props.fctConnection(res.email)
    }
  }

  render() {
    return (
      <div className="container" style={{marginTop: '5%'}}>
        <div className="columns">
          <div className="column">
            <span id="login-buttons-container">



              <button className="button is-info is-outlined" id="google-login-button" style={{display: 'default'}} onClick={() => this.handleOnClick(googleProvider)}>
                <span className="icon">
                  <FontAwesomeIcon icon={faGoogle}/>
                </span>
                <span>Google login</span>
              </button>


              <button className="button is-link is-outlined" id="microsoft-login-button">
                <span className="icon">
                <FontAwesomeIcon icon={faMicrosoft}/>
                </span>
                <span>Microsoft login</span>
              </button>



              <button className="button is-dark is-outlined" id="github-login-button" onClick={() => this.handleOnClick(githubProvider)}>
                <span className="icon">
                <FontAwesomeIcon icon={faGithub}/>
                </span>
                <span>Github login</span>
              </button>



            </span>
          </div>
          <div className="column" style={{textAlign: 'right'}}>
            <span id="not-logged-tag" className="tag is-warning is-medium">Not connected</span>
          </div>
        </div>

        <section className="section">
          <div className="container">
            <h1 className="title primary-color-text" id="bankNameContainer">{this.state.bankName} : Page de connexion</h1>
            <h2 className="subtitle secondary-color-text" id="bankDescriptionContainer">{this.state.bankDescription}</h2>
          </div>
        </section>

        <div className="media-left" style={{  top: '50%', left: '45%', position: 'fixed'}}>
            <figure className="image is-128x128">
              <img src={socgen} alt="neMarchePas" />
            </figure>
          </div>
        
        <div className="columns is-mobile">
          <div className="column is-6" style={{bottom:0, position:'fixed'}}>
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
      
          <div className="column is-offset-8 is-2" style={{bottom:0, position:'fixed'}} >
            <div className="columns is-mobile"  >
              <div className="column is-half" >
                <figure className="image is-64x64">
                  <img style={{marginLeft: '150px'}} src={mastercard} alt="neMarchePas" />
                </figure>
              </div>
            
            <div className="column is-mobile">
              <figure className="image is-64x64">
                <img style={{marginTop: '13px', marginLeft: '100px'}} src={visa} alt="neMarchePas" />
              </figure>
            </div>

            </div>
      </div>
      


        



        </div>
      </div>

      
    );
  }
}

export default Connexion;