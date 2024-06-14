<template>
    <div id="DiscoverView">
        <NavBar id="nav"/>
        <div id="header">
            <div v-if="restaurantData.token == ''">
                <router-link to="/restaurantlogin">
                    <a class="button">Log In as Restaurant</a>
                </router-link>
                <router-link to="/createrestaurant">
                    <a class="button">Create a Restaurant</a>
                </router-link>

            </div>
            <div v-if="restaurantData.token !== ''">
                <router-link to="/restaurantprofile">
                    <a class="button">Restaurant Profile</a>
                </router-link>
            </div>
        </div>
        <div id="list_container">
            <h1>Discover Restaurants for you!</h1>
            <RestaurantList></RestaurantList>
        </div>
    </div>
</template>

<script>
import Cookies from 'vue-cookies';
import NavBar from '../components/NavBar';
import RestaurantList from '../components/RestaurantList.vue'

export default {
    name: 'DiscoverView',
    components: {
        NavBar, RestaurantList
    },
    data() {
        return {
            restaurantData: {
                token: '',
            }
        }
    },
    beforeMount() {
        let data = Cookies.get('RestaurantLogin');
        if (!(data == null)) {
            this.restaurantData = Cookies.get('RestaurantLogin');
        }
    },
}
</script>

<style scoped>
* {
    box-sizing: border-box;
}

#DiscoverView {
    background-image: url('https://images.unsplash.com/photo-1692290131136-75b4143f3603?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    background-position: center;
    padding-top: 40px;
}


a {
    text-decoration: none;
}

.button {
    padding: 15px;
    background-color: darkred;
    color: white;
    font-weight: bold;
    cursor: pointer;
    margin-left: 15px;
}

.button:hover {
    background-color: gray;
}

#header {
    margin-inline: auto;
    
    padding-top: 60px;
    padding-bottom: 60px;
    margin-inline: 150px;

    @media only screen and (min-width: 1100px){
        margin-inline: 300px;

    }
    text-align: center;

    margin-top: 30px;
    margin-bottom: 40px;

    /* opacity: 90%; */
    position: relative;

    z-index: 3;
}

#header::before{
    opacity: 95%;
    background-color: white;
    content: "";
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;

    z-index: -1;
}

#list_container {
    margin-inline: 150px;
    padding-bottom: 100px;

    position: relative;

    z-index: 3;
}

#list_container::before{
    opacity: 85%;
    background-color: rgb(255, 238, 216);
    content: "";
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;

    z-index: -1;
}

#list_container>h1 {
    padding-top: 40px;
    margin-bottom: 20px;
    margin-left: 60px;
}

#RestaurantList {
    margin-inline: auto;
    width: 86%;
}
</style>