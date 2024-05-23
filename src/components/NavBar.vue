<template>
    <div id="nav_bar">
        <nav>
            <div class="nav_button" v-for="(page, index) in links" :key="`page-${index}`">
                <router-link :to="page.path">{{ page.name }}</router-link>
            </div>
            <div v-if="!isLoggedIn" class="nav_button" id="login_button" >
                <router-link to="/login">Log In</router-link>
            </div>
            <div v-if="isLoggedIn">Welcome !!USER!!</div>
        </nav>
    </div>
</template>

<script>
import Cookies from 'vue-cookies';
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
            }
        },
        beforeMount() {
            let token = Cookies.get('token');
            console.log(token)

            //fix null to check
            if(!(token === null)){
                this.isLoggedIn = true;
            }
        },
    }
</script>

<style scoped>

nav{
    display: flex;
    background-color: white;
    margin-inline: 150px;
}

.nav_button{
    display: flex;
    align-items: center;
    height: 50px;
    padding-inline: 10px;
}

#login_button{
    margin-left: auto;
}

.nav_button:hover{
    background-color: lightgray;
    cursor: pointer;
}

#login_button:hover{
    background-color: orange;
}

a{
    text-decoration: none;
    color: black;
}
</style>