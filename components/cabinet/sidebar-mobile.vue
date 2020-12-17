<template>
    <div>
        <!--<div v-b-toggle.sidebar-1 class="toggle-button">
            <b-icon icon="menu-button-wide" aria-hidden="true"></b-icon>
        </div>-->
        <b-sidebar id="sidebar-1" title="Menu" body-class="sidebar" shadow>
            <CabinetSidebarContent style="height: auto;">
            </CabinetSidebarContent>
        </b-sidebar>
    </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.toggle-button {
    position: absolute;
    top: 51px;
    left: 15px;
    font-size: 22px;
}

.sidebar {
    background: none !important;
}
</style>
