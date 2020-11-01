<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
export default {
  name: 'About',
  mounted() {
    console.log('app', this.$router)
    console.log('app', this.$route)
  },
}
</script>
