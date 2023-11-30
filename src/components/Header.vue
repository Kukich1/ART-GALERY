<template>
    <div class="header">
        <div class="header__container">
            <div class="header__logo">
                <img src="../IMG/logo.svg" alt="logo" />
            </div>
            <nav class="header__nav">
                <router-link v-if="!isCurrentRouteRoot" to="/" class="menu">
                    <SearchIcon></SearchIcon> <span class="menu-text">Поиск</span>
                </router-link>
                <router-link v-if="isCurrentRouteFavorites" to="/favorites" class="menu">
                    <FavoriteIconActiveHeader></FavoriteIconActiveHeader>
                    <span class="menu-text">Избранное</span>
                </router-link>
                <router-link v-else to="/favorites" class="menu">
                    <FavoriteIcon></FavoriteIcon>
                    <span class="menu-text">Избранное</span>
                </router-link>
            </nav>
        </div>
    </div>
</template>
  
<script>
import SearchIcon from '@/components/icons/SearchIcon.vue'
import FavoriteIcon from '@/components/icons/FavoriteIcon.vue'
import FavoriteIconActiveHeader from '@/components/icons/FavoriteIconActiveHeader.vue'

export default {
    name: 'Header',
    components: {
        SearchIcon,
        FavoriteIcon,
        FavoriteIconActiveHeader,
    },
    computed: {
        isCurrentRouteRoot() {
            return this.$route.path === '/'
        },
        isCurrentRouteFavorites() {
            return this.$route.path === '/favorites'
        },
    },
}
</script>
  
<style lang="scss" scoped>
.header {
    background-color: #000;
    padding: 10px 20px;
}

.header__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header__logo img {
    max-width: 100%;
    height: auto;
}

@media screen and (max-width: 767px) {
    .header__logo img {
        width: 84px;
        height: 32.908px;
    }
}

.header__nav {
    flex: 1 1 auto;
    display: flex;
    justify-content: flex-end;
}

.menu {
    color: #fff;
    text-decoration: none;
    margin-left: 30px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 767px) {
        margin-left: 20px;
    }
}

.menu-text {
    margin-left: 8px;

    @media screen and (max-width: 767px) {
        display: none;
    }
}
</style>
  