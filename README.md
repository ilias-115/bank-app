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


![image](https://user-images.githubusercontent.com/93160985/145285366-77031df2-6de5-4199-bfc8-d298773de43c.png)

Si on se connecte avec un compte inexistant, un pop-up d'erreur s'affichera.
On va d'abord se connecter en administrateur.


![image](https://user-images.githubusercontent.com/93160985/145285994-56304e57-0ff5-454f-8b7d-253580a8996a.png)

Fixer un découvert à -200.

Puis créer deux comptes banquaire avec des adresses gmail avec lesquelles on peut se connecter, et un autre compte avec une adresse mail aléatoire. 

Tester la suppression d'un compte, si le compte n'existe pas, un pop-up d'erreur s'affichera.

Déconnecter le compte administrateur.

Ensuite on va se connecter avec un compte client que l'on a créé précedement.

![image](https://user-images.githubusercontent.com/93160985/145287411-9c6fa5b1-95e2-4975-ba9d-daab62687d2e.png)

On peut maintenant tester les différentes opérations de retrait ou de dépot (par tranche de 100€).

Ainsi que l'opération de transfert d'argent, si le numéro de compte n'existe pas, ou si le montant saisi est négatif, ou si le plafond de découvert est atteint, un pop-up d'erreur s'affichera.

On peut aussi se connecter sur l'autre compte pour voir si le transfert d'argent a bien eu lieu.

Pour finir, on peut voir les différents évenements réalisés via les logs (voir la console de Spring Tools).

# Conclusion 

Les principaux objectifs ont été réalisés. Néamoins, il reste un bug sur la conversion de devise, en effet, la fenêtre de conversion est aléatoirement manquante.



