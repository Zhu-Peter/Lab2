<template>
    <div>
        <div id="login_container">
            <div>
                <label for="">Email: </label>
                <input v-model="email" type="text">
            </div>
            <div>
                <label for="">Password: </label>
                <input v-model="password" type="password">
            </div>
            <button @click="post">Log In</button><br>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
// import Cookies from 'vue-cookies';

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
            axios.request({
                method: 'post',
                url: 'https://innotechfoodie.ml/api/client-login',
                data: {
                    email: this.email,
                    password: this.password
                }

            }).then((request) => {
                console.log(request)
            }).catch((error) => { console.log(error); this.error = error.response.data.error })
        }
    },

}
</script>

<style scoped></style>