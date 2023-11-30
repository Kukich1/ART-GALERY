<template>
    <div>
        <div class="photo-info__container">
            <div class="text-container">
                <div class="action">
                    <div class="user-profile">
                        <img id="user_photo" :src="selectedPhoto.user.profile_image.large" alt="user profile" />
                        <div class="social">
                            <h3>{{ selectedPhoto.user.name }}</h3>
                            <p>
                                {{ selectedPhoto.user.paypal_email || selectedPhoto.user.instagram_username ||
                                    selectedPhoto.user.portfolio_url || selectedPhoto.user.twitter_username }}
                            </p>
                        </div>
                    </div>
                    <div class="button-container">
                        <button @click="addToFavorites" class="btn_favorite">
                            <FavoriteIconDark v-if="!isInFavorites"></FavoriteIconDark>
                            <FavoriteIconActive v-else></FavoriteIconActive>
                        </button>
                        <button @click="downloadImage" class="btn_downloand">
                            <DownloandIcon></DownloandIcon><span class="btn_text">Downloand</span>
                        </button>
                    </div>
                </div>
                <div v-if="selectedPhoto" class="photo-info-container">
                    <img :src="selectedPhoto.urls.full" :alt="selectedPhoto.alt_description" class="full-image" />
                    <div class="maximize-icon-container">
                        <a :href="selectedPhoto.urls.regular" target="_blank" rel="noreferrer">
                            <MaximizeIcon class="maximize-icon" @click="openMaximizedView" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="background-image-black-and-white" :style="{ backgroundImage: `url(${selectedPhoto.urls.full})` }"></div>
    </div>
</template>

<script>
import axios from "axios";
import FavoriteIconDark from '@/components/icons/FavoriteIconDark.vue'
import FavoriteIconActive from '@/components/icons/FavoriteIconActive.vue'
import DownloandIcon from '@/components/icons/DownloandIcon.vue'
import MaximizeIcon from '@/components/icons/MaximizeIcon.vue'
export default {
    name: 'PhotoInfo',
    components: {
        FavoriteIconDark,
        FavoriteIconActive,
        DownloandIcon,
        MaximizeIcon,
    },
    data() {
        return {
            photoId: this.$route.query.photoId,
            isInFavorites: false,
            CLIENT_ID: "rSJhRF4Go1gCOpNrfs3vsBvGjf2GCrU6KT7eZlWXx8U",
            CLIENT_SECRET: "oBh1RC6sXyFryOFy0XnjjYD-kLYSS10RI99tUFfghG0",
            REDIRECT_URI: "http://localhost:8080/",
            TOKEN: "lxFCkwc9betkcOfdjzulOWNPSbaASJbKwRaCchyRbeA",
        }
    },
    computed: {
        selectedPhoto() {
            return this.$store.state.current;
        },
    },
    methods: {
        getToken() {
            return {
                headers: {
                    Authorization: `Client-ID ${this.TOKEN}`
                }
            }
        },
        addToFavorites() {
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

            const index = favorites.findIndex(photo => photo.id === this.selectedPhoto.id);

            if (index !== -1) {
                favorites.splice(index, 1);
                console.log('Изображение удалено из избранного.');
            } else {
                favorites.push(this.selectedPhoto);
                console.log('Изображение добавлено в избранное.');
            }

            localStorage.setItem('favorites', JSON.stringify(favorites));

            this.isInFavorites = !this.isInFavorites;
        },
        async downloadImage() {
            try {
                const response = await axios.get(`https://api.unsplash.com/photos/${this.photoId}?client_id=${this.CLIENT_ID}`);
                const photoData = response.data;

                const imageUrl = photoData.urls.full;

                const imageArrayBuffer = await axios.get(imageUrl, { responseType: 'arraybuffer' });
                const imageData = new Uint8Array(imageArrayBuffer.data);

                const blob = new Blob([imageData], { type: 'image/jpeg' });

                const blobUrl = URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = 'downloaded_image.jpg';

                document.body.appendChild(link);

                link.click();

                document.body.removeChild(link);
            } catch (error) {
                console.error("Ошибка при скачивании изображения", error);
            } finally {

            }
        },
    },
    mounted() {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        this.isInFavorites = favorites.some(photo => photo.id === this.selectedPhoto.id);
    }
};
</script>

<style lang="scss" scoped>
.photo-info-container {
    position: relative;
    width: 100%;
    height: 35rem;
    border-radius: 1rem;
    background-size: cover;
    background-position: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);

    @media screen and (max-width: 767px) {
        height: 15rem;
    }
}

.text-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

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

.background-image-black-and-white {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 70%;
    background-size: cover;
    background-position: center;
    filter: grayscale(100%);
    z-index: -1;

    @media screen and (max-width: 767px) {
        display: none;
    }
}

.action {
    width: 100%;
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.social {
    margin-left: 1.25rem;
    color: var(--Gray-6, #F2F2F2);
    font-family: Roboto;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    @media screen and (max-width: 767px) {
        margin-left: 5px;
        color: #000;

        h3 {
            max-width: 150px;
        }

        p {
            color: #BDBDBD;
            max-width: 150px;
        }
    }
}

.user-profile {
    display: flex;
    align-items: center;
}

#user_photo {
    width: 3rem;
    height: 3rem;
    border-radius: 0.5rem;
    border: 1px solid #fff;
    margin-right: 1.25rem;

    @media screen and (max-width: 767px) {
        margin-right: 5px;
    }
}

.btn_favorite {
    width: 3rem;
    height: 3rem;
    border-radius: 10px;
    border: none;
    background-color: #fff;
    color: #000;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    padding: 0.5rem;
}

.btn_downloand {
    width: 12rem;
    height: 3rem;
    margin-left: 1.25rem;
    border-radius: 10px;
    border: none;
    background-color: #FFF200;
    color: #000;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    padding: 0.5rem;

    @media screen and (max-width: 767px) {
        width: 3rem;
        margin-left: 10px;
    }
}

.btn_text {
    margin-left: 1rem;

    @media screen and (max-width: 767px) {
        display: none;
    }
}

.full-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
}

.maximize-icon-container {
    position: absolute;
    bottom: 2rem;
    right: 2rem;

    @media screen and (max-width: 767px) {
        bottom: 0.5rem;
        right: 0.5rem;
    }
}
</style>
