import { defineStore } from "pinia";
import axios from "axios";
import { usePeopleStore } from "./people";
import { useTimelineStore } from "./timeline";

export const useOptionsStore = defineStore({
    id: "options",
    state: () => ({
        token: "",
        user: {
            _id: "",
            email: "",
        },
    }),

    actions: {
        logout() {
            const peopleStore = usePeopleStore();
            const timelineStore = useTimelineStore();

            sessionStorage.removeItem("token");
            this.$patch({
                token: "",
                user: { _id: "", email: "" },
            });

            peopleStore.$reset();
            timelineStore.$reset();
        },

        async login(email, password) {
            const response = await axios.post("api/login", {
                email: email,
                password: password,
            });

            if (response.data.error) {
                console.log(response.data.error);
                return { error: response.data.error };
            }

            if (response.status === 200 && response.data.token) {
                sessionStorage.setItem("token", response.data.token);
                this.$patch({
                    token: response.data.token,
                    user: response.data.user,
                });

                return { error: null };
            }
        },

        async setTokenFromStorage() {
            console.log("I am here");
            if (sessionStorage.getItem("token")) {
                const token = sessionStorage.getItem("token");

                const response = await axios.get(
                    "/secure/profile?secret_token=" + token
                );

                this.$patch({
                    token: token,
                    user: response.data.user,
                });
            }
        },
    },
});
