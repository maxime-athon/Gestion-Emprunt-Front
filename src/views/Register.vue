<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

// ✅ Déclaration des variables réactives
const nom = ref('')
const email = ref('')
const motDePasse = ref('')
const message = ref('')

const register = async () => {
  try {
    if (!nom.value || !email.value || !motDePasse.value) {
      message.value = "❌ Veuillez remplir tous les champs."
      return
    }

    if (!validateEmail(email.value)) {
      message.value = "❌ Adresse email invalide."
      return
    }

    if (!validatePassword(motDePasse.value)) {
      message.value = "❌ Mot de passe trop faible. Utilisez au moins 8 caractères, des lettres majuscules et minuscules, des chiffres."
      return
    }

    await axios.post('http://127.0.0.1:5000/api/register', {
      nom: nom.value,
      email: email.value,
      mot_de_passe: motDePasse.value
    })

    message.value = "✅ Inscription réussie ! Bienvenue."
    setTimeout(() => router.push('/login'), 1500)
  } catch (error) {
    if (error.response) {
      message.value = error.response.data.error
    } else {
      message.value = "❌ Erreur d'inscription. Réessayez."
    }
  }
}

const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return regex.test(email)
}

const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
  return regex.test(password)
}
</script>

<template>
  <div class="register-container">
    <div class="form-card">
      <h2>📝 Inscription</h2>
      <p class="subtitle">Créez votre compte professeur pour accéder à vos emprunts</p>

      <input v-model="nom" placeholder="👤 Nom complet" />
      <input v-model="email" placeholder="📧 Email" />
      <input v-model="motDePasse" type="password" placeholder="🔒 Mot de passe" />

      <button @click="register">🚀 S'inscrire</button>
      <p class="message">{{ message }}</p>

      <p class="switch">
        Déjà inscrit ?
        <router-link to="/login">🔐 Connectez-vous</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to right, #1976d2, #42a5f5);
  font-family: 'Segoe UI', sans-serif;
}

.form-card {
  background-color: white;
  padding: 2rem 2.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h2 {
  margin-bottom: 0.5rem;
  color: #1976d2;
}

.subtitle {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 1.5rem;
}

input {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #1976d2;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #1565c0;
}

.message {
  margin-top: 1rem;
  font-weight: bold;
  color: #d32f2f;
}

.switch {
  margin-top: 1.5rem;
  font-size: 0.9rem;
}

.switch a {
  color: #1976d2;
  font-weight: bold;
  text-decoration: none;
  margin-left: 0.3rem;
}

.switch a:hover {
  text-decoration: underline;
}
</style>