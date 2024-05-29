<template>
    <div>
        <router-link to="/"> back to home </router-link>
        <h1 id="title">Restaurant Log In</h1>
        <div id="tabs_container">
            <router-link to="/restaurantlogin">Sign In</router-link>
            <div>Sign Up</div>
        </div>
        <div id="signup_container">
            <form id="signup_form" action="">
                <input v-model="email" type="text" placeholder="Email">
                <input v-model="name" type="text" placeholder="Restaurant Name">
                <input v-model="address" type="text" placeholder="Address">
                <input v-model="city" type="text" placeholder="City">
                <input v-model="phone" type="text" placeholder="Phone Number">
                <input v-model="bio" type="text" placeholder="Description">
                <input v-model="password" type="password" placeholder="Password">
                <input type="password" placeholder="Retype Password">
                <input v-model="image_url" type="text" placeholder="Restaurant Picture (url)">
                <input v-model="banner_url" type="text" placeholder="Restaurant Banner (url)">

            </form>

            <button @click="toSignUp">Sign Up</button><br>
            <p id="error_message">
                {{ error }}
            </p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'vue-cookies';

export default {
    name: 'CreateRestaurant',
    data() {
        return {
            email: '',
            name: '',
            phone: '',
            image_url: '',
            banner_url: '',
            address: '',
            city: '',
            bio: '',
            password: '',
            error: '',
            token: '',
        }
    },
    methods: {
        toSignUp: function () {

            this.error = '';
            axios.request({
                method: 'post',
                url: 'http://209.38.6.175:5000/api/restaurant',
                headers: {
                    "x-api-key": "q1LXwh",
                },
                data: {
                    email: this.email,
                    name: this.name,
                    address: this.address,
                    city: this.city,
                    phone_number: this.phone,
                    bio: this.bio,
                    profile_url: this.image_url,
                    banner_url: this.banner_url,
                    username: this.username,
                    password: this.password
                }

            }).then((request) => {
                // console.log(request.data);
                this.token = JSON.stringify(request.data);
                Cookies.set('RestaurantLogin', this.token)
                this.$router.push(`/restaurants`)

            }).catch((error) => { console.log(error); this.error = error.response.data })
        }
    },

}
</script>

<style scoped>
*{
    box-sizing: border-box;
}

#signup_container {
    border: solid 3px teal;
    background-color: white;
    width: 800px;
    margin-inline: auto;
    padding: 50px 120px 50px 20px;

    
}
#title{
    text-align: center;
}
#signup_form{
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: repeat(auto, 6);
    justify-items: center;
    gap: 12px;
    
    margin-bottom: 30px;
}

#signup_form >input{
    width: 100%;
    grid-column: 1 / span 2;
}

#tabs_container {
    width: 800px;
    margin-top: 200px;
    margin-inline: auto;

    display: flex;
    justify-items: start;

}

#tabs_container > a {
    border-top: solid 3px teal;
    border-left: solid 3px teal;
    background-color: gray;
    text-decoration: none;
    color: black;
    padding: 10px;
}

#tabs_container > div {
    border-top: solid 3px teal;
    border-right: solid 3px teal;
    background-color: white;
    text-decoration: none;
    color: black;
    padding: 10px;
    padding-top: 13px;

    margin-bottom: -3px;
    
}

#login_container div {
    margin: 20px;
}

#login_container button {
    margin-right: 20px;
}

#error_message {
    color: red;
    height: 1em
}
</style>