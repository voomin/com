<template>
    <div class="wrap">
        <canvas id="canvas" ref="canvas" />
    </div>
</template>

<script>
import BounceString from './BounceString';

export default {
    data() {
        return {
            ctx: null,
            stageW: 0,
            stageH: 0,
            pixelRatio: 1,

            strings: [],
            moveX: 0,
            moveY: 0,
            isDown: false
        };
    },

    beforeUnmount() {
        window.removeEventListener('resize', this.resize);
    },

    created() {
        window.addEventListener('resize', this.resize, false);
    },

    mounted() {
        this.ctx = this.$refs.canvas.getContext('2d');
        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        this.strings = [];
        this.moveX = -5000;
        this.moveY = -5000;
        this.isDown = false;

        this.resize();

        document.addEventListener('pointerdown', this.onDown, false);
        document.addEventListener('pointermove', this.onMove, false);
        document.addEventListener('pointerup', this.onUp, false);

        requestAnimationFrame(this.animate);
    },

    methods: {
        resize() {
            this.stageW = document.body.clientWidth;
            this.stageH = document.body.clientHeight;

            this.$refs.canvas.width = this.stageW * this.pixelRatio;
            this.$refs.canvas.height = this.stageH * this.pixelRatio;
            this.ctx.scale(this.pixelRatio, this.pixelRatio);

            this.strings = [
                new BounceString(
                    {
                        x1: 50,
                        y1: this.stageH / 2,
                        x2: this.stageW - 50,
                        y2: this.stageH / 2
                    },
                    '#ff5038'
                )
            ];
        },

        animate() {
            requestAnimationFrame(this.animate);

            this.ctx.clearRect(0, 0, this.stageW, this.stageH);

            this.strings.forEach((string) => {
                string.animate(this.ctx, this.moveX, this.moveY);
            });
        },

        onDown(e) {
            this.isDown = true;
            this.moveX = e.clientX;
            this.moveY = e.clientY;
        },

        onMove(e) {
            if (this.isDown) {
                this.moveX = e.clientX;
                this.moveY = e.clientY;
            }
        },

        onUp() {
            if (this.isDown) {
                this.isDown = false;
                this.moveX = -5000;
                this.moveY = -5000;
            }
        }
    }

};
</script>

<style lang="scss" scoped>
    .wrap {
        background-color: #000;
    }
    canvas {
        width: 100%;
        height: 100vh;
    }
</style>
