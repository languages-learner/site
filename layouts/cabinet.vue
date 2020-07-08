<template>
    <div>
        <nav-menu>
            <div slot="content">
                <div v-if="!currentUser" class="cabinet-stub">
                    <div>
                        <span>Вы не авторизованы</span>
                    </div>
                    <nuxt-link :to="localePath('index')"
                        >Вы будете перенаправлены на главную страницу</nuxt-link
                    >
                </div>
                <div v-else class="lay">
                    <cabinet-header />
                    <div class="sidebar">
                        <cabinet-sidebar
                            :items="[
                                {
                                    icon: 'user',
                                    title: 'Profile',
                                    route: 'cabinet-profile'
                                },
                                {
                                    icon: 'cog',
                                    title: 'Settings',
                                    route: 'cabinet-settings'
                                },
                                {
                                    icon: 'terminal',
                                    title: 'Terminal',
                                    route: 'cabinet-terminal'
                                },
                                {
                                    icon: 'podcast',
                                    title: 'Streaming',
                                    route: 'cabinet-streaming'
                                },
                                {
                                    icon: 'th large',
                                    title: 'Subscripton',
                                    route: 'cabinet-subscriptions',
                                    label: 'entp'
                                },
                                {
                                    icon: 'comments',
                                    title: 'Chat',
                                    route: 'cabinet-chat'
                                }
                            ]"
                        />
                    </div>
                    <main class="p-5">
                        <nuxt />
                    </main>
                </div>
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
        </nav-menu>
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
    created() {
        this.$apiCore.GetLanguages().then(data => {
            this._setLanguages(data)
        })
        this.$apiCore.GetWordGroups().then(data => {
            this._setWordGroups(data)
        })
    },
    watch: {},
    methods: {}
}
</script>

<style lang="less" scoped>
.lay {
    // height: 100vh;
    width: 100%;
    overflow-x: hidden;
    display: flex;
    flex-wrap: wrap;

    header {
        width: 100%;
    }

    .sidebar {
        height: calc(100vh - 90px);
        width: 230px;
    }

    main {
        height: calc(100vh - 90px);
        flex: 1 1 0%;
        overflow-y: auto;
    }
}

.cabinet-stub {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

@media (max-width: 767px) {
    .lay {
        .sidebar {
            display: none;
        }

        main {
            height: calc(100% - 90px);
            flex-grow: 1;
            overflow-y: auto;
        }
    }
}
</style>
