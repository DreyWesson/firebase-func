import axios from "axios";

export const instance = axios.create({
  baseUrl: "https://us-central1-fb-fullstack.cloudfunctions.net/api",
});

export default instance;
