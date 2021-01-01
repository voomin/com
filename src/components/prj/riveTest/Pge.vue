<template>
    <div>
        <div v-show="isLoad">
            <canvas ref="riveCanvas2" />
        </div>
        <div v-if="!isLoad">
            <h1>Rive Context 2D Example</h1>
            <p>
                For more info, check out the
                <a href="https://www.npmjs.com/package/rive-canvas">
                    Rive web canvas package
                </a>
                .
            </p>
        </div>
    </div>
</template>

<script>
import { rive, riv } from 'util/rive';
// const loaderRiv = () => import('./rive/loader.riv');

export default {
    data() {
        return {
            fps: 60,
            interval: null,

            isLoad: false,

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
        const canvas = this.$refs.riveCanvas2;
        let marty = null;

        rive(canvas, {
            riv: riv.marty,
            w: this.windowW,
            h: this.windowH
        }, (rtn) => {
            this.isLoad = true;
            marty = rtn;

            marty.anim('Wave');
            marty.spd(0.3);

            marty.stop();

            setTimeout(() => {
                marty.run();
            }, 300);
        });
    },

    methods: {
    }
};
</script>

<style lang="scss" scoped>
    svg {
        width: 100%;
        height: 100%;

    }

</style>
