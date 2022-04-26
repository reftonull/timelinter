import { defineStore } from "pinia";
import axios from "axios";

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
            sessionStorage.removeItem("token");
            this.$patch({
                token: "",
                user: { _id: "", email: "" },
            });
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
            if (sessionStorage.getItem("token")) {
                const token = sessionStorage.getItem("token");

                const response = await axios.get(
                    "secure/profile?secret_token=" + token
                );

                this.$patch({
                    token: token,
                    user: response.data.user,
                });
            }
        },
    },
});
