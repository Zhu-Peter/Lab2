<template>
    <div>
        <router-link to="/"> back to home </router-link>
    </div>
</template>

<script>
import Cookies from 'vue-cookies';
import axios from 'axios';

    export default {
        name: 'RestuarantProfile',
        data() {
            return {
                isLoggedIn: false,
            }
        },
        beforeMount(){
            let profile = Cookies.get('RestaurantLogin')
            if (!(profile == null)){
                axios.request();
                this.isLoggedIn = true
            }else{
                this.isLoggedIn = false
            }
        },
        mounted() {
            if(!this.isLoggedIn){
                this.$router.push(`/restaurantlogin`)
                
            }
        },
    }
</script>

<style scoped>

</style>