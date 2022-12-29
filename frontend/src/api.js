// import axios from 'axios';

// const instance = axios.create({
//   baseURL: `http://localhost:4000/`,
// });

// export default instance;

// // instance.get('/hi').then((data) => console.log(data));

import axios from "axios";

const API_ROOT =
  process.env.NODE_ENV === "production"
    ? "/api"
    : "http://localhost:4000/api";

const WS_URL =
  process.env.NODE_ENV === "production"
    ? window.location.origin.replace(/^https*/, "ws")
    : "ws://localhost:4000";

console.log(API_ROOT);

export default axios.create({ baseURL: API_ROOT });


