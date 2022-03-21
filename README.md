# Explorjob

## Dev

### Prerequisites

- angular
- git
- node v12.11.1
- npm 6.11.3

### Recommended

- [Visual Studio Code](https://code.visualstudio.com)

### Dependencies

- explorjob-api

### Versioning

Managed with [Git](https://git-scm.com)

> Repository url  
> https://gitlab.com/client-explorjob/explorjob-webapp.git

### Installation

```bash
npm install
npm link @angular/cli
```  

## Commandes

```bash
# Exécution local
npm run start
npm run start:watch

# Exécution local avec l'environnement de dev
npm run start:dev

# Exécution local avec l'environnement de prod
npm run start:prod

# Exécution des Tests
npm run tests
npm run tests:snap-chromium

# Build local
npm run build

# Build pour l'environnement de dev
npm run build:dev

# Build pour l'environnement de prod
npm run build:prod
```  

## Prod

> ExplorJob webapp is an hybrid application with ExplorJob WordPress.  
> This deployment manage all nginx configuration for both app cohabiting.

### Prerequisites

- nginx
- git
- node v12.11.1
- npm 6.11.3

### Deployment

```bash  
sh ./deplosy.sh prod
```  
