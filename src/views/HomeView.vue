<template>
    <div>
        <div id="discover">
            <NavBar/>
            <div id="discover_box">
                <h1>
                    Discover Restaurants
                </h1>
                <router-link to="/restaurants">See Restaurants</router-link>
            </div>
        </div>
        <div id="order">
            <div id="order_box">
                <h2>See hundreds of restaurants</h2>
                <p>Order food from thousands of menu items</p><br>
                <router-link to="/order">Order Here</router-link>
            </div>
            <img src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg" alt="">
        </div>
    </div>
</template>

<script>
import NavBar from '../components/NavBar';
    export default {
        name: 'HomeView',
        components: {
            NavBar,
        }
    }
</script>

<style scoped>
* {
  box-sizing: border-box;
}
#discover{
    background-image: url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg');
    padding-bottom: 200px;
}
#discover_box {
    background-color: orangered;
    text-align: center;
    width: 50%;
    padding: 60px;
    margin-inline: auto;

    color: white;
    box-shadow: 10px 10px darkred;
}

#discover_box > h1 {
    margin-bottom: 50px;
}

#discover_box > a{
    background-color: darkred;
    padding: 15px;
    color: white;
    text-decoration: none;
}

#order{
    display: flex;
    justify-items: end;
}

#order_box{
    background-color: white;
    width: 100%;
    padding-left: 15%;
    padding-top: 90px;
}

#order_box > a{
    background-color: rgb(49, 49, 133);
    padding: 15px;
    color: white;
    text-decoration: none;
}

#order > img{
    width: 160vw;
    height: 400px;
    object-fit: cover;
}
</style>