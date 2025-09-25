<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const goTo = (path) => {
  router.push(path)
}
</script>

<template>
  <div class="accueil">
    <!-- 🔷 Bannière -->
    <header class="banner">
      <span class="logo-text">GestEmprunt</span>
      <p class="slogan">📚 Gérez vos emprunts en toute simplicité</p>
      <div class="actions">
        <button @click="goTo('/login')">🔐 Connexion</button>
        <button @click="goTo('/register')">📝 Inscription</button>
      </div>
    </header>

    <!-- 🧭 Navbar -->
    <nav class="navbar">
      <router-link to="/documents">📚 Documents</router-link>
      <router-link to="/emprunts">🔄 Emprunter</router-link>
      <router-link to="/notifications">🔔 Mes notifications</router-link>
      <router-link to="/profil/1">👤 Mon profil</router-link>
      <router-link to="/admin">🛡️ Espace Admin</router-link>
    </nav>

    <!-- 🎯 Grille des fonctionnalités -->
    <section class="grid-section">
      <h2>Fonctionnalités</h2>
      <div class="grid">
        <div class="card" @click="goTo('/documents')">
          <h3>📚 Consulter les documents</h3>
          <p>Explorez les ouvrages disponibles à l’emprunt.</p>
        </div>
        <div class="card" @click="goTo('/emprunts')">
          <h3>🔄 Emprunter un document</h3>
          <p>Inscrivez-vous et connectez-vous pour emprunter.</p>
        </div>
        <div class="card" @click="goTo('/notifications')">
          <h3>🔔 Mes notifications</h3>
          <p>Recevez des rappels, échéances et alertes.</p>
        </div>
        <div class="card" @click="goTo('/profil/1')">
          <h3>👤 Mon profil</h3>
          <p>Consultez vos emprunts et vos notifications.</p>
        </div>
        <div class="card" @click="goTo('/admin')">
          <h3>🛡️ Espace Admin</h3>
          <p>Visualisez tous les utilisateurs et leurs emprunts.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.accueil {
  font-family: 'Segoe UI', sans-serif;
  color: #2c3e50;
}

.banner {
  text-align: center;
  background: linear-gradient(to right, #1976d2, #42a5f5);
  color: white;
  padding: 2rem;
}

.logo-text {
  font-size: 2.5rem;
  font-weight: bold;
  letter-spacing: 1px;
  background: white;
  color: #1976d2;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  display: inline-block;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.slogan {
  font-size: 1rem;
  margin-top: 0.5rem;
}

.actions button {
  margin: 0.5rem;
  padding: 0.6rem 1rem;
  background: white;
  color: #1976d2;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.actions button:hover {
  background-color: #e3f2fd;
}

.navbar {
  display: flex;
  justify-content: center;
  gap: 1rem;
  background-color: #1565c0;
  padding: 1rem;
}

.navbar a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.navbar a:hover {
  background-color: #0d47a1;
}

.grid-section {
  padding: 2rem;
  text-align: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.card {
  background: #f4f4f4;
  padding: 1.2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.3s, background-color 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  background-color: #e3f2fd;
}
</style>