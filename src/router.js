import Vue from "vue";
import Router from 'vue-router';
import Home from './views/HomeView';
import LogIn from './views/LoginView';
import Menu from './views/MenuView.vue';
import Order from './views/OrderView.vue'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/login',
            name: 'Log In',
            component: LogIn
        },
        {
            path: '/menu',
            name: 'Menu',
            component: Menu
        },
        {
            path: '/order',
            name: 'Orders',
            component: Order
        },
    ]
})

export default router;