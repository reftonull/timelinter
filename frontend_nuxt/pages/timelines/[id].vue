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
                @event-drop="updateEvent"
                @event-duration-change="updateEvent"
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
import { v4 as uuid } from "uuid";
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
        this.initEvents();
        console.log("timeline is", this.timeline);
    },
    blocks: [],
    backgroundEvents: [],
    methods: {
        async save() {
            const route = useRoute();
            const timelineStore = useTimelineStore();

            await timelineStore.updateBlocks(
                route.params.id,
                this.$options.blocks
            );

            console.log("saved");
        },

        initEvents() {
            this.$options.blocks = this.timeline.blocks.map((e) => {
                const person = this.peopleStore.people.find(
                    (p) => p._id === e.person
                );

                return {
                    id: uuid(),
                    title: person.name,
                    person: person._id,
                    start: new Date(e.startTime),
                    end: new Date(e.endTime),
                };
            });

            this.events = this.$options.blocks;
        },

        onEventCreate(event, deleteFunction) {
            if (!this.selectedPerson) {
                return false;
            }

            event.id = uuid();
            event.title = this.selectedPerson.name;
            event.person = this.selectedPerson._id;

            this.$options.blocks.push(event);

            return event;
        },

        selectPerson(person) {
            this.selectedPerson = person;
            this.$options.backgroundEvents = person.availability.map((a) => {
                return {
                    start: new Date(a.startTime),
                    end: new Date(a.endTime),
                    background: true,
                    class: "lunch",
                    deletable: false,
                    resizable: false,
                };
            });
            this.events = [
                ...this.$options.backgroundEvents,
                ...this.$options.blocks,
            ];
            // this.events = this.$options.blocks;
            console.log(this.events);
            console.log(this.$options.backgroundEvents);
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

        updateEvent(obj) {
            const index = this.$options.blocks.findIndex(
                (e) => e.id === obj.event.id
            );
            console.log(index);
            if (index !== -1) {
                this.$options.blocks[index] = obj.event;
            }
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

<style>
.vuecal__event.lunch {
    background: repeating-linear-gradient(
        45deg,
        transparent,
        transparent 10px,
        var(--color-background-light) 10px,
        var(--color-background-light) 20px
    ); /* IE 10+ */
    color: #999;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1 !important;
}
</style>

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
