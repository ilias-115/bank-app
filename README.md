# bank-app

# Pré-requis

## Back-end :

- Spring Tools 4.12.X ou supérieur.
- Java 8.

## Base de Données :

- MySQL avec un compte username : root, password : root

## Front-end :

- NodeJS
- Commande `create-react-app` avec `npm install -g create-react-app`

# Démarrage

## Front-end

- Créer un projet react :

`create-react-app bank_app`

`cd bank_app`

- Supprimer tous les fichiers sauf le dossier 'node_modules' et copier le contenu du dossier 'bank_frontend' dans bank_app.
- Installer les dépendances :

`npm i --save @fortawesome/free-brands-svg-icons`

- Lancer l'application :

`npm start`

## Back-end

- Importer le fichier 'bank_backend'.
- Clic droit sur 'fr.su.BankBackendApplication.java' -> Run as -> Spring boot app
- Le serveur devrait se lancer.
