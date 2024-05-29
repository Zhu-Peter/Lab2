<template>
    <div>
        <NavBar />
        <div id="header">
            <div v-if="restaurantData.token == ''">
                <router-link to="/restaurantprofile">
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
    </div>
</template>

<script>
import Cookies from 'vue-cookies';
import NavBar from '../components/NavBar';

    export default {
        name: 'DiscoverView',
        components: {
            NavBar,
        },
        data() {
            return {
                restaurantData: {}
            }
        },
        beforeMount() {
            this.restaurantData = Cookies.get('RestaurantLogin');
        },
    }
</script>

<style scoped>
*{
    box-sizing: border-box;
}
a{
    text-decoration: none;
}
.button{
    padding: 15px;
    background-color: darkred;
    color: white;
    font-weight: bold;
    cursor: pointer;
    margin-left: 15px;
}
.button:hover{
    background-color: gray;
}
#header{
    margin-inline: auto;
    background-color: white;
    padding-top: 30px;
    padding-bottom: 30px;
    width: 800px;
    text-align: center;

    margin-top: 50px;
}
</style>