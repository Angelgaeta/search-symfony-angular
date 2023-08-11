# Composant de Recherche Angular

Ce composant Angular est conçu pour effectuer des recherches dans un ensemble de données JSON d'événements. Il permet aux utilisateurs de rechercher des événements en fonction de critères tels que le lieu et le nom de l'événement.

## Fonctionnalités

- Affichage d'un formulaire de recherche avec les champs "lieu" et "événement".
- Validation des champs de recherche.
- Chargement des données JSON à partir d'un fichier local.
- Gestion des différentes combinaisons de recherche.

## Utilisation

1. Cloner le projet ou intégrer ce composant dans votre application Angular existante.
2. Assurez-vous que les dépendances nécessaires sont installées en exécutant la commande `npm install` (si ce n'est pas déjà fait).
3. Utilisez le composant `SearchComponent` dans votre application en l'ajoutant à un template HTML.

```html
<app-search></app-search>
```

4. Lorsque l'utilisateur soumet le formulaire de recherche, le composant affiche les résultats correspondants selon les critères de recherche.

## Configuration

Le composant utilise Angular Forms et HttpClient pour fonctionner. Assurez-vous que votre application est configurée pour utiliser ces modules.

### `search.component.ts`

- `searchForm`: Représente le formulaire de recherche contenant les champs "lieu" et "événement".
- `error`: Un indicateur qui est défini sur `true` lorsque le formulaire est soumis avec des champs vides.
- `test`: Un tableau pour stocker les données JSON chargées depuis le fichier local.
- `searchResults`: Un tableau pour stocker les résultats de la recherche.
- `_jsonUrl`: L'URL du fichier JSON contenant les données d'événement.

### Méthodes

- `getJSON()`: Récupère les données JSON à partir de `_jsonUrl` en utilisant HttpClient.
- `ngOnInit()`: Méthode du cycle de vie d'Angular, initialise le formulaire de recherche et charge les données JSON lors du chargement du composant.
- `initsearchForm()`: Initialise le formulaire de recherche avec les champs "lieu" et "événement".
- `onsubmitSearchForm()`: Gère la soumission du formulaire de recherche en fonction des critères de recherche saisis par l'utilisateur.

## Auteur

Ce composant a été créé par [ Angel R. ].

## Remarque

Assurez-vous d'adapter ce composant à vos besoins spécifiques et d'ajouter des styles CSS appropriés pour améliorer l'expérience utilisateur.
