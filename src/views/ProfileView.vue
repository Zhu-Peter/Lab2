<template>
    <div>
        <router-link to="/"> back to home </router-link>
        <div id="profile_container">
            <div class="info_container">
                <img :src="userData.image_url" alt="" style="border-radius: 50%;">
                <div id="form_container">
                    <div>{{ userData.first_name }} {{ userData.last_name }} (<a @click="changeName">change</a>)<br>
                        <span v-if="toggleChangeName" id="form_name">
                            <input v-model="form.first_name" type="text" placeholder="First Name">
                            <input v-model="form.last_name" type="text" placeholder="Last Name">
                            <button>Confirm</button>
                        </span>
                    </div>
                    <div>{{ userData.username }} (<a>change</a>)</div>
                    <div>{{ userData.email }} (<a>change</a>)</div>
                    <br>
                    <div id="password_container"><label>Password:</label> <input type="password"
                            placeholder="Type New Password Here"><br>
                        <label>Password: </label><input type="password" placeholder="Retype New Password Here"><br>
                        <button>Change</button>
                    </div>
                </div>
            </div>
            <button @click="logOut">Log Out</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'vue-cookies';

export default {
    name: 'ProfileView',
    data() {
        return {
            userData: {
                id: 0,
            },
            form: {
                email: '',
                first_name: '',
                last_name: '',
                image_url: '',
                username: '',
                password: '',
            },
            toggleChangeName: false,
        }
    },
    methods: {
        logOut: function () {
            axios.request({
                method: 'delete',
                url: 'http://209.38.6.175:5000/api/client-login',
                headers: {
                    "x-api-key": "q1LXwh",
                    "token": this.userData['token']
                }
            }).then(() => {
                Cookies.remove('LoginData');
                this.$router.push(`/`)
            }).catch(error => { console.log(error) })

        },
        changeName: function(){
            this.toggleChangeName = !this.toggleChangeName;
        }
    },
    beforeMount() {
        let data = { ...this.userData, ...Cookies.get('LoginData') }
        if (Object.keys(data).length == 2) {
            axios.request({
                url: 'http://209.38.6.175:5000/api/client',
                headers: {
                    "x-api-key": "q1LXwh"
                },
                params: this.userData
            }).then(response => {
                console.log(response);
                this.userData = { ...data, ...response.data[0] };
                let tempData = JSON.stringify(this.userData);
                Cookies.set('LoginData', tempData)
            }).catch(error => { console.log(error) })
        }
        this.userData = data;
    },
}
</script>

<style scoped>
* {
    box-sizing: border-box;
}

#profile_container {
    border: solid 3px blue;
    width: 800px;
    margin-inline: auto;
    text-align: center;
    padding: 80px;
}

.info_container {
    display: grid;
    justify-items: center;
}

#form_container {
    display: grid;
    gap: 20px;
}

#form_container>div>a {
    cursor: pointer;
    text-decoration: underline;
}
</style>