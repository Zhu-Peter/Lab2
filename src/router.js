import Vue from "vue";
import Router from 'vue-router';
import Home from './views/HomeView';
import LogIn from './views/LoginView';
import Menu from './views/MenuView.vue';
import Order from './views/OrderView.vue'
import SignUp from './views/SignupView.vue';
import Profile from './views/ProfileView.vue'
import Restaurants from './views/DiscoverView.vue'

import RestaurantProfile from './views/RestaurantProfile.vue'
import RestaurantLogin from './views/RestaurantLogin.vue'
import RestaurantSignup from './views/RestaurantSignup.vue'
import RestaurantOrders from './views/RestaurantOrders.vue'

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
            path: '/signup',
            name: 'Sign Up',
            component: SignUp
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile
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
        {
            path: '/restaurants',
            name: 'Discover',
            component: Restaurants
        },
        {
            path: '/restaurantprofile',
            name: 'Restaurant Profile',
            component: RestaurantProfile
        },
        {
            path: '/restaurantlogin',
            name: 'Restaurant Log In',
            component: RestaurantLogin
        },
        {
            path: '/createrestaurant',
            name: 'Restaurant Sign up',
            component: RestaurantSignup
        },
        {
            path: '/restaurantorders',
            name: 'Restaurant Orders',
            component: RestaurantOrders
        },
    ]
})

export default router;