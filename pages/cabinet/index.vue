<template>
    <div></div>
</template>

<script>
export default {
    layout: 'cabinet',
    mounted() {
        this.$nuxt.$router.push('cabinet/dashboard')
    }
}
</script>
