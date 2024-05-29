<template>
    <div>
        <router-link to="/"> back to home </router-link>
        <div id="profile_container">
            <div class="info_container">
                <img :src="userData.image_url" alt="" style="border-radius: 50%;cursor: pointer;margin-bottom: 20px"
                    @click="changeName('image')">
                <span v-if="toggleChangeImage" class="form_name">
                    <input v-model="form.image_url" type="text" placeholder="Profile Picture (url)">
                    <button @click="changeInfo">Confirm</button>
                </span>
                <div id="form_container">
                    <div>{{ userData.first_name }} {{ userData.last_name }} (<a
                            @click="changeName('name')">change</a>)<br>
                        <span v-if="toggleChangeName" class="form_name">
                            <input v-model="form.first_name" type="text" placeholder="First Name">
                            <input v-model="form.last_name" type="text" placeholder="Last Name">
                            <button @click="changeInfo">Confirm</button>
                        </span>
                    </div>
                    <div>{{ userData.username }} (<a @click="changeName('username')">change</a>)</div>
                    <span v-if="toggleChangeUserName" class="form_name">
                        <input v-model="form.username" type="text" placeholder="Username">
                        <button @click="changeInfo">Confirm</button>
                    </span>
                    <div>{{ userData.email }} (<a @click="changeName('email')">change</a>)</div>
                    <span v-if="toggleChangeEmail" class="form_name">
                        <input v-model="form.email" type="text" placeholder="Email">
                        <button @click="changeInfo">Confirm</button>
                    </span>
                    <br>
                    <div id="password_container"><label>Password:</label> <input v-model="form.password" type="password"
                            placeholder="Type New Password Here"><br>
                        <label>Password: </label><input v-model="form.password_check" type="password"
                            placeholder="Retype New Password"><br>
                        <button @click="changeInfo">Change</button>
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
                password_check: '',
            },
            toggleChangeName: false,
            toggleChangeUserName: false,
            toggleChangeEmail: false,
            toggleChangeImage: false,
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
        changeName: function (type) {
            if (type == 'name') {
                this.toggleChangeName = !this.toggleChangeName;
            }
            else if (type == 'username') {
                this.toggleChangeUserName = !this.toggleChangeUserName
            }
            else if (type == 'email') {
                this.toggleChangeEmail = !this.toggleChangeEmail
            }
            else if (type == 'image') {
                this.toggleChangeImage = !this.toggleChangeImage
            }
        },
        changeInfo: function () {
            let updateData = {};
            Object.keys(this.form).forEach((key) => {
                if (this.form[key] !== '') {
                    if (key !== 'password_check') {
                        if (key == 'password') {
                            if (this.form.password == this.form.password_check) {
                                updateData[key] = this.form[key];
                            }
                        } else {
                            updateData[key] = this.form[key];
                        }
                    }

                }
            });
            axios.request({
                method: 'patch',
                url: 'http://209.38.6.175:5000/api/client',
                headers: {
                    "x-api-key": "q1LXwh",
                    "token": this.userData['token']
                },
                data: updateData,
            }).then((response) => {
                console.log(response);
                Object.keys(updateData).forEach((key) => {
                    if (updateData[key] !== '') {
                        if (key !== 'password') {
                            this.userData[key] = updateData[key];

                        }

                    }
                });
                Cookies.set('LoginData', this.userData)
            }).catch(error => { console.log(error) })

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