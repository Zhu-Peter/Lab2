import Vue from "vue";
import Router from 'vue-router';
import LogIn from './src/views/LoginView';
import Menu from './src/views/MenuView.vue';

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Log In',
            component: LogIn
        },
        {
            path: '/menu',
            name: 'Menu',
            component: Menu
        }
    ]
})

export default router;