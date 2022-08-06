import { createWebHistory, createRouter } from "vue-router";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import HomePage from "@/components/HomePage";
import AddNewOne from "@/components/AddNewOne";
import SetFrequency from "@/components/SetFrequency"
import TiragePage from "@/components/TiragePage";

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
    {
        path:"/AddNewOne",
        name:"AddNewOne",
        component: AddNewOne,
    },
    {
        path:"/SetFrequency",
        name:"SetFrequency",
        component: SetFrequency,
    },
    {
        path:"/TiragePage",
        name:"TiragePage",
        component: TiragePage,
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

