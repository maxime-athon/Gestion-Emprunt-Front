<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const documents = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await axios.get('http://127.0.0.1:5000/api/documents')
    documents.value = res.data
  } catch (err) {
    error.value = 'Erreur lors du chargement des documents.'
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="page">
    <h1>📚 Bibliothèque</h1>
    <p class="subtitle">Explore les ouvrages disponibles</p>

    <div v-if="loading" class="loader">Chargement des ouvrages...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="documents.length === 0" class="empty">Aucun ouvrage disponible 📭</div>

    <div v-else class="grid">
      <div
        v-for="doc in documents"
        :key="doc.id"
        class="card"
        :class="{ unavailable: doc.statut !== 'disponible' }"
      >
        <h3>{{ doc.titre }}</h3>
        <p><strong>Auteur :</strong> {{ doc.auteur }}</p>
        <p><strong>Catégorie :</strong> {{ doc.categorie }}</p>
        <span class="badge" :class="doc.statut">
          {{ doc.statut === 'disponible' ? '✅ Disponible' : '❌ Emprunté' }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 2rem;
  background: #f9f9f9;
}
.subtitle {
  margin-bottom: 1rem;
  color: #666;
}
.loader {
  text-align: center;
  font-style: italic;
  color: #888;
}
.error {
  color: red;
  text-align: center;
  margin-top: 1rem;
}
.empty {
  text-align: center;
  color: #999;
  font-style: italic;
  margin-top: 2rem;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}
.card {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: transform 0.2s;
}
.card:hover {
  transform: scale(1.02);
}
.badge {
  display: inline-block;
  margin-top: 0.5rem;
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
  color: white;
}
.disponible {
  background-color: #4caf50;
}
.emprunte {
  background-color: #f44336;
}
.unavailable {
  opacity: 0.6;
}
</style>