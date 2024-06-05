<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>
#back_button{
  display: inline-block;
  background-color: darkred;
  padding: 10px;
  color: white;
  font-weight: bold;
  text-decoration: none;
  border-radius: 20px;

  margin-bottom: 10px;
}

body{
  background-color: blanchedalmond;
}
</style>
