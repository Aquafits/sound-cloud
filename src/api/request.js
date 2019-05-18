import axios from "axios";

export const qq_service = axios.create({
  baseURL: "api/qq",
  headers: { "Content-Type": "application/json" }
});
