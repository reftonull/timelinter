<template>
    <h1>People</h1>
    <div v-for="person in people.values()" :key="person.name" class="listItem">
        {{ person.name }}
    </div>
    <div v-if="!people.values()"><h3>There are no people!</h3></div>
</template>

<script setup>
import { onMounted, shallowRef } from "@vue/runtime-core";
import axios from "axios";
import { store } from "../store";

let people = shallowRef([]);
onMounted(async () => {
    const response = await axios.get("/secure/people?secret_token=" + store.token +"&id=" + store.uid);
    people.value = response.data.people;
    console.log("api response is: " + people.value);
});
</script>

<style>
h1, h3 {
    text-align: center;
}

.listItem {
  font-size: 16px;
  padding: 1em;
  text-align: left;
  background-color: var(--color-background-mute);
  margin: 1em;
  border-radius: 8px;
}
</style>
