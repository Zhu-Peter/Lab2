<template>
    <div id="nav_bar">
        <nav>
            <div class="nav_button" v-for="(page, index) in links" :key="`page-${index}`">
                <router-link :to="page.path">{{ page.name }}</router-link>
            </div>
            <div class="nav_button" style="margin-left: auto;">
                <router-link to="/login">
                    <div v-if="!isLoggedIn" id="login_button">
                        Log In
                    </div>
                    <div id="welcome" v-if="isLoggedIn"><span><img :src="userData.image_url" width="30px"
                                style="border-radius: 50%; margin: 5px" alt=""></span> {{ userData.username }} ({{
                                    userData.first_name }} {{ userData.last_name }})</div>
                </router-link>
            </div>
        </nav>
    </div>
</template>

<script>
import Cookies from 'vue-cookies';
import axios from 'axios';
export default {
    name: 'NavBar',
    data() {
        return {
            links: [
                {
                    name: 'Home',
                    path: '/'
                },
                {
                    name: 'Menu',
                    path: '/menu'
                },
                {
                    name: 'Order',
                    path: '/order'
                },
            ],
            isLoggedIn: false,
            userData: {
                username: ''
            },
        }
    },
    beforeMount() {
        let data = Cookies.get('LoginData');
        // console.log(token)

        //fix null to check
        if (!(data === null)) {
            this.isLoggedIn = true;
            if (Object.keys(data).length > 2) {
                this.userData = data
            } else {
                axios.request({
                    url: 'http://209.38.6.175:5000/api/client',
                    headers: {
                        "x-api-key": "q1LXwh"
                    },
                    params: data
                }).then((response) => { console.log(response.data[0]); this.userData = {...this.userData, ...response.data[0]}; Cookies.set('LoginData', JSON.stringify(this.userData)) });

            }

        }
    },
}
</script>

<style scoped>
nav {
    display: flex;
    background-color: white;
    margin-inline: 150px;
}

.nav_button {
    display: flex;
    align-items: center;
    height: 50px;
    padding-inline: 10px;
}

.nav_button:hover {
    background-color: lightgray;
    cursor: pointer;
}

#login_button:hover {
    background-color: orange;
}

#welcome {
    display: flex;
    align-items: center;
}

a {
    text-decoration: none;
    color: black;
}
</style>