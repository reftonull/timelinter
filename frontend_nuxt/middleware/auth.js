import { useOptionsStore } from "~~/stores/options";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const optionsStore = useOptionsStore();
    await optionsStore.setTokenFromStorage();

    console.log(optionsStore.token);

    if (optionsStore.token === "") {
        return navigateTo("/");
    }
});
