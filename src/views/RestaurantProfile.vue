<template>
    <div>
        <router-link id="back_button" to="/restaurants"> back to restaurants </router-link>
        <div class="profile">
            <img id="banner_picture" :src="restaurantData.banner_url" alt="">
            <img id="profile_picture" :src="restaurantData.profile_url" alt="">
            <h1>{{ restaurantData.name }}</h1>
            <p>{{ restaurantData.bio }}</p>
        </div>
    </div>
</template>

<script>
import Cookies from 'vue-cookies';
import axios from 'axios';

export default {
    name: 'RestuarantProfile',
    data() {
        return {
            restaurantData: {},
        }
    },
    beforeMount() {
        let data = { ...this.restaurantData, ...Cookies.get('RestaurantLogin') }
        if(Object.keys(data).length == 0){this.$router.push(`/restaurantlogin`)}
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
#profile_picture{
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 50%;
}
#banner_picture{
    height: 300px;
    width: 100vw;
    object-fit: cover;
}
</style>