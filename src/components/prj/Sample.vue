<template>
    <svg
        :viewBox="`0 0 ${windowW} ${windowH}`"
    >
        <rect />
    </svg>
</template>

<script>
export default {
    data() {
        return {
            fps: 60,
            interval: null,

            windowW: window.innerWidth,
            windowH: window.innerHeight

        };
    },

    computed: {
        // grabRectX() {
        //     return this.grabRect.x + this.gapX;
        // }
    },

    beforeUnmount() {
        // this.intervalStop();
    },

    created() {

    },

    mounted() {
        // this.intervalStart();
    },

    methods: {
        // intervalStop() {
        //     if (this.interval) {
        //         clearInterval(this.interval);
        //     }
        // }
    }
};
</script>

<style lang="scss" scoped>
    svg {
        width: 100%;
        height: 100%;

    }

</style>
