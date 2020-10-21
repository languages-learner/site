<template>
    <div>
        <!--<div v-if="false && !currentUser" class="cabinet-stub">
            <div>
                <span>Вы не авторизованы</span>
            </div>
            <nuxt-link :to="localePath('index')"
                >Вы будете перенаправлены на главную страницу</nuxt-link
            >
        </div>-->
        <div class="d-flex">
            <div class="sidebar-container"><cabinet-sidebar /></div>
            <div class="cabinet-body">
                <cabinet-header />
                <nuxt />
            </div>
        </div>

        <!--<nav-menu>
            <div slot="content">
                
            </div>
            <template slot="menu-collapse">
                <n-link
                    tag="div"
                    :to="
                        currentUser
                            ? localePath('cabinet-profile')
                            : localePath('login')
                    "
                >
                    <span>{{
                        currentUser ? currentUser.email : $t('login')
                    }}</span>
                </n-link>
                <n-link
                    tag="div"
                    :to="
                        currentUser
                            ? localePath('cabinet-profile')
                            : localePath('login')
                    "
                >
                    <span>Notifications</span>
                </n-link>
                <n-link
                    tag="div"
                    :to="
                        currentUser
                            ? localePath('cabinet-profile')
                            : localePath('login')
                    "
                >
                    <span>Settings</span>
                </n-link>
                <n-link
                    tag="div"
                    :to="
                        currentUser
                            ? localePath('cabinet-profile')
                            : localePath('login')
                    "
                >
                    <span>Logout</span>
                </n-link>
            </template>
            <template slot="menu">
                <n-link tag="div" :to="localePath('index')" class="menu-item">
                    <span class="vortex-icon" aria-hidden="true"></span>
                </n-link>
                <n-link tag="div" :to="localePath('news')" class="menu-item">
                    <i class="fa fa-rss" aria-hidden="true"></i>
                </n-link>
                <n-link tag="div" :to="localePath('desc')" class="menu-item">
                    <i class="fa fa-book" aria-hidden="true"></i>
                </n-link>
                <n-link tag="div" :to="localePath('about')" class="menu-item">
                    <i class="fa fa-info" aria-hidden="true"></i>
                </n-link>
            </template>
        </nav-menu>-->
    </div>
</template>

<script>
/* Mixins */
import { styleMixin } from '~/vuex-mixins/style'
import { languagesMixin } from '~/vuex-mixins/languages'
/* Components */
import Header from '~/components/cabinet/header'
import Sidebar from '~/components/cabinet/sidebar'

export default {
    mixins: [styleMixin, languagesMixin],
    data() {
        return {}
    },
    components: {
        'cabinet-header': Header,
        'cabinet-sidebar': Sidebar
    },
    mounted() {
        console.log(this.$apiCore, 'this.$apiCore')
        this.$apiCore.GetLanguages().then(data => {
            this._setLanguages(data)
        })
    },
    created() {
        return
        /*this.$apiCore.GetLanguages().then(data => {
            this._setLanguages(data)
        })
        this.$apiCore.GetWordGroups().then(data => {
            this._setWordGroups(data)
        })*/
    },
    watch: {},
    methods: {}
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
