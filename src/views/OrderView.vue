<template>
    <div>
        <NavBar></NavBar>
        <div>
            <div id="order_container">
                <div class="order" v-for="(order) in orders" :key="order.order_id">
                    <div>
                        <h2>Order #{{ order.order_id }}</h2>
                        <h3>Items: </h3>
                        <div class="order_items" v-for="item in order.items" :key="item.name">
                                <div>
                                    {{ item.name }}: x{{ item.amount }}

                                </div>

                                <div>
                                    ...${{ item.price }}

                                </div>

                        </div>
                        <br>
                        <h2>Total: ${{ order.total_price }}</h2>
                    </div>
                </div>
                <div>
                    {{ error }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '../components/NavBar';
import Cookies from 'vue-cookies';
import axios from 'axios';
export default {
    name: 'OrderView',
    components: {
        NavBar,
    },
    data() {
        return {
            userdata: '',
            raworders: '',
            orders: [],
            error: '',
        }
    },
    methods: {

    },
    beforeMount() {
        this.userdata = Cookies.get('LoginData');
        axios.request({
            url: 'http://209.38.6.175:5000/api/client-order',
            headers: {
                "x-api-key": "q1LXwh",
                "token": this.userdata.token
            },
        }).then(response => {
            this.raworders = response.data;
            // console.log(response)
            let old = this.raworders;
            let orders = [];
            let index = 0;

            let order_ids = []
            let menu_ids = []
            // let tot_price = 0;
            // let amount = 0;
            let counter = 0;

            for (let i = 0; i < old.length; i++) {
                if (!(order_ids.includes(old[i].order_id))) {
                    order_ids.push(old[i].order_id)
                    menu_ids = []
                    orders[index] = {}
                    orders[index].order_id = old[i].order_id
                    orders[index].total_price = 0
                    index++
                }

                if (orders[index - 1].items == undefined) { orders[index - 1].items = [] }

                if (!(menu_ids.includes(old[i].menu_item_id))) {
                    menu_ids.push(old[i].menu_item_id)
                    counter = orders[index - 1].items.push({
                        name: old[i].name,
                        menu_id: old[i].menu_item_id,
                        amount: 1,
                        price: old[i].price,
                    })

                    orders[index - 1].total_price += old[i].price
                } else {
                    orders[index - 1].items[counter - 1].amount++
                    orders[index - 1].items[counter - 1].price = orders[index - 1].items[counter - 1].price + old[i].price
                    orders[index - 1].total_price += old[i].price
                }
            }
            console.log(orders)
            this.orders = orders;

        }).catch(error => { console.log(error); })

    },
    mounted() {



    },
}
</script>

<style scoped>
#order_container {
    background-color: white;
    margin-inline: 150px;

    padding-top: 50px;
    padding-left: 20px;

    display: grid;
    gap: 60px;
    justify-items: center;
    /* grid-template-columns: auto auto auto; */
}

.order {
    border: 1px black solid;
    width: 400px;
    padding: 30px;
}

.order_items{
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 5px;
}

.order_items > div:last-child{
    justify-self: end;
}
</style>