<template>
    <div>
        <router-link id="back_button" to="/restaurants"> back to restaurants </router-link>

        <div>displaying menu for {{ restaurant_id }}</div>

        <div id="menu_grid">
            <div class="menu_container" v-for="item in menu" :key="item.id">
                <div class="menu_banner" :style="{ 'background-image': 'url(' + item.image_url + ')' }">
                    <div>
                        <div class="menu_name">{{ item.name }}</div>
                        <div class="menu_address">${{ item.price }}</div>

                    </div>

                </div>
                <div class="menu_description">
                    <div>{{ item.description }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from 'vue-cookies';
import axios from 'axios';
export default {
    name: 'RestaurantMenu',
    data() {
        return {
            restaurant_id: 0,
            menu: []
        }
    },
    beforeMount() {
        let restaurant_info = Cookies.get('restaurant_menu')
        this.restaurant_id = restaurant_info.restaurant_id
        axios.request({
            url: 'http://209.38.6.175:5000/api/menu',
            headers: {
                "x-api-key": "q1LXwh",
            },
            params: restaurant_info,
        }).then((response) => { this.menu = response.data }).catch(error => console.log(error))
    },
}
</script>

<style scoped></style>