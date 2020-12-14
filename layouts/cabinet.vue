<template>
    <div>
        <div class="d-flex">
            <div class="sidebar-container"><CabinetSidebar /></div>
            <div class="cabinet-body">
                <CabinetLoader v-if="state == 'loading'" />
                <div v-else>
                    <CabinetHeader />
                    <nuxt />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* Mixins */
import { styleMixin } from '~/vuex-mixins/style'
import { userMixin } from '~/vuex-mixins/user.js'

export default {
    middleware: 'auth',
    mixins: [styleMixin, userMixin],
    data() {
        return {
            state: 'loading'
        }
    },
    mounted() {
        var i = setInterval(() => {
            if (this.currentUser != undefined) {
                this.getUserModel()
                clearInterval(i)
            }
        }, 5000)
    },
    methods: {
        test() {
            /*this.$repositories['translates']
                .add([
                    { text: 'car', language: 1 },
                    { text: 'автомобиль', language: 0 }
                ])
                .then(data => {
                    console.log(data, 'data')
                })*/
            /*this.$repositories['translates']
                .grid({
                    filters: [],
                    order: { property: '', ascending: true },
                    page: { size: 100, index: 1 }
                })
                .then(data => {
                    console.log(data, 'data')
                })*/
        },
        getUserModel() {
            this.$repositories['users'].getUserData().then(data => {
                console.log(data, 'data')
                if (data == '') {
                    this.addUser()
                } else {
                    this._updateCurrentUserData(data)
                    this.state = 'ready'
                    this.test()
                }
            })
        },
        addUser() {
            this.$repositories['users']
                .add({
                    email: this.currentUser.email
                })
                .then(data => {
                    this.getUserModel()
                })
        }
    }
}
</script>

<style lang="less" scoped>
.sidebar-container {
    width: 25%;
    min-width: 250px;
    max-width: 290px;
}

.cabinet-body {
    width: 75%;
    margin: 40px 60px 0 60px;
}

@media (max-width: @md) {
    .sidebar-container {
        display: none;
    }
}
</style>
