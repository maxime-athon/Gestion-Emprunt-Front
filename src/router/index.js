import { createRouter, createWebHistory } from "vue-router"

// Vues principales
import Accueil from "../views/Accueil.vue"
import Documents from "../views/Documents.vue"
import Emprunts from "../views/Emprunts.vue"
import Notifications from "../views/Notifications.vue"
import UsersWithEmprunts from "../views/UsersWithEmprunts.vue"

// Authentification
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"

// Espaces personnalisés
import Profil from "../views/Profil.vue"
import Admin from "../views/Admin.vue"

const routes = [
  // 🔐 Authentification
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },

  // 🧑‍🏫 Espace personnel
  { path: "/profil/:id", name: "Profil", component: Profil },

  // 🛡️ Espace admin
  { path: "/admin", name: "Admin", component: Admin },

  // 📚 Vues classiques
  { path: "/documents", name: "Documents", component: Documents },
  { path: "/emprunts", name: "Emprunts", component: Emprunts },
  { path: "/notifications", name: "Notifications", component: Notifications },
  { path: "/utilisateurs-emprunts", name: "UtilisateursEmprunts", component: UsersWithEmprunts },
  { path: "/accueil", name: "Accueil", component: Accueil },

  // 🔁 Redirection par défaut
  { path: "/", redirect: "/accueil" }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router