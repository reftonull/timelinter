<template>
    <div class="container">
        <h1>Availability for {{ name }}</h1>

        <vue-cal
            class="vuecal--blue-theme"
            :time="true"
            :disable-views="['years', 'year', 'month', 'day']"
            hide-view-selector
            hide-title-bar
            :editable-events="{
                title: false,
                drag: true,
                resize: true,
                delete: true,
                create: true,
            }"
            :events="events"
            :snap-to-time="15"
            :time-from="6 * 60"
            :time-to="23 * 60"
            :time-step="30"
        />
    </div>
</template>

<script setup>
import { usePeopleStore } from "../../stores/people";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import 'vue-cal/dist/drag-and-drop.js'

let events = []

const route = useRoute();
const peopleStore = usePeopleStore();

const personId = route.params.id;

const person = await peopleStore.getPersonById(personId);

const name = person.name ?? "An error occured";
</script>

<style scoped>
.container {
    height: 100%;
}
</style>
