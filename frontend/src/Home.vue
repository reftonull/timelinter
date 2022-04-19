<script setup>
import FancyButton from "@/components/FancyButton.vue";
</script>

<template>
    <header>
        <div class="logo">TimeLinter</div>
        <div class="spacer"></div>
        <div class="buttonRow">
            <RouterLink to="/register"><div class="register">Register</div></RouterLink>
            <RouterLink to="/login"><FancyButton text="Login" /></RouterLink>
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
