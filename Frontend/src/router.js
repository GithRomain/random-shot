import { createWebHistory, createRouter } from "vue-router";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import HomePage from "@/components/HomePage";

const routes =  [
    {
        path:"/",
        name:"LoginForm",
        component: LoginForm,
    },
    {
        path:"/RegisterForm",
        name:"RegisterForm",
        component: RegisterForm,
    },
    {
        path:"/HomePage",
        name:"HomePage",
        component: HomePage,
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

