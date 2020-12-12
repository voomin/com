<template>
    <div>
        <canvas id="canvas" ref="canvas" />
    </div>
</template>

<script>
import WaveGroup from './WaveGroup';

export default {
    data() {
        return {
            ctx: null,
            stageW: 0,
            stageH: 0
        };
    },

    beforeUnmount() {
        window.removeEventListener('resize', this.resize);
    },

    created() {
        window.addEventListener('resize', this.resize);
    },

    mounted() {
        this.ctx = this.$refs.canvas.getContext('2d');

        this.WaveGroup = new WaveGroup();

        this.resize();
        requestAnimationFrame(this.animate);
    },

    methods: {
        resize() {
            this.stageW = document.body.clientWidth;
            this.stageH = document.body.clientHeight;

            this.$refs.canvas.width = this.stageW * 2;
            this.$refs.canvas.height = this.stageH * 2;
            this.ctx.scale(2, 2);

            this.WaveGroup.resize(this.stageW, this.stageH);
        },

        animate() {
            this.ctx.clearRect(0, 0, this.stageW, this.stageH);
            this.WaveGroup.draw(this.ctx);

            requestAnimationFrame(this.animate);
        }
    }

};
</script>

<style lang="scss" scoped>
    canvas {
        width: 100%;
        height: 100vh;
    }
</style>
