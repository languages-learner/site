<template>
    <CabinetContentTemplate :subTitle="'Bonjour ' + currentUserFirstName">
        123123
    </CabinetContentTemplate>
</template>

<script>
/* Mixins */
import { userMixin } from '~/vuex-mixins/user.js'
export default {
    layout: 'cabinet',
    mixins: [userMixin],
    mounted() {}
}
</script>

<style lang="less" scoped></style>
