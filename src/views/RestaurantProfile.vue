<template>
    <div>
        <router-link to="/restaurants"> back to restaurants </router-link>
        <div class="profile">
            
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
        if (Object.keys(data).length == 2) {
            axios.request({
                url: 'http://209.38.6.175:5000/api/restaurant',
                headers: {
                    "x-api-key": "q1LXwh"
                },
                params: this.restaurantData
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

<style scoped></style>