<template>
    <div class="form">
        <input type="text" placeholder="Email" v-model="email" />
        <input type="password" placeholder="Password" v-model="password" />
        <button @click="login">Login</button>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { store } from "../store.js";
import axios from "axios";

const email = ref("");
const password = ref("");

async function login() {
    console.log(store.url);
    const response = await axios.post("api/login", {
        email: email.value,
        password: password.value,
    });
    
    if (response.data.error) {
      console.log(response.data.error);
    }

    if (response.status === 200 && response.data.token) {
      sessionStorage.setItem("token", response.data.token);
      store.token = response.data.token;
      console.log(store.token);
    }

    console.log(response.data);
}
</script>


<style>
@media (min-width: 1024px) {
    .about {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>
