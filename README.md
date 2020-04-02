# Les recettes de Martine

Un site de partage de recettes.  

Pour lancer front sur localhost:3000
```
npm i
npm run dev
```
Bonjour,
Notre groupe est composé de Camille Dufour IMM, Mahé Tardy ASR et Louis Blenner ASR.
Nous souhaitons developper un site de partage de recettes de cuisine (genre Marmiton).
Voici une premiere liste de fonctionnalités, de pages et un premier jet sur la gestion des données.
Ce qui est marqué en Principales est ce sur quoi nous nous pencherons en priorité pour avoir un fonctionnement minimale du site.

### Fonctionnalités

##### Principales
- Afficher une liste de recette
- Creer une page recette.
- Afficher un page de recette

##### Secondaires

- Noter une recette.
- Avoir un compte utilisateur
- Ajouter un commentaire à une recette.
- Creer une page recette avec
  - Inclure un vidéo yt
  - Ajout mot clefs (dessert...)
- Chercher une recette.
  - Mot clefs
  - Ingrédients
- Afficher une liste de recette selon
  - Les plus récentes
  - Les mieux noté
- Avoir une liste de recettes favorites
- Modifier/ Supprimer une page recette
  - Notifier ceux qui l'ont ajouter a leur liste favorite
- Modifier/ Supprimer commentaire/ rating
- Suivre des gens pour etre notifier des nouvelle recettes qu'ils publient

### Pages

##### Principales

- Page d'acceuil
  - Liste de recettes
  - Barre de recette
  - Bouton ajout de recette
- Page ajout de recette
- Page recette


### Données

##### Principales

- Recette
  - nom
  - ingredients: liste
  - recette  
  (
  - lien (photo/yt)
  - userid  
  )
  
##### Secondaires

- Users
  - pseudo
  - mail
  - mdp
- Commentaire
  - rating
  - critique
  - recetteid
  - userid
- Favoris
  - userid
  - recetteid
