<template>
<div>
    <p>子组件</p>
        <button @click='getName'>getname</button>
</div>
</template>

<script>
export default {
    name: 'One',
    methods: {
        getName(){
            console.log(this.$store.state.name)
        }
    }
}
</script>

<style scoped>

</style>
