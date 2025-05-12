import FoodItem from "./components/FoodItem.vue";
import SignUp from "./components/SignUp.vue";
import Order from "./components/Order.vue";
import Login from "./components/Login.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "FoodItem",
    component: FoodItem,
    path: "/",
  },
  {
    name: "SignUp",
    component: SignUp,
    path: "/sign-up",
  },
  {
    name: "Order",
    component: Order,
    path: "/order",
  },
  {
    name: "Login",
    component: Login,
    path: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
