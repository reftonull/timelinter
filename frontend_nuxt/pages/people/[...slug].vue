<template>
    <div>
        <h1>People</h1>
        <div v-for="person in peopleStore.people" :key="person.name">
            <NuxtLink :to="`/people/${person._id}`">
                <div class="listItem">
                    {{ person.name }}
                </div>
            </NuxtLink>
        </div>
        <div v-if="peopleStore.people.length === 0">
            <h3>There are no people!</h3>
        </div>
    </div>
</template>

<script setup>
import { usePeopleStore } from "../../stores/people";

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
    margin: 1em 0;
    border-radius: 8px;
    color: var(--color-text);
}
</style>
