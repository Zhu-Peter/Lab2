<template>
    <div>
        <router-link id="back_button" to="/restaurants"> back to restaurants </router-link>
        <MenuList></MenuList>
    </div>
</template>

<script>
import MenuList from '../components/MenuList.vue'
export default {
    name: 'RestaurantMenu',
    components: {
        MenuList,
    },
    data() {
        return {
            restaurant_id: 0,
        }
    },
}
</script>

<style scoped></style>