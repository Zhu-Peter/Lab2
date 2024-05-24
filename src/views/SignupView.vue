<template>
    <div>
        <router-link to="/"> back to home </router-link>
        <div id="tabs_container">
            <router-link to="/login">Sign In</router-link>
            <div>Sign Up</div>
        </div>
        <div id="signup_container">
            <form id="signup_form" action="">
                <input v-model="email" type="text" placeholder="Email">
                <input v-model="username" type="text" placeholder="Username">
                <input v-model="password" type="password" placeholder="Password">
                <input type="password" placeholder="Retype Password">
                <input v-model="first_name" type="text" placeholder="First Name">
                <input v-model="last_name" type="text" placeholder="Last Name">
                <input v-model="image_url" type="text" placeholder="Profile Picture (url)">

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
    name: 'SignupView',
    data() {
        return {
            email: '',
            first_name: '',
            last_name: '',
            image_url: '',
            username: '',
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
                url: 'http://209.38.6.175:5000/api/client',
                headers: {
                    "x-api-key": "q1LXwh",
                },
                data: {
                    email: this.email,
                    first_name: this.first_name,
                    last_name: this.last_name,
                    image_url: this.image_url,
                    username: this.username,
                    password: this.password
                }

            }).then((request) => {
                // console.log(request.data);
                this.token = JSON.stringify(request.data);
                Cookies.set('UserTokens', this.token)
                this.$router.push(`/`)

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

#signup_form >input:nth-child(5) {
    /* width: 40%; */
    grid-column: 1;
}

#signup_form >input:nth-child(6) {
    /* width: 40%; */
    grid-column: 2;
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