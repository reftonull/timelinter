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

        getTimeline(id) {
            console.log(this.timelines);
            return this.timelines.find((t) => t._id === id);
        },

        async addPerson(pid, tid) {
            const options = useOptionsStore();
            await options.setTokenFromStorage();

            const response = await axios.post(
                "/secure/timeline/addperson?secret_token=" + options.token,
                {
                    pid: pid,
                    tid: tid,
                }
            );
            console.log(response.data);

            return true;
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
