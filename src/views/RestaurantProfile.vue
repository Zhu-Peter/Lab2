<template>
    <div>
        <router-link id="back_button" to="/restaurants"> back to restaurants </router-link>
        <img id="banner_picture" :src="restaurantData.banner_url" alt="">
        <div class="container">
            <div class="profile">
                <img id="profile_picture" :src="restaurantData.profile_url" alt="">
                <h1>{{ restaurantData.name }}</h1>
                <p>{{ restaurantData.bio }}</p>
                <button @click="logOut">Log Out</button>
            </div>
            <div class="menu">
                <h1>Menu</h1>
                <div id="addMenu">
                    <h1>Add: </h1>
                    <div>
                        <div>
                            <input v-model="name" type="text" placeholder="Menu Item Name"><br>
                            <input v-model="description" type="text" placeholder="Menu Item Description"><br>
                            <input v-model="price" type="text" placeholder="Menu Item Price"><br>
                            <input v-model="image_url" type="text" placeholder="Add Image url"><br>
                            <button>Add</button>
                        </div>
                    </div>
                </div>
                <MenuList></MenuList>
            </div>

        </div>
    </div>
</template>

<script>
import Cookies from 'vue-cookies';
import axios from 'axios';
import MenuList from '../components/MenuList.vue'
export default {
    name: 'RestuarantProfile',
    components: {
        MenuList
    },
    data() {
        return {
            restaurantData: {},
            name: '',
            description: '',
            price: '',
            image_url: '',

        }
    },
    methods: {
        logOut: function () {
            axios.request({
                method: 'delete',
                url: 'http://209.38.6.175:5000/api/restaurant-login',
                headers: {
                    "x-api-key": "q1LXwh",
                    "token": this.restaurantData['token']
                }
            }).then(() => {
                Cookies.remove('RestaurantLogin');
                this.$router.push(`/`)
            }).catch(() => {
                Cookies.remove('RestaurantLogin');
                this.$router.push(`/`)
            })

        },
    },
    beforeMount() {
        let data = { ...this.restaurantData, ...Cookies.get('RestaurantLogin') }
        if (Object.keys(data).length == 0) { this.$router.push(`/restaurantlogin`) }
        if (Object.keys(data).length == 2) {
            axios.request({
                url: 'http://209.38.6.175:5000/api/restaurant',
                headers: {
                    "x-api-key": "q1LXwh"
                },
                params: data
            }).then(response => {
                console.log(response);
                this.restaurantData = { ...data, ...response.data[0] };
                let tempData = JSON.stringify(this.restaurantData);
                Cookies.set('RestaurantLogin', tempData)
            }).catch(error => { console.log(error) })
        }
        this.restaurantData = data;
    },
    mounted() {

    },
}
</script>

<style scoped>
* {
    box-sizing: border-box;
}

.container {
    display: flex;
}

.profile {
    margin-left: 40px;
    margin-right: 120px;
    text-align: center;
}

#profile_picture {
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 50%;
}

#banner_picture {
    height: 300px;
    width: 99vw;
    object-fit: cover;
}
</style>