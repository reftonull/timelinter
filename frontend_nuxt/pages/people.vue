<template>
    <div>
        <h1>People</h1>
        <div
            class="listItem"
            v-for="person in peopleStore.people"
            :key="person.name"
        >
            {{ person.name }}
        </div>
        <div v-if="!peopleStore.people">
            <h3>There are no people!</h3>
        </div>
    </div>
</template>

<script setup>
import { usePeopleStore } from "../stores/people";

const peopleStore = usePeopleStore();

onMounted(async () => {
    console.log("people mounted");
    peopleStore.getPeople();
});
</script>

<style scoped>
h1 {
    text-align: center;
}
div {
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
