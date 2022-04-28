<template>
    <div class="container">
        <h1>Availability for {{ name }}</h1>

        <vue-cal
            class="cal vuecal--blue-theme"
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
            selected-date="2022-08-01"
            @event-drag-create="createEvent"
            @event-drop="updateEvent"
            @event-duration-change="updateEvent"
        />

        <div @click="save" class="fancyBtn saveBtn">Save</div>
    </div>
</template>

<script setup>
import { usePeopleStore } from "../../stores/people";
import VueCal from "vue-cal";
import { v4 as uuid } from "uuid";
import "vue-cal/dist/vuecal.css";
import "vue-cal/dist/drag-and-drop.js";

definePageMeta({
    middleware: "auth",
});

const route = useRoute();
const peopleStore = usePeopleStore();

const personId = route.params.id;

const person = await peopleStore.getPersonById(personId);

const events = person.availability.map((e) => {
    return {
        id: uuid(),
        start: new Date(e.startTime),
        end: new Date(e.endTime),
    };
});

const name = person.name ?? "An error occured";

function createEvent(event) {
    events.push({ ...event, id: uuid() });
}

function updateEvent(obj) {
    const index = events.findIndex((e) => e.id === obj.event.id);
    console.log(index);
    if (index !== -1) {
        events[index] = obj.event;
    }
}

function save() {
    console.log(events);
    peopleStore.updateAvail(personId, events);
    navigateTo("/people");
}
</script>

<style scoped>
.container {
    height: 70%;
}

.cal {
    border: 2px solid var(--color-border);
    border-radius: 10px;
    margin-top: 1em;
}

.saveBtn {
    margin-top: 1em;
    margin-bottom: 1em;
    margin-right: 0;
    float: right;
}
</style>
