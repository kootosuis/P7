# P7
le projet 7 openclassrooms - un réseau social d'entreprise façon Reddit ou 9GAG

Projet 7 - Groupomania !
Créer un réseau social d'entreprise. 

* VueJs
* NodeJs + express + sequelize
* Mysql


Lien GitHub

VADEMECUM : 

A - Préparation stockage des médias

Créer un dossier backend/07media
Y copier le fichier  feather.png qui se trouve dans backend/02assets


B - Base de données
Se connecter au serveur MySql de votre choix.

Exécuter le script groupomaniaDB.sql  qui se trouve à la racine du projet.

Ce script crée deux profils ADMIN : 

Email : admin@admin.ad 
MdP: ADMINadmin1!

Email : admin2@admin.ad 
MdP: ADMINadmin1!

Ces profils permettent de créer d’autres comptes ADMIN.
Ils permettent également d’effacer des profils ADMIN, à condition que le nombre de profils ADMIN soit supérieur à 2.

Ces profils sont des profils modérateurs.



C -Variables d’environnement

Créer un fichier backend/.env et, en adaptant les variables d’environnement, y écrire :

PORT = 3000
SECRET_JWT_KEY = "tokensecretadefinir"
DBCONNECT=mysql://USER:MYSQLPASSWORD@HOST:PORT/DATABASE


Exemple :
si :
MYSQLPASSWORD = "superMdP"
USER = "ROOT"
DATABASE = "groupomania"
HOST:PORT="localhost:3306"
alors
DBCONNECT=mysql://root:superMdP@localhost:3306/groupomania

NB : à vous de choisir votre SECRET_JWT_KEY, qui comme son nom l’indique est une clé qui sécurise l’encodage JWTD - Initialisation :

Frontend
Ouvrir le dossier Frontend dans le terminal de l’éditeur puis exécuter les commandes suivantes:

	npm i 

pour installer les modules et les dépendances requises


npm run serve 

Retour console :
App running at:
  - Local:   http://localhost:8081/ 
  - Network: http://192.168.1.64:8081/

Backend
Ouvrir le dossier Backend dans le terminal de l’éditeur puis exécuter les commandes:

	npm i 

pour installer les modules et les dépendances requises

nodemon 01server

Retour console :
[nodemon] 2.0.16
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node 01server.js`
Listening on port 3000

Il est recommandé de créer immédiatement deux nouveaux profils ADMIN et, en étant authentifié comme l’un des nouveaux administrateurs, d’effacer les deux installés par défaut.
Ensuite, c’est à vous de jouer et de définir par vos premiers shares qui constitueront la ligne éditoriale de votre nouvelle application, LE REZO.

E - Utilisation et API

Pour s'inscrire sur LE REZO, le social network de Groupomania, il faut renseigner :
* Nom et prénom
* Une adresse mail valide
* Je propose d’ajouter au profil des éléments, comme une courte présentation, le service dans lequel la personne travaille et son rôle dans l’entreprise.
* Un mot de passe  qui doit contenir au minimum 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial.

Par la suite, l’utilisateur pourra modifier son profil.

Le compte peut être supprimé par l’utilisateur comme par l’administrateur.

Une fois connecté, l’utilisateur peut voir les publications des utilisateurs et publier au choix:
* un partage
* une image
* un partage + une image 

Ces partages peuvent être commentés, corrigés et supprimés par l’utilisateur et par le modérateur.
