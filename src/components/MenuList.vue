<template>
    <div>
        <div id="menu_grid">
            <div class="menu_container" v-for="item in menu" :key="item.id">
                <div class="menu_banner" :style="{ 'background-image': 'url(' + item.image_url + ')' }">
                    
                </div>
                <div class="menu_description">
                    <div>
                        <div class="menu_name">{{ item.name }}</div>
                        <div>{{ item.description }}</div>
                        
                    </div>
                    <div class="menu_price">${{ item.price }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from 'vue-cookies';
import axios from 'axios';
    export default {
        name: 'MenuList',
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

<style scoped>
* {
  box-sizing: border-box;
}
#menu_grid{
    
        display: grid;
        gap: 20px;
        grid-template-columns: auto auto auto;


}

.menu_container{
    cursor: pointer;
    width: 300px;
}

.menu_container:hover{
    filter: brightness(85%)
}

.menu_banner{
    width: 300px;
    height: 200px;
    background-size: cover;
    background-position: center;
}
.menu_description{
    width: 300px;
    height: 100px;
    background-color: white;
    padding: 20px;
}

.menu_description > div > div:first-child{
    font-size: 2rem;
}

.menu_price{
    margin-top: -2rem;
    text-align: end;
    font-size: 3rem;
    font-weight: bold;
}
</style>