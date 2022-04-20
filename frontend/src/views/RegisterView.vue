<template>
    <div class="form">
        <input type="text" placeholder="Email" v-model="email" />
        <input type="password" placeholder="Password" v-model="password" />
        <button @click="register">Register</button>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { store } from "../store.js";
import axios from "axios";

const email = ref("");
const password = ref("");

async function register() {
    console.log(store.url);
    const response = await axios.post("/api/register", {
        email: email.value,
        password: password.value,
    });

    console.log(response.data);
}
</script>

<style scoped>
@media (min-width: 1024px) {
    .about {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>
