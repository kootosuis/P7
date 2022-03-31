import { createRouter, createWebHashHistory } from "vue-router";

// import EnterView from "../views/EnterView.vue";
import UserSignUp from "../views/UserSignUp.vue";
import UserLogin from "../views/UserLogin.vue";
import UserModify from "../views/UserModify.vue";

import UserDeconnect from "../views/UserDeconnect.vue";
import PostedShares from "../views/PostedShares.vue";

const routes = [
    
    {
        path: "/",
        name: "enter",
        // component: EnterView,
        //---ALT---
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../views/EnterView.vue"),
    },
    {
        path: "/signup",
        name: "signup",
        component: UserSignUp,
    },

    {
        path: "/login",
        name: "login",
        component: UserLogin,
    },

    {
        path: "/modify",
        name: "modify",
        component: UserModify,
    },

    {
        path: "/deconnect",
        name: "deconnect",
        component: UserDeconnect,
    },

    {
        path: "/wall",
        name: "wall",
        component: PostedShares,
    }

];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
