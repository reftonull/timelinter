<script setup>
import FancyButton from "@/components/FancyButton.vue";
import { ref } from "vue";
import { store } from "./store";
import { onMounted } from "vue";

onMounted(() => {
    if (sessionStorage.getItem("token")) {
        store.token = sessionStorage.getItem("token");
    }
});

function logout() {
  sessionStorage.removeItem("token");
  store.token = null;
}
</script>

<template>
    <header>
        <div class="logo">TimeLinter</div>
        <div class="spacer"></div>
        <div v-if="!store.token" class="buttonRow">
            <RouterLink to="/register"
                ><div class="register">Register</div></RouterLink
            >
            <RouterLink to="/login"><FancyButton text="Login" /></RouterLink>
        </div>
        <div v-if="store.token" class="buttonRow">
            <button @click="logout">Logout</button>
            <RouterLink to="/timelines"
                ><div class="register">Timelines</div></RouterLink
            >
            <RouterLink to="/people"
                ><div class="register">People</div></RouterLink
            >
            <RouterLink to="/add"><FancyButton text="Add" /></RouterLink>
        </div>
    </header>

    <RouterView />
</template>

<style>
@import "@/assets/base.css";

header {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.logo {
    font-size: 2.5rem;
}

.spacer {
    flex-grow: 1;
}

.buttonRow {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
}
</style>
