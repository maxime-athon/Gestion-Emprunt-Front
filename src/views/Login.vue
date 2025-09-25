<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

// ✅ Déclaration des variables réactives
const email = ref('')
const motDePasse = ref('')
const message = ref('')

const login = async () => {
  try {
    const res = await axios.post('http://127.0.0.1:5000/api/login', {
      email: email.value,
      mot_de_passe: motDePasse.value
    })

    const user = res.data
    message.value = user.message

    localStorage.setItem('user', JSON.stringify({
      user_id: user.user_id,
      nom: user.nom,
      email: user.email,
      is_admin: user.is_admin
    }))

    setTimeout(() => {
      if (user.is_admin) {
        router.push('/admin')
      } else {
        router.push(`/profil/${user.user_id}`)
      }
    }, 1000)
  } catch (error) {
    if (error.response) {
      message.value = error.response.data.error
    } else {
      message.value = "❌ Erreur de connexion. Réessayez ou inscrivez-vous."
    }
  }
}
</script>

<template>
  <div class="login-container">
    <div class="form-card">
      <h2>🔐 Connexion</h2>
      <p class="subtitle">Accédez à votre espace personnel ou administrateur</p>

      <input v-model="email" placeholder="📧 Email" />
      <input v-model="motDePasse" type="password" placeholder="🔒 Mot de passe" />

      <button @click="login">🚪 Se connecter</button>
      <p class="message">{{ message }}</p>

      <p class="switch">
        Pas encore inscrit ?
        <router-link to="/register">📝 Créez un compte</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to right, #1565c0, #42a5f5);
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
  color: #1565c0;
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
  background-color: #1565c0;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0d47a1;
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
  color: #1565c0;
  font-weight: bold;
  text-decoration: none;
  margin-left: 0.3rem;
}

.switch a:hover {
  text-decoration: underline;
}
</style>