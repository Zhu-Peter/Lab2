<template>
    <div id="nav_bar">
        <nav>
            <div v-for="(page, index) in links" :key="`page-${index}`">
                <router-link  class="nav_button" :to="page.path">{{ page.name }}</router-link>
            </div>
            <div class="nav_button" style="margin-left: auto;">
                <div v-if="!isLoggedIn" id="login_button">
                    <router-link to="/login">Log In</router-link>
                </div>
                <div v-if="isLoggedIn">
                    <router-link to="/profile">
                        <div id="welcome">
                            <span>
                                <img :src="userData.image_url" width="30px" style="border-radius: 50%; margin: 5px" />
                            </span>
                            {{ userData.username }} ({{ userData.first_name }} {{ userData.last_name }})
                        </div>
                    </router-link>
                </div>
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
                {
                    name: 'Discover',
                    path: '/restaurants'
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
        // console.log(data)

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
                }).then((response) => {
                    // console.log({ ...data, ...response.data[0] });
                    this.userData = { ...data, ...response.data[0] };
                    let tempData = JSON.stringify(this.userData);
                    Cookies.set('LoginData', tempData)
                });

            }

        }
    },
}
</script>

<style scoped>
#nav_bar{
    margin-bottom: 60px;
}

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
/* 
#login_button:hover {
    background-color: orange;
} */

#welcome {
    display: flex;
    align-items: center;
}

a {
    text-decoration: none;
    color: black;
}
</style>