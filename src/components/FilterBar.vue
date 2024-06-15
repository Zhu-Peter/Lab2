<template>
    <div>
        <div id="bar">
            <span>Filter: </span>
            <select name="Filter" id="input1" v-model="filter">
                <option value="none">none</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
            </select>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FilterBar",
        data() {
            return {
                filter: 'none'
            }
        },
        updated() {
            this.$emit('filter', this.filter)
        },
        // updated() {
        //     console.log(this.filter)
        // },
    }
</script>

<style scoped>

</style>