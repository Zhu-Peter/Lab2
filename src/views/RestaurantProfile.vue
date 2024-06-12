<template>
    <div>
        <router-link id="back_button" to="/restaurants"> back to restaurants </router-link>
        <img id="banner_picture" :src="restaurantData.banner_url" alt="">
        <div class="container">
            <div class="profile">
                <img id="profile_picture" :src="restaurantData.profile_url" alt="">
                <h1>{{ restaurantData.name }}</h1>
                <h2>{{ restaurantData.bio }}</h2>
                <p>{{ restaurantData.email }}</p>
                <p>{{ restaurantData.address }}, {{ restaurantData.city }}</p>
                <p>{{ restaurantData.phone_number }}</p>
                <button @click="toggleEdit = !toggleEdit">Edit</button>
                <div id="signup_form" action="" v-if="toggleEdit">
                    <input v-model="profile.email" type="text" placeholder="Email">
                    <input v-model="profile.name" type="text" placeholder="Restaurant Name">
                    <input v-model="profile.address" type="text" placeholder="Address">
                    <input v-model="profile.city" type="text" placeholder="City">
                    <input v-model="profile.phone" type="text" placeholder="Phone Number">
                    <input v-model="profile.bio" type="text" placeholder="Description">
                    <input v-model="profile.password" type="password" placeholder="Password">
                    <input type="password" placeholder="Retype Password">
                    <input v-model="profile.image_url" type="text" placeholder="Restaurant Picture (url)">
                    <input v-model="profile.banner_url" type="text" placeholder="Restaurant Banner (url)"><br>
                    <button @click="updateInfo">Update</button><br>
                    <div>{{ error }}</div>

                </div>
                <button @click="logOut">Log Out</button>
            </div>
            <div class="menu">
                <h1>Menu</h1>
                <div id="addMenu">
                    <h1>Add: </h1>
                    <div>
                        <div>
                            <input v-model="name" type="text" placeholder="Menu Item Name"><br>
                            <input v-model="description" type="text" placeholder="Menu Item Description"><br>
                            <input v-model="price" type="text" placeholder="Menu Item Price"><br>
                            <input v-model="image_url" type="text" placeholder="Add Image url"><br>
                            <button @click="addMenuItem">Add</button>
                            <div id="errorbox">{{ error }}</div>
                        </div>
                    </div>
                </div>
                <MenuList :key="componentKey" :edit="true"></MenuList>
            </div>

        </div>
    </div>
</template>

<script>
import Cookies from 'vue-cookies';
import axios from 'axios';
import MenuList from '../components/MenuList.vue'
export default {
    name: 'RestuarantProfile',
    components: {
        MenuList
    },
    data() {
        return {
            restaurantData: {},
            name: '',
            description: '',
            price: '',
            image_url: '',
            error: '',
            componentKey: 0,
            toggleEdit: false,
            profile: {
                email: '',
                name: '',
                phone: '',
                image_url: '',
                banner_url: '',
                address: '',
                city: '',
                bio: '',
                password: '',
            }

        }
    },
    methods: {
        logOut: function () {
            axios.request({
                method: 'delete',
                url: 'http://209.38.6.175:5000/api/restaurant-login',
                headers: {
                    "x-api-key": "q1LXwh",
                    "token": this.restaurantData['token']
                }
            }).then(() => {
                Cookies.remove('RestaurantLogin');
                this.$router.push(`/`)
            }).catch(() => {
                Cookies.remove('RestaurantLogin');
                this.$router.push(`/`)
            })

        },
        addMenuItem: function () {
            this.error = '';
            axios.request({
                method: 'post',
                url: 'http://209.38.6.175:5000/api/menu',
                headers: {
                    "x-api-key": "q1LXwh",
                    "token": this.restaurantData.token,
                },
                data: {
                    description: this.description,
                    image_url: this.image_url,
                    name: this.name,
                    price: this.price
                }

            }).then(() => {
                this.description = '';
                this.price = '';
                this.image_url = '';
                this.name = '';
            }
            ).catch((error) => { console.log(error); this.error = error.response.data })
            this.componentKey += 1;
        },
        updateInfo: function(){
            this.error = '';
            let updateData = {}
            for(let key in this.profile){
                if(this.profile[key] !== ''){
                    updateData[key] = this.profile[key];
                }
            }
            axios.request({
                method: 'patch',
                url: 'http://209.38.6.175:5000/api/restaurant',
                headers: {
                    "x-api-key": "q1LXwh",
                    "token": this.restaurantData.token
                },
                data: updateData,
            }).then(() => Object.assign(this.restaurantData, updateData)).catch(error => { console.log(error); this.error = error.response.data; })
        }
    },
    beforeMount() {
        let data = { ...this.restaurantData, ...Cookies.get('RestaurantLogin') }
        if (Object.keys(data).length == 0) { this.$router.push(`/restaurantlogin`) }
        if (Object.keys(data).length == 2) {
            axios.request({
                url: 'http://209.38.6.175:5000/api/restaurant',
                headers: {
                    "x-api-key": "q1LXwh"
                },
                params: data
            }).then(response => {
                console.log(response);
                this.restaurantData = { ...data, ...response.data[0] };
                let tempData = JSON.stringify(this.restaurantData);
                Cookies.set('RestaurantLogin', tempData)
            }).catch(error => { console.log(error) })
        }
        this.restaurantData = data;
        Cookies.set('restaurant_menu', { restaurant_id: data.restaurant_id })
    },
    mounted() {

    },
}
</script>

<style scoped>
* {
    box-sizing: border-box;
}

.container {
    display: flex;
}

.profile {
    margin-left: 40px;
    margin-right: 120px;
    text-align: center;
}

#profile_picture {
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 50%;
}

#banner_picture {
    height: 300px;
    width: 99vw;
    object-fit: cover;
}

#errorbox {
    color: red;
}
</style>