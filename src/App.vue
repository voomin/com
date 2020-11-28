<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>

export default {
    name: 'App',
    components: {
        // HelloWorld
    },
    data() {
        return {
            // modalIsOpen: false
        };
    },
    created() {
    }
};
</script>

<style lang="scss">
    *, body {
        margin: 0;
        padding: 0;
    }
</style>
