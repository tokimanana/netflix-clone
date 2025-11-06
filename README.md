# 🎬 Netflix Clone

Un clone de l'interface Netflix développé avec Angular 17, permettant de parcourir des films par tendances et par genres en utilisant l'API TMDB (The Movie Database).

![Angular](https://img.shields.io/badge/Angular-17.3.17-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.x-purple)

## 📋 Objectif du Projet

Ce projet a été créé dans un objectif pédagogique de montée en compétences sur les technologies suivantes :

- **Angular 17** : Comprendre les dernières fonctionnalités du framework (Signals, Standalone Components, Control Flow)
- **Reactive Programming** : Maîtriser la programmation réactive avec RxJS et les Signals Angular
- **API REST Integration** : Intégrer et consommer une API externe (TMDB)
- **State Management** : Gérer l'état de l'application avec des patterns modernes
- **Responsive Design** : Créer une interface adaptative inspirée de Netflix

## 🚀 Stack Technique

### Frontend
- **Angular 17.3.17** - Framework principal
- **TypeScript 5.x** - Langage de programmation
- **Bootstrap 5** - Framework CSS pour le design responsive
- **SCSS** - Préprocesseur CSS pour les styles avancés
- **Font Awesome** - Bibliothèque d'icônes

### API
- **TMDB API** - Base de données de films et séries
  - Endpoint Trending : `/3/trending/movie/day`
  - Endpoint Genres : `/3/genre/movie/list`
  - Endpoint Discovery : `/3/discover/movie`

### Concepts Angular Avancés Utilisés
- ✅ **Standalone Components** - Architecture modulaire moderne
- ✅ **Signals** - Gestion d'état réactive (Angular 16+)
- ✅ **Effects** - Réactions aux changements de signals
- ✅ **Control Flow** - Nouvelle syntaxe `@if`, `@for` (Angular 17)
- ✅ **HttpClient** - Communication HTTP avec l'API
- ✅ **Dependency Injection** - Injection de services
- ✅ **Component Communication** - Passage de données via @Input

## 📁 Structure du Projet

```
src/
├── app/
│   ├── home/
│   │   ├── home.component.ts          # Composant principal
│   │   ├── main-content/              # Section hero avec film tendance
│   │   └── movie-selector/            # Sélecteur de films par genre
│   │       └── movie-list/            # Liste horizontale de films
│   │           └── movie-card/        # Carte individuelle de film
│   └── service/
│       ├── tmdb.service.ts            # Service API TMDB
│       └── model/
│           ├── movie.model.ts         # Modèle de données Film
│           ├── genre.model.ts         # Modèle de données Genre
│           └── state.model.ts         # Pattern State pour gestion d'état
└── environments/
    └── environment.ts                  # Configuration API Key
```

## 🎯 Fonctionnalités

- 🎥 **Section Hero** : Affichage d'un film tendance avec backdrop en plein écran
- 📊 **Films Tendances** : Liste horizontale des films populaires du jour
- 🎭 **Catégories par Genre** : Navigation par genres (Action, Adventure, etc.)
- 🖼️ **Affichage des Posters** : Images haute qualité depuis TMDB
- 📱 **Design Responsive** : Interface adaptée à tous les écrans
- ⚡ **Scroll Horizontal** : Navigation fluide dans les listes de films

## 🛠️ Installation

### Prérequis
- Node.js (v18 ou supérieur)
- npm ou yarn
- Angular CLI 17

### Étapes

1. **Cloner le repository**
```bash
git clone <votre-repo>
cd netflix-clone
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer l'API Key TMDB**

Créer un compte sur [TMDB](https://www.themoviedb.org/) et obtenir une API Key.

Créer le fichier `src/environments/environment.ts` :
```typescript
export const environment = {
  production: false,
  TMDB_API_KEY: 'VOTRE_API_KEY_ICI'
};
```

4. **Lancer le serveur de développement**
```bash
ng serve
```

Naviguer vers `http://localhost:4200/`

## 🔧 Scripts Disponibles

```bash
# Serveur de développement
ng serve

# Build de production
ng build

# Tests unitaires
ng test

# Linter
ng lint

# Génération de composants
ng generate component component-name
```

## 📚 Concepts Clés Appris

### 1. Angular Signals
Les Signals permettent une gestion d'état réactive et performante :
```typescript
private fetchTrendMovies$ = signal(State.Builder().forInit().build());
fetchtrendMovie = computed(() => this.fetchTrendMovies$());
```

### 2. Control Flow Moderne
Nouvelle syntaxe de contrôle plus intuitive :
```html
@if (trendMovies) {
  @for(movie of trendMovies; track movie.id) {
    <app-movie-card [movie]="movie"></app-movie-card>
  }
}
```

### 3. State Pattern
Gestion structurée des états (Loading, Success, Error) :
```typescript
State.Builder<MovieApiResponse, HttpErrorResponse>()
  .forSuccess(data)
  .build()
```

### 4. Standalone Components
Architecture sans modules NgModule :
```typescript
@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [],
  templateUrl: './movie-card.component.html'
})
```

## 🎨 Design Patterns Utilisés

- **Builder Pattern** : Construction d'objets State complexes
- **Observer Pattern** : Réactivité avec Signals et Effects
- **Component Pattern** : Architecture basée sur des composants réutilisables
- **Service Pattern** : Logique métier centralisée dans les services

## 🚧 Améliorations Futures

- [ ] Ajouter la recherche de films
- [ ] Implémenter les détails de film (modal)
- [ ] Ajouter la pagination pour charger plus de films
- [ ] Implémenter un système de favoris (localStorage)
- [ ] Ajouter des animations de transition
- [ ] Gérer les erreurs réseau avec retry logic
- [ ] Implémenter le lazy loading des images
- [ ] Ajouter des filtres avancés (année, note, etc.)

## 📖 Ressources

- [Documentation Angular](https://angular.io/docs)
- [TMDB API Documentation](https://developers.themoviedb.org/3)
- [Angular Signals Guide](https://angular.io/guide/signals)
- [Bootstrap Documentation](https://getbootstrap.com/docs/5.0/)

## 👤 Auteur

Projet réalisé dans le cadre d'un apprentissage personnel des technologies Angular modernes.

## 📄 Licence

Ce projet est à usage éducatif uniquement. Les données proviennent de TMDB API.

---

⭐ Si ce projet vous a été utile pour votre apprentissage, n'hésitez pas à le partager !
