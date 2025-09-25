<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import html2pdf from 'html2pdf.js'

const users = ref([])
const loading = ref(true)
const filter = ref('tous')

const exportToPDF = () => {
  const element = document.querySelector('.page')
  const opt = {
    margin: 0.5,
    filename: 'emprunts_utilisateurs.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  }
  html2pdf().set(opt).from(element).save()
}

onMounted(async () => {
  try {
    const res = await axios.get('http://127.0.0.1:5000/api/users')
    users.value = res.data
  } catch (err) {
    console.error('Erreur chargement utilisateurs :', err)
  } finally {
    loading.value = false
  }
})

const filteredEmprunts = (emprunts) => {
  if (!Array.isArray(emprunts)) return []
  if (filter.value === 'tous') return emprunts
  return emprunts.filter(e => e.statut === filter.value)
}
</script>

<template>
  <div class="page">
    <h2>👥 Utilisateurs & leurs emprunts</h2>

    <div class="filter">
      <label>Filtrer les emprunts :</label>
      <select v-model="filter">
        <option value="tous">Tous</option>
        <option value="en cours">En cours</option>
        <option value="retard">Retard</option>
        <option value="renouvele">Renouvelé</option>
      </select>
    </div>

    <button @click="exportToPDF" class="export-btn">📄 Exporter en PDF</button>
    <div v-if="loading" class="loader">Chargement...</div>

    <div v-else>
      <div v-for="user in users" :key="user.id" class="user-card">
        <h3>{{ user.nom }}</h3>
        <p class="email">{{ user.email }}</p>

        <div v-if="filteredEmprunts(user.emprunts).length === 0" class="empty">Aucun emprunt 📭</div>
        <ul v-else class="emprunt-list">
          <li v-for="e in filteredEmprunts(user.emprunts)" :key="e.id">
            📚 <strong>{{ e.document.titre }}</strong> — retour le <em>{{ new Date(e.date_retour).toLocaleDateString() }}</em>
            <span class="badge" :class="e.statut">{{ e.statut }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  max-width: 900px;
  margin: auto;
  padding: 2rem;
  background: #fdfdfd;
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.1);
  font-family: 'Segoe UI', sans-serif;
}
h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #2c3e50;
}
.filter {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}
.filter label {
  font-weight: bold;
  color: #34495e;
}
.filter select {
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
}
.loader {
  text-align: center;
  font-style: italic;
  color: #888;
}
.user-card {
  background: #ffffff;
  margin-bottom: 2rem;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.user-card h3 {
  margin-bottom: 0.3rem;
  color: #34495e;
}
.email {
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 1rem;
}
.empty {
  font-style: italic;
  color: #999;
}
.emprunt-list {
  list-style: none;
  padding: 0;
}
.emprunt-list li {
  background: #f0f8ff;
  margin-bottom: 0.5rem;
  padding: 0.8rem;
  border-radius: 8px;
  border-left: 4px solid #3498db;
  position: relative;
}
.badge {
  position: absolute;
  top: 8px;
  right: 12px;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  font-size: 0.8rem;
  color: white;
  text-transform: uppercase;
}
.cours {
  background-color: #3498db;
}
.retard {
  background-color: #e74c3c;
}
.renouvele {
  background-color: #2ecc71;
}

.export-btn {
  display: block;
  margin: 0 auto 2rem;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.export-btn:hover {
  background-color: #27ae60;
}
</style>