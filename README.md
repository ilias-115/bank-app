# bank-app

Binôme : Ilias Aaguida, Nagulan Selvachandran

L’objectif de ce projet est de développer une application simple de services bancaires, en
utilisant les technologies JEE et/ou Spring.

Architecture utilisée :

- Back-end : Spring

- Front-end : React 

- Base de donnée : MySQL

# Pré-requis

## Back-end :

- Spring Tools 4.12.X ou supérieur.
- Java 8.

## Base de Données :

- MySQL avec un compte username : root, password : root
- Créer la base de données 'bd_bank'

`mysql -u root -p`

`CREATE DATABASE bd_bank;`


## Front-end :

- NodeJS.
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

# Démo

Pour la démonstation, le compte administrateur utilisé est le suivant :

adresse mail : bank.app.adm@gmail.com 

mot de passe : devrepmdp


La page de connexion est la suivante :

![Capture d’écran de 2022-01-25 22-41-53](https://user-images.githubusercontent.com/46990905/151056395-2c77a7b9-1cb9-46f4-bce3-0fa8eb3e4dc0.png)

Si on se connecte avec un compte inexistant, un pop-up d'erreur s'affichera.
On va d'abord se connecter en administrateur.


![image](https://user-images.githubusercontent.com/93160985/145285994-56304e57-0ff5-454f-8b7d-253580a8996a.png)

Fixer un découvert à -200.

Puis créer deux comptes banquaire avec des adresses gmail avec lesquelles on peut se connecter, et un autre compte avec une adresse mail aléatoire. 

Tester la suppression d'un compte, si le compte n'existe pas, un pop-up d'erreur s'affichera.

Tester la modification d'un compte, si le compte n'existe pas, un pop-up d'erreur s'affichera.

Déconnecter le compte administrateur.

Ensuite on va se connecter avec un compte client que l'on a créé précedement.

![Capture d’écran de 2022-01-25 22-40-30](https://user-images.githubusercontent.com/46990905/151056491-e9eaa78b-9cf1-4ec4-8d20-6b6f5efc397b.png)

On peut maintenant tester les différentes opérations de retrait ou de dépot en indiquant le montant souhaité.

Ainsi que l'opération de transfert d'argent, si le numéro de compte n'existe pas, ou si le montant saisi est négatif, ou si le plafond de découvert est atteint, un pop-up d'erreur s'affichera.

On peut aussi se connecter sur l'autre compte pour voir si le transfert d'argent a bien eu lieu.

Pour finir, on peut voir les différents évenements réalisés via les logs (voir la console de Spring Tools).



# Lignes de produits pour la gestion de la variabilité 

![Capture d’écran de 2022-01-25 22-14-15](https://user-images.githubusercontent.com/46990905/151052643-c9d32a15-044a-497b-9bf6-af2dafe4f029.png)

- Lancer Visual Studio Code.
- Importer l'ensemble du frontend.
- Selectionner l'onglet Mobioos Forger Explorer.
- Dérouler l'onglet "Bank".
- Dérouler l'onglet "Customizations".
- Séléctionner "Edit the customization" sur le fichier customization "TEST_VERSION_FINAL"
- Selectionnez l'ensemble des variabilités que l'on souhaite créer
- Appuyer sur "Save" puis "Derivate"
- Le projet dérivée se trouve à "/home/name/mobioos/TEST_VERSION_FINAL"
- Copier l'ensemble de se projet dans le dossier bank_app/src.

Il faut au préalable avoir lancer la backend depuis Spring.
- Importer le fichier 'bank_backend'.
- Clic droit sur 'fr.su.BankBackendApplication.java' -> Run as -> Spring boot app
- Le serveur devrait se lancer.


- Lancer l'application : "npm start"


# Conclusion 

Les principaux objectifs ont été réalisés. 




