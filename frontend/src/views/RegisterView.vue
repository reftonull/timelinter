<template>
    <div class="form">
        <p>Email is: {{ email }} and password is: {{ password }}</p>
        <input type="text" placeholder="Email" v-model="email" />
        <input
            type="password"
            placeholder="Password"
            v-model="password"
        />
        <button @click="register">Register</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

async function register() {
    const response = await fetch("api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });
    console.log(response);
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
