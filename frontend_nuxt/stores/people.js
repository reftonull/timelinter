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
    },
});
