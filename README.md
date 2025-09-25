
## 📘 README — Frontend Vue.js · *Gestion d’Emprunt*

### 🎯 Objectif du projet

Ce frontend Vue.js constitue l’interface utilisateur du système **Gestion d’Emprunt**, destiné à faciliter l’accès aux documents, la gestion des emprunts et le suivi des notifications pour les utilisateurs et les administrateurs.

---

### 🧩 Technologies utilisées

- **Vue.js 3** avec `<script setup>`
- **Vue Router** pour la navigation
- **Axios** pour les appels API
- **Vite** pour le bundling et le développement rapide
- **CSS scoped** pour un style modulaire et maintenable

---

### 🗂️ Structure des composants

| Composant        | Rôle                                                                 |
|------------------|----------------------------------------------------------------------|
| `Login.vue`      | Authentification utilisateur/admin                                   |
| `Register.vue`   | Inscription avec validation email/mot de passe                       |
| `Profil.vue`     | Vue personnalisée selon le rôle, affichage des emprunts et notifications |
| `Admin.vue`      | Tableau de bord administrateur avec accès aux utilisateurs et emprunts |
| `Navbar.vue`     | Barre de navigation dynamique selon le rôle                          |
| `DocumentList.vue` | Liste des documents disponibles à emprunter                        |

---

### 🔐 Gestion des rôles

- Les rôles sont définis via `is_admin` dans le `localStorage`
- L’accès aux routes est conditionné par des vérifications dans `onMounted`
- Les composants affichent dynamiquement les sections selon le rôle

---

### 🔗 Connexion au backend

Les appels API sont dirigés vers :

```
http://127.0.0.1:5000/api/
```

> Pour un déploiement, modifier l’URL dans `axios.defaults.baseURL` ou dans chaque appel.

---

### 🚀 Lancer le projet en local

```bash
cd frontend
npm install
npm run dev
```

---

### 🧪 Tester en tant qu’administrateur

Dans la console du navigateur :

```js
localStorage.setItem('user', JSON.stringify({
  user_id: 1,
  nom: 'admin',
  email: 'admin',
  is_admin: true
}))
```

Puis accéder à `/admin` ou `/profil/1`.

---

### 📦 Préparer pour le déploiement

```bash
npm run build
```

Le dossier `dist/` peut être déployé sur :
- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)
- Serveur Nginx ou Apache

---

### 📄 À venir

- Export PDF des emprunts
- Pagination des utilisateurs
- Mode sombre
- Traduction multilingue

---

### 🤝 Contribuer

Les contributions sont les bienvenues ! Forkez le projet, créez une branche et proposez vos améliorations via une pull request.

---

