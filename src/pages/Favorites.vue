<template>
    <div>
        <div style="background-color: #C4C4C4; width:100%; height: 10px"></div>
        <div class="favorite__container" style="display: flex; flex-direction: column;">
            <div class="favorites-title">
                Избранное
            </div>
            <div class="photo-grid">
                <div v-for="photo in photos" :key="photo.id" class="photo-item">
                    <div class="img-container">
                        <router-link :to="{ path: '/about', query: { photoId: photo.id } }" class="img-container"
                            @click="setCurrentPhoto(photo)">
                            <img :src="photo.urls.regular" :alt="photo.alt_description" class="img-fluid" loading="lazy" />
                        </router-link>
                    </div>
                </div>
            </div>
            <button class="scroll-top-button" @click="scrollToTop">
                <TopIcon />
            </button>
        </div>
    </div>
</template>

<script>
import TopIcon from '@/components/icons/TopIcon.vue'
export default {
    name: 'Favorites',
    components: {
        TopIcon,
    },
    data() {
        return {
            photos: []
        };
    },
    methods: {
        setCurrentPhoto(photo) {
            this.$store.commit("setCurrent", photo);
        },
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        },
    },
    mounted() {
        this.photos = JSON.parse(localStorage.getItem('favorites')) || [];
    }
}
</script>

<style lang="scss" scoped>
.favorites-title {
    color: #000;
    text-align: center;
    font-family: Roboto;
    font-size: 72px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-top: 50px;
    margin-bottom: 50px;
}

.photo-grid {
    margin-top: 50px;
    margin-bottom: 50px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 22px;

    @media screen and (max-width: 767px) {
        grid-template-columns: repeat(1, 1fr);
        padding: 20px;
    }

    @media screen and (min-width: 768px) and (max-width: 1023px) {
        grid-template-columns: repeat(2, 1fr);
        padding: 20px;
    }

    @media screen and (min-width: 1024px) and (max-width: 1279px) {
        grid-template-columns: repeat(3, 1fr);
    }


}

.photo-item {
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.img-container {
    width: 100%;
    max-height: 18rem;
    border-radius: 8px;
    overflow: hidden;
    object-fit: cover;
}

.img-fluid {
    width: 100%;
    height: 18rem;
    object-fit: cover;
}

.scroll-top-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 3.25rem;
    height: 3.25rem;
    background-color: #fff;
    border: none;
    border-radius: 50%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s;

    &:hover {
        background-color: #f0f0f0;
    }

    &:focus {
        outline: none;
    }
}
</style>