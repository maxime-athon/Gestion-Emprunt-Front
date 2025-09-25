<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const notifications = ref([])
const message = ref('Chargement...')
const user = ref(null)

onMounted(async () => {
  const storedUser = localStorage.getItem('user')
  if (!storedUser) {
    message.value = '❌ Aucun utilisateur connecté.'
    return
  }

  user.value = JSON.parse(storedUser)

  try {
    const res = await axios.get(`http://127.0.0.1:5000/api/notifications?user_id=${user.value.user_id}`)
    notifications.value = res.data
    message.value = ''
  } catch {
    message.value = '❌ Erreur lors du chargement des notifications.'
  }
})
</script>

<template>
  <div class="page">
    <h2>🔔 Mes notifications</h2>

    <div v-if="message" class="loader">{{ message }}</div>
    <div v-else-if="notifications.length === 0" class="empty">Aucune notification 📭</div>

    <ul v-else class="notif-list">
      <li v-for="n in notifications" :key="n.id">
        <strong>{{ n.type.toUpperCase() }}</strong> — {{ n.message }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.page {
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  background: linear-gradient(135deg, #fdfdfd, #f0f8ff);
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
}

h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.loader {
  text-align: center;
  font-style: italic;
  color: #888;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
}

.empty {
  text-align: center;
  color: #999;
  font-style: italic;
  font-size: 1.1rem;
  margin-top: 1rem;
}

.notif-list {
  list-style: none;
  padding: 0;
}

.notif-list li {
  background: #ffffff;
  margin-bottom: 0.8rem;
  padding: 1rem;
  border-radius: 10px;
  border-left: 6px solid #3498db;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  transition: transform 0.2s;
}
</style>