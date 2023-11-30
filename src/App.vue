<template>
    <div class="wrapper">
        <Header></Header>
        <div class="app">
            <RouterView></RouterView>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
    name: 'App',
    components: {
        Header
    },
    data() {
        return {

        }
    },
    methods: {

    },
    mounted() {

    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

[class*="__container"] {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
}
</style>