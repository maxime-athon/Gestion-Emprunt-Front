<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const users = ref([])
const message = ref('Chargement...')
const notifications = ref({})

onMounted(async () => {
  const stored = localStorage.getItem('user')
  if (!stored) {
    router.push('/login')
    return
  }

  const user = JSON.parse(stored)
  const isAdmin = user.is_admin && user.nom === 'admin' && user.email === 'admin'

  if (!isAdmin) {
    router.push('/login')
    return
  }

  try {
    const resUsers = await axios.get('http://127.0.0.1:5000/api/users')
    users.value = resUsers.data

    for (const u of users.value) {
      const resNotif = await axios.get(`http://127.0.0.1:5000/api/notifications?user_id=${u.id}`)
      notifications.value[u.id] = resNotif.data
    }

    message.value = ''
  } catch {
    message.value = '❌ Erreur de chargement'
  }
})
</script>

<template>
  <div class="admin-dashboard">
    <h2>🛡️ Tableau de bord Administrateur</h2>
    <p class="message">{{ message }}</p>

    <div v-if="users.length">
      <div v-for="u in users" :key="u.id" class="user-card">
        <h3>👤 {{ u.nom }} — {{ u.email }}</h3>

        <h4>📚 Emprunts :</h4>
        <ul>
          <li v-for="e in u.emprunts" :key="e.id">
            {{ e.document.titre }} — {{ e.statut }} (Retour : {{ new Date(e.date_retour).toLocaleDateString() }})
          </li>
        </ul>

        <h4>🔔 Notifications :</h4>
        <ul v-if="notifications[u.id]?.length">
          <li v-for="n in notifications[u.id]" :key="n.id">
            <strong>{{ n.type.toUpperCase() }}</strong> — {{ n.message }}
          </li>
        </ul>
        <p v-else class="empty">Aucune notification 📭</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-dashboard {
  padding: 2rem;
  max-width: 1000px;
  margin: auto;
  font-family: 'Segoe UI', sans-serif;
}

.message {
  font-weight: bold;
  color: #d32f2f;
  margin-bottom: 1rem;
  text-align: center;
}

.user-card {
  background: #f9f9f9;
  padding: 1.2rem;
  margin-bottom: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.user-card h3 {
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.user-card h4 {
  margin-top: 1rem;
  color: #34495e;
}

ul {
  padding-left: 1rem;
  margin-top: 0.5rem;
}

li {
  margin-bottom: 0.5rem;
}

.empty {
  font-style: italic;
  color: #7f8c8d;
}
</style>