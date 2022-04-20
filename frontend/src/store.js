import { reactive } from 'vue';

export const store = reactive({
  url: "localhost:3000",
  token: null,
  uid: null,
  email: null
});