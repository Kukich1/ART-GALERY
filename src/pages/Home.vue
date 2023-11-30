<template>
    <div>
        <div>
            <div class="search-container">
                <input id="icon" v-model="searchQuery" placeholder="Поиск" />
            </div>
            <div style="background-color: #C4C4C4; width: 100%; height: 10px"></div>
        </div>

        <div>
            <div class="home__container" v-if="!isLoading">
                <div class="photo-grid">
                    <div v-for="photo in this.photos" :key="photo.id" class="photo-item">
                        <router-link :to="{ path: '/about', query: { photoId: photo.id } }" class="img-container"
                            @click="setCurrentPhoto(photo)">
                            <img :src="photo.urls.regular" :alt="photo.alt_description" class="img-fluid" loading="lazy" />
                        </router-link>
                    </div>
                </div>
                <button class="scroll-top-button" @click="scrollToTop">
                    <TopIcon />
                </button>
            </div>
            <div id="main" v-if="isLoading">
                <div class="loader-container">
                    <span class="loader"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import TopIcon from "@/components/icons/TopIcon.vue";

export default {
    name: "Home",
    components: {
        TopIcon,
    },
    data() {
        return {
            searchQuery: "",
            photos: [],
            isLoading: false,
            CLIENT_ID: "rSJhRF4Go1gCOpNrfs3vsBvGjf2GCrU6KT7eZlWXx8U",
            CLIENT_SECRET: "oBh1RC6sXyFryOFy0XnjjYD-kLYSS10RI99tUFfghG0",
            REDIRECT_URI: "http://localhost:8080/",
            TOKEN: "lxFCkwc9betkcOfdjzulOWNPSbaASJbKwRaCchyRbeA",
        };
    },
    beforeRouteUpdate(to, from, next) {
        if (to.path === "/") {
            this.getPhoto();
        }
        next();
    },
    created() {
        this.debouncedSearch = _.debounce(this.searchPhotos, 500);
        this.searchPhotos(this.searchQuery);
    },
    watch: {
        searchQuery(newQuery) {
            this.debouncedSearch(newQuery);
        },
    },
    computed: {
        isCurrentRouteRoot() {
            return this.$route.path === "/";
        },
    },
    methods: {
        setCurrentPhoto(photo) {
            this.$store.commit("setCurrent", photo);
        },
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        },
        getToken() {
            return {
                headers: {
                    Authorization: `Client-ID ${this.TOKEN}`,
                },
            };
        },
        async getPhoto() {
            try {
                this.isLoading = true;
                const response = await axios.get(
                    `https://api.unsplash.com/photos/random?client_id=${this.CLIENT_ID}&count=9`
                );
                this.photos = response.data;
                console.log(response.data);
            } catch (e) {
                console.log(e);
            } finally {
                setTimeout(() => {
                    this.isLoading = false;
                }, 800);
            }
        },
        async searchPhotos(query) {
            try {
                this.isLoading = true;
                const response = await axios.get(
                    `https://api.unsplash.com/search/photos?client_id=${this.CLIENT_ID}&query=${query}&per_page=9`
                );
                this.photos = response.data.results;
            } catch (error) {
                console.error("Ошибка при выполнении поиска", error);
            } finally {
                setTimeout(() => {
                    this.isLoading = false;
                }, 800);
            }
        },
        async authorize() {
            try {
                const redirectUris = encodeURIComponent(
                    "urn:ietf:wg:oauth:2.0:oob,http://localhost:8080/"
                );
                const response = await axios.get(
                    `https://unsplash.com/oauth/authorize?client_id=${this.CLIENT_ID}&redirect_uri=${redirectUris}&response_type=code&scope=public+read_user`
                );
                console.log(response.data);
            } catch (e) {
                console.log(e);
            } finally { }
        },
    },
    async mounted() {
        await this.getPhoto();
        await this.authorize();
    },
};
</script>

<style lang="scss" scoped>
.search-container {
    height: 150px;
    background-image: url("@/IMG/photo.jpg");
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}

input {
    width: 45%;
    padding: 10px 20px;
    font-size: 14px;
    border: 1px solid transparent;
    border-radius: inherit;
    outline: none;

    @media screen and (max-width: 767px) {
        width: 90%;
        padding: 20px;
    }

    @media screen and (min-width: 768px) and (max-width: 1023px) {
        width: 50%;
        padding: 20px;
    }
}

input::placeholder {
    color: black;
    font-family: "Roboto", sans-serif;
    font-weight: 300;
}

#icon {
    background-image: url("@/IMG/search.png");
    background-repeat: no-repeat;
    background-position: 95% center;
    background-size: 20px;
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

#main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 73.5vh;
    background-color: #fff;
}

.loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.loader {
    --loader-size: 50px;
    --loader-border-size: 4px;
    --loader-border-color: black;
    width: var(--loader-size);
    height: var(--loader-size);
    border: var(--loader-border-size) solid var(--loader-border-color);
    border-top-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    background-color: transparent;
    border-radius: 50%;
    position: relative;
    animation: rotateX 1s infinite linear;
}

.loader::before {
    content: "";
    border: var(--loader-border-size) solid var(--loader-border-color);
    border-top-color: transparent;
    border-left-color: transparent;
    border-bottom-color: transparent;
    background-color: transparent;
    border-radius: 50%;
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    animation: rotateX 0.5s infinite linear reverse;
}

@keyframes rotateX {
    from {
        transform: rotateZ(0deg);
    }

    to {
        transform: rotateZ(360deg);
    }
}
</style>