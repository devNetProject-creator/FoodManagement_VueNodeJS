// Import our custom CSS
import "./assets/styles.scss";

// Import all of Bootstrap's JS
//import * as bootstrap from 'bootstrap'
import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";

createApp(App).use(router).mount("#app");
