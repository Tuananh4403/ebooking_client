<!-- list-pet.vue -->
<template>
    <div class="container">
        <div class="row">
            <div class="col-md-3">
                <div class="side-bar-search">
                    <SidebarSearch @search-clicked="handleSearchClicked" />
                </div>
                <div class="side-bar-detail">
                    <SidebarDetail />
                </div>
            </div>
            <div class="col-md-9">
                <RoomList />
            </div>
        </div>
    </div>
</template>

<script>
import SidebarSearch from "./SidebarSearch.vue";
import SidebarDetail from "./Sort.vue";
import RoomList from "./ListBookRoom.vue";

export default {
    components: {
        SidebarSearch,
        SidebarDetail,
        RoomList,
    },
    data() {
        return {
            showSidebarDetail: false,
        };
    },
    methods: {
        handleSearchClicked() {
            this.showSidebarDetail = true;
        },
    },
};
</script>

<style scoped>
.container {
    margin-top: 20px;
}

.col-md-3 {
    border-right: 1px solid #c2bebe;
}

.side-bar-search,
.side-bar-detail {
    margin-top: 6%;
    margin-right: 12%;
}

.side-bar-detail {
    margin-bottom: 6%;
}
</style>