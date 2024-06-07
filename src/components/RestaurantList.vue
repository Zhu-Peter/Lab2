<template>
    <div id="RestaurantList">
        <div id="restaurant_grid">
            <div class="restaurant_container" v-for="restaurant in restaurant_list" :key="restaurant.restaurant_id" @click="goToMenu(restaurant.restaurant_id)">
                <div class="restaurant_banner" :style="{ 'background-image': 'url(' + restaurant.profile_url + ')' }">
                    <div>
                        <div class="restaurant_name">{{ restaurant.name }}</div>
                        <div class="restaurant_address">{{ restaurant.address }}, {{ restaurant.city }}</div>

                    </div>

                </div>
                <div class="restaurant_description">
                    <div>{{ restaurant.bio }}</div>
                    <div>{{ restaurant.phone_number }}</div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from 'vue-cookies';
import axios from 'axios';

export default {
    name: 'RestaurantList',
    data() {
        return {
            restaurant_list: [],
        }
    },
    methods: {
        goToMenu: function(id){
            let temp = JSON.stringify({restaurant_id: id})
            Cookies.set('restaurant_menu', temp)
            this.$router.push(`/menu`)
        }
    },
    beforeMount() {
        axios.request({
            url: 'http://209.38.6.175:5000/api/restaurants',
            headers: {
                "x-api-key": "q1LXwh",
            },
        }).then((response) => { this.restaurant_list = response.data }).catch(error => console.log(error))
    },
}
</script>

<style scoped>
#restaurant_grid {
    display: grid;
    grid-template-columns: auto auto auto;
    column-gap: 10px;
    row-gap: 40px;
}

.restaurant_container {
    width: 400px;
    height: 350px;
    background-color: white;

    cursor: pointer;
}

.restaurant_container:hover {
    filter: brightness(85%)
}

.restaurant_banner{
    background-size: cover;
    background-position: center;
    height: 250px;
    display: flex;
    align-items: end;
    padding: 5px;
}

.restaurant_name{
    font-size: 2rem;
    font-weight: bold;
    color: white;
}

.restaurant_address{
    color: rgb(218, 218, 218);
}

.restaurant_description{
    padding: 12px;
}
</style>