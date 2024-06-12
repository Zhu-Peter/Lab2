<template>
    <div>
        <div id="menu_grid">
            <div class="menu_container" v-for="item in menu" :key="item.id">
                <div class="menu_card" @click="addOrder(item.id)">
                    <div class="menu_banner" :style="{ 'background-image': 'url(' + item.image_url + ')' }">

                    </div>
                    <div class="menu_description">
                        <div>
                            <div class="menu_name">{{ item.name }}</div>
                            <div>{{ item.description }}</div>

                        </div>
                        <div class="menu_price">${{ item.price }}</div>
                    </div>

                </div>
                <button v-if="edit" @click="toggleEdit = !toggleEdit">Edit</button>
                <button v-if="edit" @click="DeleteMenuItem(item.id)">Delete</button>
                <div v-if="toggleEdit">
                    <input v-model="name" type="text" placeholder="Menu Item Name"><br>
                    <input v-model="description" type="text" placeholder="Menu Item Description"><br>
                    <input v-model="price" type="text" placeholder="Menu Item Price"><br>
                    <input v-model="image_url" type="text" placeholder="Add Image url"><br>
                    <button @click="UpdateMenuItem(item.id)">Update</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from 'vue-cookies';
import axios from 'axios';
export default {
    name: 'MenuList',
    props: { edit: Boolean },
    data() {
        return {
            restaurant_id: 0,
            menu: [],
            toggleEdit: false,
            name: '',
            description: '',
            price: '',
            image_url: '',
        }
    },
    methods: {
        DeleteMenuItem: function (id) {
            let login = Cookies.get('RestaurantLogin');
            axios.request({
                method: 'delete',
                url: 'http://209.38.6.175:5000/api/menu',
                headers: {
                    "x-api-key": "q1LXwh",
                    "token": login.token
                },
                data: { menu_id: id }
            }).then().catch(error => console.log(error))

        },
        UpdateMenuItem: function (id) {
            let login = Cookies.get('RestaurantLogin');
            let updateData = {
                ...(this.name && { name: this.name }),
                ...(this.description && { description: this.description }),
                ...(this.price && { price: this.price }),
                ...(this.image_url && { image_url: this.image_url }),
            }

            axios.request({
                method: 'patch',
                url: 'http://209.38.6.175:5000/api/menu',
                headers: {
                    "x-api-key": "q1LXwh",
                    "token": login.token
                },
                data: { ...{ menu_id: id }, ...updateData }
            }).then().catch(error => console.log(error))


        }
    },
    beforeMount() {
        let restaurant_info = Cookies.get('restaurant_menu')
        this.restaurant_id = restaurant_info.restaurant_id
        axios.request({
            url: 'http://209.38.6.175:5000/api/menu',
            headers: {
                "x-api-key": "q1LXwh",
            },
            params: restaurant_info,
        }).then((response) => { this.menu = response.data }).catch(error => console.log(error))
    },
}
</script>

<style scoped>
* {
    box-sizing: border-box;
}

#menu_grid {
    width: 900px;
    display: grid;
    gap: 20px;
    grid-template-columns: auto;

    @media only screen and (min-width: 100px) {
        grid-template-columns: auto auto auto;
    }



    @media only screen and (min-width: 2000px) {
        grid-template-columns: auto auto auto auto;
    }




    margin-top: 80px;

}

.menu_container {
    width: 300px;
}

.menu_card {
    cursor: pointer;

}

.menu_card:hover {
    filter: brightness(85%)
}

.menu_banner {
    width: 300px;
    height: 200px;
    background-size: cover;
    background-position: center;
}

.menu_description {
    width: 300px;
    height: 100px;
    background-color: white;
    padding: 20px;
}

.menu_description>div>div:first-child {
    font-size: 2rem;
}

.menu_price {
    margin-top: -2rem;
    text-align: end;
    font-size: 3rem;
    font-weight: bold;
}
</style>