import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import PhotoInfo from '@/pages/PhotoInfo.vue'
import Favorites from '@/pages/Favorites.vue'
// import MaximizeIcon from '@/views/MaximizeIcon.vue';

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/about', component: PhotoInfo },
        { path: '/favorites', component: Favorites },
        // { path: '/maximized/:photoId', component: MaximizeIcon },
    ]
})