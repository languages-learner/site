<template>
    <div></div>
</template>
<script>
export default {
    mounted() {
        this.$nuxt.$router.push(this.localePath('cabinet'))
    }
}
</script>
