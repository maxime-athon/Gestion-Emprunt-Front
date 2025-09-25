<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const emailOrNom = ref('')
const documents = ref([])
const selectedDocument = ref(null)
const message = ref('')

// 🔄 Charger les documents disponibles
const loadDocuments = async () => {
  const resDocs = await axios.get('http://127.0.0.1:5000/api/documents')
  documents.value = resDocs.data.filter(d => d.statut === 'disponible')
}

// 📦 Chargement initial
onMounted(async () => {
  await loadDocuments()
})

// 📥 Emprunter
const emprunter = async () => {
  if (!emailOrNom.value || !selectedDocument.value) {
    message.value = '❌ Veuillez remplir votre email/nom et choisir un document.'
    return
  }

  try {
    // 🔍 Rechercher l’utilisateur par email ou nom
    const resUsers = await axios.get('http://127.0.0.1:5000/api/users')
    const user = resUsers.data.find(u =>
      u.email.toLowerCase() === emailOrNom.value.toLowerCase() ||
      u.nom.toLowerCase() === emailOrNom.value.toLowerCase()
    )

    if (!user) {
      message.value = '❌ Utilisateur introuvable.'
      return
    }

    await axios.post('http://127.0.0.1:5000/api/emprunt', {
      user_id: user.id,
      document_id: selectedDocument.value
    })

    message.value = `✅ Emprunt effectué pour ${user.nom} !`
    await loadDocuments()
    emailOrNom.value = ''
    selectedDocument.value = null
  } catch {
    message.value = '❌ Erreur lors de l’emprunt.'
  }
}
</script>

<template>
  <div>
    <h2>🔄 Emprunter un document</h2>
    <p>Remplis les champs ci-dessous</p>

    <label>Votre email ou nom</label>
    <input v-model="emailOrNom" placeholder="ex: votremail@gmail.com ou VotreNom" />

    <label>Choisir un document</label>
    <select v-model="selectedDocument">
      <option disabled value="">-- Choisir un document --</option>
      <option v-for="d in documents" :key="d.id" :value="d.id">{{ d.titre }} — {{ d.auteur }}</option>
    </select>

    <button @click="emprunter">📥 Emprunter</button>
    <p>{{ message }}</p>
  </div>
</template>

<style scoped>
div {
  max-width: 600px;
  margin: auto;
  padding: 2rem;
  background: #fdfdfd;
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.08);
  font-family: 'Segoe UI', sans-serif;
}

h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  text-align: center;
  color: #2c3e50;
}

p {
  text-align: center;
  font-size: 1rem;
  color: #555;
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #34495e;
}

input, select {
  width: 100%;
  padding: 0.7rem;
  margin-bottom: 1.5rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus, select:focus {
  border-color: #3498db;
  outline: none;
}

button {
  display: block;
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 1rem;
}

button:hover {
  background-color: #27ae60;
}

p:last-of-type {
  text-align: center;
  font-weight: bold;
  font-size: 1.1rem;
  color: #2c3e50;
  background: #eafaf1;
  padding: 0.6rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}
</style>