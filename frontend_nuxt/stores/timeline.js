import { defineStore } from "pinia";
import { useOptionsStore } from "./options";
import axios from "axios";

export const useTimelineStore = defineStore({
    id: "timeline",
    state: () => ({
        timelines: [],
    }),
    actions: {
        async getTimelines() {
            const options = useOptionsStore();
            await options.setTokenFromStorage();

            const response = await axios.get(
                "/secure/timelines?secret_token=" +
                    options.token +
                    "&id=" +
                    options.user._id
            );

            this.timelines = response.data.timelines;
        },

        async addTimeline(name) {
            const options = useOptionsStore();
            await options.setTokenFromStorage();

            const response = await axios.post(
                "/secure/timelines/add?secret_token=" + options.token,
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
