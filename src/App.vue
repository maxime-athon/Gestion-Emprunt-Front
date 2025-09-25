<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, computed } from 'vue'

const route = useRoute()
const router = useRouter()
const user = ref(null)

const goHome = () => {
  router.push('/accueil')
}

// Charger l'utilisateur dès le montage
const stored = localStorage.getItem('user')
if (stored) {
  user.value = JSON.parse(stored)
}

const userId = computed(() => user.value?.user_id || '')
const isAdmin = computed(() =>
  user.value?.is_admin && user.value.nom === 'admin' && user.value.email === 'admin'
)
</script>

<template>
  <div>
    <!-- ✅ Navbar visible sauf sur /accueil -->
    <nav v-if="route.path !== '/accueil'" class="navbar">
      <span class="logo-text" @click="goHome">GestEmprunt</span>
      <router-link to="/documents">📚 Documents</router-link>
    <router-link v-if="user && user.is_admin" to="/utilisateurs-emprunts">👥 Utilisateurs & Emprunts</router-link>
<router-link v-if="user && user.is_admin" to="/admin">🛡️ Admin </router-link>
<router-link v-if="user && !user.is_admin" to="/emprunts">🔄 Emprunter</router-link>
<router-link v-if="user && !user.is_admin" to="/notifications">🔔 Notifications</router-link>
<router-link v-if="user" :to="`/profil/${userId}`">👤 Mon profil</router-link>
    </nav>

    <!-- Vue dynamique -->
    <router-view />
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  background-color: #1565c0;
  padding: 1rem 2rem;
}

.logo-text {
  font-size: 1.4rem;
  font-weight: bold;
  color: white;
  margin-right: 2rem;
  cursor: pointer;
  transition: color 0.3s;
}

.logo-text:hover {
  color: #e3f2fd;
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
</style>