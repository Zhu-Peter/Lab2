<template>
    <div>
        <NavBar />
        <div id="header">
            <router-link to="/restaurantprofile">
                <a class="button">Log In as Restaurant</a>
            </router-link>
            <a class="button">Create a Restaurant</a>
        </div>
    </div>
</template>

<script>
import NavBar from '../components/NavBar';

    export default {
        name: 'DiscoverView',
        components: {
            NavBar,
        }
    }
</script>

<style scoped>
*{
    box-sizing: border-box;
}
a{
    text-decoration: none;
}
.button{
    padding: 15px;
    background-color: darkred;
    color: white;
    font-weight: bold;
    cursor: pointer;
    margin-left: 15px;
}
.button:hover{
    background-color: gray;
}
#header{
    margin-inline: auto;
    background-color: white;
    padding-top: 30px;
    padding-bottom: 30px;
    width: 800px;
    text-align: center;

    margin-top: 50px;
}
</style>