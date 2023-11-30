import {createStore} from 'vuex';

export default createStore({
    state: {
        photos: [],
        favorites: [],
        current: null,
    }, 
    getters: {
        photos: state => state.photos,
        favorites: state => state.favorites,
        current: state => state.current,
    },
    mutations: {
        setPhotos(state, photos) {
            state.photos = photos;
        },
        addFavorite(state, photo) {
            state.favorites.push(photo);
        },
        removeFavorite(state, photo) {
            state.favorites = state.favorites.filter(fav => fav.id !== photo.id);
        },
        setCurrent(state, photo) {
            state.current = photo;
        }
    },
    actions: {
        setPhotos({commit}, photos) {
            commit('setPhotos', photos);
        },
        addFavorite({commit}, photo) {
            commit('addFavorite', photo);
        },
        removeFavorite({commit}, photo) {
            commit('removeFavorite', photo);
        },
        setCurrent({commit}, photo) {
            commit('setCurrent', photo);
        }
    },
    modules: {} 
});