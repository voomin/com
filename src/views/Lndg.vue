<template>
    <div class="wrap">
        <router-link :to="{ name: 'Jump'}" v-text="'jump'" />
        <router-link :to="{ name: 'Wave'}" v-text="'wave'" />
        <router-link :to="{ name: 'RopeBox'}" v-text="'밧줄 상자'" />
        <router-link :to="{ name: 'Gradation'}" v-text="'Gradation'" />
        <router-link :to="{ name: 'BounceString'}" v-text="'BounceString'" />
        <router-link :to="{ name: 'RiveTest'}" v-text="'RiveTest'" />
        <!-- <router-link :to="{ name: 'Sheep'}" v-text="'양'" /> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            stageW: 0,
            stageH: 0
        };
    },

    beforeUnmount() {
    },

    created() {
    },

    mounted() {

    },

    methods: {
        resize() {

        },

        animate() {

        }
    }
};
</script>

<style lang="scss" scoped>
    .wrap {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 100vh;
        flex-wrap: wrap;
        background-color: #2b2b2b;

        a {
            width: 100px;
            height: 100px;
            border-radius: 12%;
            background-color: #D7D9DB;
            box-shadow: 3px 3px 5px #333;
        }
    }
</style>
