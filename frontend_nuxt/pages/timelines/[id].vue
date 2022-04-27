<template>
    <div class="container">
        <div class="flex">
            <vue-cal
                class="vuecal--blue-theme cal"
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
                selected-date="2022-04-26"
                @event-change="changeEvent"
                :on-event-create="onEventCreate"
            />
            <div class="sidebar">
                <div class="segmented">
                    <div @click="selected = 'People'">People</div>
                    <div @click="selected = 'Problems'">Problems</div>
                </div>
                <div class="sidebarContainer" v-if="selected === 'People'">
                    <div v-for="person in people" :key="person.name">
                        <div
                            class="listItem"
                            :class="{
                                selected:
                                    selectedPerson &&
                                    person.name === selectedPerson.name,
                            }"
                            @click="selectPerson(person)"
                        >
                            {{ person.name }}
                        </div>
                    </div>
                    <div @click="showModal = true" class="fancyBtn">
                        Add Person
                    </div>

                    <Teleport to="body">
                        <!-- use the modal component, pass in the prop -->
                        <people-modal
                            :show="showModal"
                            @close="showModal = false"
                        >
                            <template #header>
                                <h2>Select Person</h2>
                            </template>
                            <template #body>
                                <div
                                    v-for="(
                                        person, index
                                    ) in peopleStore.people"
                                    :key="person._id"
                                >
                                    <div
                                        :class="{
                                            selected:
                                                selectedItem &&
                                                person.name ===
                                                    selectedItem.name,
                                        }"
                                        class="listItem"
                                        @click="selectItem(index)"
                                    >
                                        {{ person.name }}
                                    </div>
                                </div>
                            </template>
                            <template #footer>
                                <div
                                    class="fancyBtn"
                                    @click="addPerson(selectedItem._id)"
                                >
                                    Add
                                </div>
                                <div
                                    class="normalBtn"
                                    @click="showModal = false"
                                >
                                    Cancel
                                </div>
                            </template>
                        </people-modal>
                    </Teleport>
                </div>
            </div>
        </div>
        <div class="btnRow">
            <div @click="save" class="fancyBtn saveBtn">Save</div>
        </div>
    </div>
</template>

<script>
import VueCal from "vue-cal";
import PeopleModal from "../../components/PeopleModal.vue";
import "vue-cal/dist/vuecal.css";
import "vue-cal/dist/drag-and-drop.js";
import { usePeopleStore } from "../../stores/people";
import { useTimelineStore } from "../../stores/timeline";

export default {
    components: {
        VueCal,
        PeopleModal,
    },
    data: () => ({
        events: [],
        selected: "People",
        timeline: {},
        people: [],
        showModal: false,
        peopleStore: {},
        selectedItem: null,
        selectedPerson: null,
    }),
    async mounted() {
        const timelineStore = useTimelineStore();
        const route = useRoute();
        await timelineStore.getTimelines();

        this.peopleStore = usePeopleStore();
        this.peopleStore.getPeople();

        this.timeline = timelineStore.getTimeline(route.params.id);
        await this.refreshPeople();
        console.log("timeline is", this.timeline);
    },
    blocks: [
        {
            start: "2022-04-26 10:35",
            end: "2022-04-26 11:30",
            title: "Doctor appointment",
            content: '<i class="v-icon material-icons">local_hospital</i>',
            class: "health",
        },
    ],
    methods: {
        save() {
            const route = useRoute();
            const peopleStore = usePeopleStore();

            console.log("saved");
        },

        onEventCreate(event, deleteFunction) {
            if (!this.selectedPerson) {
                return false;
            }

            event.title = this.selectedPerson.name;
            event.person = this.selectedPerson.id;
            return event;
        },

        selectPerson(person) {
            this.selectedPerson = person;
        },

        async refreshPeople() {
            const peopleStore = usePeopleStore();

            this.people = await Promise.all(
                this.timeline.people.map((p) => {
                    const person = peopleStore.getPersonById(p);
                    console.log(person);
                    return person;
                })
            );

            console.log("people are", this.people);
        },

        selectItem(index) {
            this.selectedItem = this.peopleStore.people[index];
            console.log(this.selectedItem);
        },

        changeEvent(event, orig) {
            // if (orig) {
            //     const index = this.events.findIndex(
            //         (e) => e._eid === orig._eid
            //     );
            //     this.events[index] = event;
            // } else {
            // this.events.push(event);
            // }
            console.log(event);
            console.log(this.events);
        },

        add() {
            this.events = this.$options.blocks.slice();
        },

        async addPerson(id) {
            const timelineStore = useTimelineStore();
            const route = useRoute();

            await timelineStore.addPerson(id, route.params.id);

            await timelineStore.getTimelines();
            this.timeline = timelineStore.getTimeline(route.params.id);
            await this.refreshPeople();
            this.selectedItem = null;
            this.showModal = false;
        },

        delEvent() {},
    },
};
</script>

<style scoped>
.flex {
    display: flex;
    flex-direction: row;
    height: 70%;
    gap: 1em;
}

.cal {
    flex: 3 1 0;
    height: 82vh;
    border: 2px solid var(--color-border);
    border-radius: 10px;
}

.sidebar {
    flex: 1 1 0;
    border: 2px solid var(--color-border);
    border-radius: 10px;
    padding: 0.5em;
}

.sidebarContainer {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-top: 1em;
}

.saveBtn {
    margin-top: 1em;
    margin-bottom: 1em;
    margin-right: 0;
}

.btnRow {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 1em;
}

.segmented {
    border-radius: 10px;
    background-color: var(--color-background-soft);
    display: flex;
    flex-direction: row;
}

.segmented > div {
    border-radius: 10px;
    margin: 4px;
    background-color: var(--color-background-mute);
    flex: 1 1 0;
    text-align: center;
    cursor: pointer;
}

.fancyBtn {
    margin-top: 0.5em;
    text-align: center;
}

.selected {
    background-color: var(--color-background-light) !important;
}

.listItem {
    font-size: 16px;
    padding: 0.5em;
    text-align: left;
    background-color: var(--color-background-soft);
    margin-bottom: 0.5em;
    border-radius: 8px;
    color: var(--color-text);
    cursor: pointer;
}
</style>
