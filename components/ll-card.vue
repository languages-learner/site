<template>
    <b-card :title="title" :subTitle="subTitle" class="ll-card">
        <slot />
    </b-card>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: false,
            default: undefined
        },
        subTitle: {
            type: String,
            required: false,
            default: undefined
        }
    }
}
</script>

<style lang="less">
.ll-card {
    border-radius: 1.1rem;

    h4 {
        font-weight: 500 !important;
    }
}
</style>
