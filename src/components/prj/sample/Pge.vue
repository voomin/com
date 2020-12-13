<template>
    <div>
        <canvas id="canvas" ref="canvas" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            ctx: null,
            stageW: 0,
            stageH: 0,
            pixelRatio: 1,
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
        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        this.resize();
        requestAnimationFrame(this.animate);
    },

    methods: {
        resize() {
            this.stageW = document.body.clientWidth;
            this.stageH = document.body.clientHeight;

            this.$refs.canvas.width = this.stageW * this.pixelRatio;
            this.$refs.canvas.height = this.stageH * this.pixelRatio;
            this.ctx.scale(this.pixelRatio, this.pixelRatio);
        },

        animate() {
            requestAnimationFrame(this.animate);
            
            this.ctx.clearRect(0, 0, this.stageW, this.stageH);
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
