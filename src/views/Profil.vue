<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const user = ref({})
const emprunts = ref([])
const notifications = ref([])
const message = ref('Chargement...')
const isAdmin = ref(false)

onMounted(async () => {
  const stored = localStorage.getItem('user')
  if (!stored) {
    message.value = '❌ Aucun utilisateur connecté.'
    router.push('/login')
    return
  }

  const parsed = JSON.parse(stored)
  const userId = parsed.user_id
  isAdmin.value = parsed.is_admin

  try {
    if (isAdmin.value) {
      message.value = `✅ Bonjour ${parsed.nom}, vous êtes connecté en tant qu’administrateur.`
    } else {
      const res = await axios.get(`http://127.0.0.1:5000/api/profil/${userId}`)
      user.value = res.data
      emprunts.value = res.data.emprunts
      notifications.value = res.data.notifications
      message.value = ''
    }
  } catch {
    message.value = '❌ Impossible de charger le profil'
  }
})

const goToUsers = () => {
  router.push('/utilisateurs-emprunts')
}

const exportPDF = () => {
  alert("📄 Fonction d'export PDF à venir !")
}
</script>

<template>
  <div class="profil-page">
    <h2>👤 Espace Profil</h2>

    <div v-if="isAdmin">
      <p>✅ Bonjour, vous êtes connecté en tant qu’administrateur.</p>
      <p>Vous avez accès à tous les emprunts et utilisateurs via le menu.</p>
      <button @click="goToUsers">👥 Voir les utilisateurs & emprunts</button>
    </div>

    <div v-else>
      <div class="header">
        <h2>👤 Profil de {{ user.nom }}</h2>
        <p class="email">📧 {{ user.email }}</p>
      </div>

      <section class="section">
        <h3>📚 Mes emprunts</h3>
        <button @click="exportPDF">📄 Exporter mes emprunts</button>
        <div v-if="emprunts.length" class="card-list">
          <div v-for="e in emprunts" :key="e.id" class="card">
            <h4>{{ e.document.titre }}</h4>
            <p>Auteur : {{ e.document.auteur }}</p>
            <p>Statut : <strong>{{ e.statut }}</strong></p>
            <p>Retour prévu : {{ new Date(e.date_retour).toLocaleDateString() }}</p>
          </div>
        </div>
        <p v-else class="empty">Aucun emprunt enregistré.</p>
      </section>

      <section class="section">
        <h3>🔔 Mes notifications</h3>
        <div v-if="notifications.length" class="card-list">
          <div v-for="n in notifications" :key="n.id" class="card notif">
            <strong>{{ n.type.toUpperCase() }}</strong>
            <p>{{ n.message }}</p>
          </div>
        </div>
        <p v-else class="empty">Aucune notification 📭</p>
      </section>
    </div>

    <p v-if="message" class="loading">{{ message }}</p>
  </div>
</template>
<style scoped>
.profil-page {
  max-width: 900px;
  margin: auto;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
  color: #2c3e50;
  background: linear-gradient(to right, #fdfdfd, #f0f8ff);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
}

.header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #3498db;
}

.email {
  font-size: 1rem;
  color: #555;
  margin-top: 0.3rem;
}

.admin-badge {
  margin-top: 0.5rem;
  font-weight: bold;
  color: #e67e22;
  background: #fff3e0;
  padding: 0.3rem 0.8rem;
  border-radius: 8px;
  display: inline-block;
}

.section {
  margin-bottom: 2.5rem;
}

h3 {
  margin-bottom: 1rem;
  color: #34495e;
  font-size: 1.4rem;
  border-left: 5px solid #3498db;
  padding-left: 0.5rem;
}

button {
  margin-bottom: 1rem;
  padding: 0.7rem 1.2rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2980b9;
}

.card-list {
  display: grid;
  gap: 1.2rem;
}

.card {
  background: #ffffff;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-3px);
}

.card h4 {
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-size: 1.2rem;
}

.notif {
  border-left: 6px solid #f39c12;
}

.empty {
  font-style: italic;
  color: #7f8c8d;
  text-align: center;
  margin-top: 1rem;
}

.loading {
  text-align: center;
  font-weight: bold;
  color: #c0392b;
  margin-top: 1rem;
}
</style>