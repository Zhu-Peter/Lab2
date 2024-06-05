<template>
    <div>
        <div>
            <div class="restaurant_container" v-for="restaurant in restaurant_list" :key="restaurant.restaurant_id" :style="{'background-image': 'url(' + restaurant.profile_url + ')'}">
                <h1>{{ restaurant.name }}</h1>
                <p>{{ restaurant.bio }}</p>
                <p>{{ restaurant.phone_number }}</p>
                <p>{{ restaurant.address }}, {{ restaurant.city }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

    export default {
        name: 'RestaurantList',
        data() {
            return {
                restaurant_list: [],
            }
        },
        beforeMount() {
            axios.request({
                url: 'http://209.38.6.175:5000/api/restaurants',
                headers: {
                    "x-api-key": "q1LXwh",
                },
            }).then((response) => {this.restaurant_list = response.data}).catch(error => console.log(error))
        },
    }
</script>

<style scoped>
    .restaurant_container{
        width: 400px;
        padding: 10px;
        background-size: cover;
        background-position: center;
    }
</style>