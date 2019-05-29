import axios from "axios";

export const qq_service = axios.create({
  baseURL: "api/qq",
  headers: { "Content-Type": "application/json" }
});

export const itool_service = axios.create({
  baseURL: "api/itool",
  headers: { "Content-Type": "application/json" }
});
