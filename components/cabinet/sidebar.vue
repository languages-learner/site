<template>
    <b-container fluid class="sidebar px-0">
        <h6 style="padding-top: 40px;">MENU</h6>
        <div class="h-75 d-flex">
            <b-row
                no-gutters
                align-v="start"
                class="my-auto mx-4"
                cols-sm="1"
                cols-md="2"
            >
                <b-col
                    v-for="(navigation, index) in navigations"
                    :key="'navigation' + index"
                    class="nav-item-container"
                >
                    <n-link
                        tag="div"
                        :to="localePath(navigation.path)"
                        class="nav-item"
                        :class="{ active: isActive(navigation) }"
                    >
                        <b-icon :icon="navigation.icon" class="icon" />
                        {{ navigation.title }}
                    </n-link>
                </b-col>
            </b-row>
        </div>
    </b-container>
</template>

<script>
export default {
    props: {},
    components: {},
    data() {
        return {
            navigations: [
                {
                    title: 'Dashboard',
                    icon: 'pie-chart',
                    path: '/cabinet/dashboard'
                },
                { title: 'Test', icon: 'pencil', path: '/cabinet/test' },
                { title: 'Add', icon: 'bag-plus', path: '/cabinet/add' },
                { title: 'Words', icon: 'collection', path: '/cabinet/words' },
                { title: 'Rules', icon: 'book', path: '/cabinet/rules' },
                {
                    title: 'Tasks',
                    icon: 'card-checklist',
                    path: '/cabinet/tasks'
                }
            ]
        }
    },
    methods: {
        isActive(navigation) {
            var el = this.$route.path.split('/')
            var path = el[el.length - 1]
            return navigation.title.toLowerCase() == path
        }
    },
    computed: {
        acticeItemIndex() {
            return 0
            /*return this.items.findIndex(
                item =>
                    this.localePath(item.route) ==
                    this.$nuxt.$nuxt.$route.fullPath
            )*/
        }
    }
}
</script>

<style lang="less" scoped>
.sidebar {
    background: rgba(241, 229, 245, 0.295);
    height: 100vh;
    text-align: center;

    .nav-item-container {
        padding: 5px;
    }

    .nav-item {
        height: 100px;
        width: 100%;
        /*box-shadow: inset 0 2px 0px rgba(#ffffff, 0.64),
            0 2px 5px rgba(#0d2750, 0.16);*/
        border: transparent solid 1px;
        border-radius: 13px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
        font-size: 0.7rem;
        cursor: pointer;
        color: gray;

        .icon {
            width: 20px;
            height: 20px;
        }

        &:hover {
            .active //.active-nav-item;;;;;;;;
        }

        &.active {
            background: rgba(58, 189, 230, 0.705);
            font-weight: bold;
            color: white;
        }
    }
}
.vtx-sidebar {
    width: 100%;
    height: 100%;
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}
</style>
