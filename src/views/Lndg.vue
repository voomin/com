<template>
    <div class="wrap">
        <router-link :to="{ name: 'Jump'}" v-text="'jump'" />
        <router-link :to="{ name: 'Wave'}" v-text="'wave'" />
        <router-link :to="{ name: 'RopeBox'}" v-text="'밧줄 상자'" />
        <router-link :to="{ name: 'Gradation'}" v-text="'Gradation'" />
        <router-link :to="{ name: 'BounceString'}" v-text="'BounceString'" />
        <!-- <router-link :to="{ name: 'Sheep'}" v-text="'양'" /> -->
    </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
    .wrap {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 100vh;
        flex-wrap: wrap;

        a {
            // width: 100px;
            // height: 100px;
            // border: 1px solid #333;
            // background-color: #999;
        }
    }
</style>
