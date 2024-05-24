<template>
    <div>
        <router-link to="/"> back to home </router-link>
        <div id="tabs_container">
            <div>Sign In</div>
            <router-link to="/signup">Sign Up</router-link>
        </div>
        <div id="login_container">
            <div>
                <label for="">Email: </label>
                <input v-model="email" type="text">
            </div>
            <div>
                <label for="">Password: </label>
                <input v-model="password" type="password">
            </div>
            <button @click="toLogIn">Log In</button><br>
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
    name: 'LoginView',
    data() {
        return {
            email: '',
            password: '',
            error: '',
            token: '',
        }
    },
    methods: {
        toLogIn: function () {

            this.error = '';
            axios.request({
                method: 'post',
                url: 'http://209.38.6.175:5000/api/client-login',
                headers: {
                    "x-api-key": "q1LXwh",
                },
                data: {
                    email: this.email,
                    password: this.password
                }

            }).then((request) => {
                // console.log(request.data);
                this.token = JSON.stringify(request.data);
                Cookies.set('LoginData', this.token)
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
#tabs_container {
    width: 800px;
    margin-top: 200px;
    margin-inline: auto;

    display: flex;
    justify-items: start;

}

#tabs_container > a {
    border-top: solid 3px orange;
    border-right: solid 3px orange;
    background-color: gray;
    text-decoration: none;
    color: black;
    padding: 10px;
}

#tabs_container > div {
    border-top: solid 3px orange;
    border-left: solid 3px orange;
    background-color: white;
    text-decoration: none;
    color: black;
    padding: 10px;
    padding-top: 13px;

    margin-bottom: -3px;
    
}
#login_container {
    border: solid 3px orange;
    background-color: white;
    width: 800px;
    margin-inline: auto;
    padding: 50px 120px 50px 20px;

    display: grid;
    justify-items: end;

}

#login_container div {
    margin: 20px;
}

#login_container button {
    margin-right: 20px;
}

#login_container p {
    height: 1em;
}

#error_message {
    color: red;
}
</style>