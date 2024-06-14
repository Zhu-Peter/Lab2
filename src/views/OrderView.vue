<template>
    <div>
        <NavBar></NavBar>
        <div>
            <div>
                <!-- <div v-for="(order, index) in orders" :key="index">
                    <div>{{ order.order_id }}{{ order.name }} {{ order.price }}</div>
                </div>
                <div>
                    {{ error }}
                </div> -->
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
            console.log(response)
            let old = this.raworders;
            let orders = [];
            let index = 0;

            let order_ids = []
            let menu_ids = []
            let price = 0;
            // let amount = 0;
            let counter = 0;

            for (let i = 0; i < old.length; i++) {
                if (!(order_ids.includes(old[i].order_id))) {
                    order_ids.push(old[i].order_id)
                    menu_ids = []
                    orders[index] = {}
                    orders[index].order_id = old[i].order_id
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
                } else {
                    orders[index - 1].items[counter-1].amount++
                    orders[index - 1].items[counter-1].price = orders[index - 1].items[counter-1].price + old[i].price

                }
            }
            console.log(orders)

        }).catch(error => { console.log(error); })

    },
    mounted() {
        let old = this.raworders;
        let orders = [];
        let index = 0;
        if (this.raworders !== '') {
            //     this.orders[0].order_id = this.raworders[0].order_id
            //     this.orders[0].items = [{id: this.raworders[0].menu_id, name: this.raworders[0].name, amount: 1, price: this.raworders[0].price}]


            //     if(this.raworders[1].order_id !== this.raworders[0].order_id){
            //         index = 1;
            //     }

            //     for (let i = 1; i < this.raworders.length; i++) {
            //         do {
            //             this.orders[index].order_id = this.raworders[i].order_id;

            //         } while (this.raworders[i - 1].order_id == this.raworders[i].order_id)
            //     }
            let order_ids = []
            let menu_ids = []
            let price = 0;
            // let amount = 0;
            let counter = 0;

            for (let i = 0; i < old.length; i++) {
                if (!(order_ids.includes(old[i].order_id))) {
                    order_ids.push(old[i].order_id)

                    orders[index].order_id = old[i].order_id
                    index++
                }

                if (orders[index - 1].items == undefined) { orders[index - 1].items = [] }

                if (!(menu_ids.includes(old[i].menu_id))) {
                    menu_ids.push(old[i].menu_id)
                    counter = orders[index - 1].items.push({
                        name: old[i].name,
                        menu_id: old[i].menu_id,
                        amount: 1,
                        price: old[i].price,
                    })
                } else {
                    orders[index - 1].items[counter].amount++
                    orders[index - 1].items[counter].price = price + old[i].price

                }
            }
            console.log(orders)


        }

    },
}
</script>

<style scoped></style>