import { defineStore } from "pinia";
import { useOptionsStore } from "./options";
import axios from "axios";

export const usePeopleStore = defineStore({
    id: "people",
    state: () => ({
        people: [],
    }),
    actions: {
        async getPeople() {
            const options = useOptionsStore();
            await options.setTokenFromStorage();

            const response = await axios.get(
                "/secure/people?secret_token=" +
                    options.token +
                    "&id=" +
                    options.user._id
            );

            this.people = response.data.people;
        },
        async getPersonById(id) {
            console.log("getting person");
            const options = useOptionsStore();
            await options.setTokenFromStorage();

            const query = {
                secret_token: options.token,
                id: options.user._id,
                pid: id,
            };

            const queryString = new URLSearchParams(query);

            const response = await axios.get("/secure/person?" + queryString);

            console.log(response);

            if (response.data.person) {
                return response.data.person;
            } else {
                return null;
            }
        },

        async addPerson(name) {
            const options = useOptionsStore();
            await options.setTokenFromStorage();

            const response = await axios.post(
                "/secure/people/add?secret_token=" + options.token,
                {
                    uid: options.user._id,
                    name: name,
                }
            );
            console.log(response.data);

            return true;
        },

        async updateAvail(pid, events) {
            const options = useOptionsStore();
            await options.setTokenFromStorage();

            const avail = events.map((e) => {
                return {
                    startTime: new Date(e.start),
                    endTime: new Date(e.end),
                };
            });

            const queryString = new URLSearchParams({
                secret_token: options.token,
            });

            const response = await axios.post(
                "/secure/person/update?" + queryString,
                {
                    pid: pid,
                    avail: avail,
                }
            );
            console.log(response.data);
        },
    },
});
