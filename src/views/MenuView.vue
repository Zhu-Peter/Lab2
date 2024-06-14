<template>
    <div>
        <router-link id="back_button" to="/restaurants"> back to restaurants </router-link>
        <div id="menu_container">
            <h1>{{ restaurant_info.name }}</h1>
            <MenuList @getorders="getorders"></MenuList>

        <button id="submit_button" @click="submitOrder">Submit order</button>
        <div id="error">{{ error }}</div>
        </div>

    </div>
</template>

<script>
import MenuList from '../components/MenuList.vue'
import Cookies from 'vue-cookies';
import axios from 'axios';
export default {
    name: 'RestaurantMenu',
    components: {
        MenuList,
    },
    data() {
        return {
            restaurant_info: 0,
            orders: [],
            error: '',
        }
    },
    methods: {
        submitOrder: function(){
            let login = Cookies.get('LoginData');
            if(login !== null){
                let menu_orders = Cookies.get('menu_orders')
                axios.request({
                    method: 'post',
                    url: 'http://209.38.6.175:5000/api/client-order',
                    headers: {
                        "x-api-key": "q1LXwh",
                        "token": login.token
                    },
                    data:{
                        restaurant_id: this.restaurant_info.restaurant_id,
                        menu_items: this.orders
                    }
    
                }).then(response => {
                    menu_orders.push(response.data)
                    // console.log(response.data, menu_orders); 
                    Cookies.set('menu_orders', menu_orders);

                    this.$router.push(`/order`)
                })
                .catch(error => {this.error = error.response.data; console.log(error)})

            }else{
                this.error = 'Please login first'
            }
        },
        getorders: function(orders){
            this.orders = orders;
            // console.log(this.orders)
        }
    },
    beforeMount() {
        this.restaurant_info = Cookies.get('restaurant_menu')
    },
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

#menu_container{
    margin-inline: 100px;
    background-color: white;
    padding: 50px 40px;
}

#submit_button {
    margin-top: 20px;
    margin-inline: auto;
    display: block;
    padding: 15px;
    font-weight: bold;
    color: white;
    background-color: orange;

    cursor: pointer;
}
#error{
    color: red;
    display: block;
    margin-inline: auto;
}
</style>