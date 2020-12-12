<template>
    <svg
        :viewBox="`0 0 ${windowW} ${windowH}`"
        @mousemove="mousemove"
        @touchmove="mousemove"
        @mouseup="mouseup"
        @touchend="mouseup"
    >
        <!-- 사각형 -->
        <rect
            v-for="(rect, i) in rectArr"
            :key="i"
            class="box"
            :width="rectW"
            :height="rectH"
            :x="rect.x"
            :y="rect.y"
            :transform="`rotate(${rect.rotation})`"
            @mousedown="mousedown($event, rect)"
            @touchstart="mousedown($event, rect)"
        />

        <!-- 밧줄 -->
        <g v-if="grabRect">
            <circle
                class="point"
                :cx="pointX"
                :cy="pointY"
                :r="pointR"
            />

            <line
                class="line"
                :x1="pointX"
                :y1="pointY"
                :x2="grabRectX"
                :y2="grabRectY"
            />

            <circle
                class="point"
                :cx="grabRectX"
                :cy="grabRectY"
                :r="pointR"
            />
        </g>
    </svg>
</template>

<script>
import { getRandom } from '../../util/func';

export default {
    data() {
        return {
            fps: 60,
            interval: null,

            windowW: window.innerWidth,
            windowH: window.innerHeight,

            pointX: 0,
            pointY: 0,
            pointR: 0,

            rectW: 100,
            rectH: 100,
            rectArr: [],
            grabRect: null,
            grabRotation: null

        };
    },

    computed: {
        grabRectX() {
            return this.grabRect.x + this.rectW / 2;
        },

        grabRectY() {
            return this.grabRect.y + this.rectH / 2;
        }
    },

    beforeUnmount() {
        this.intervalStop();
    },

    created() {
        this.pointR = this.rectW / 10;
        const maxX = this.windowW - this.rectW;
        const maxY = this.windowH - this.rectH;
        for (let i = 0; i < 10; i++) {
            const x = getRandom(maxX);
            const y = getRandom(maxY);
            this.rectArr.push({
                width: 100,
                height: 100,
                x,
                y,
                rotation: 0
            });
        }
        this.$forceUpdate();
    },

    mounted() {
        this.intervalStart();
    },

    methods: {
        mousedown(evt, rect) {
            if (!this.grabRect) {
                this.grabRect = rect;
                this.mousemove(evt);
            }
        },

        mousemove(evt) {
            if (this.grabRect) {
                const { clientX: x, clientY: y } = evt;
                this.pointX = x;
                this.pointY = y;

                this.grabRect.pointX = this.pointX;
                this.grabRect.pointY = this.pointY;
            }
        },

        mouseup() {
            this.grabDrop();
        },

        intervalStart() {
            if (!this.interval) {
                this.interval = setInterval(() => {
                    this.rectArr.forEach((rect) => {
                        if (rect.pointX) {
                            const pointX = rect.pointX - this.rectW / 2;
                            const pointY = rect.pointY - this.rectH / 2;

                            const dx = pointX - rect.x;
                            const dy = pointY - rect.y;
                            const spdX = Math.abs(dx) / this.fps;
                            const spd = Math.min(Math.max(spdX, 0), 1);
                            const argsX = [Math.ceil(rect.x + (dx / 9)), pointX];
                            const argsY = [Math.ceil(rect.y + (dy / 9)), pointY];

                            let rotation = (30 / 1) * spd;
                            rotation *= (dx > 0 ? 1 : -1);

                            rect.rotation += (rotation - rect.rotation) * 0.12;
                            rect.x = (dx > 0) ? Math.min(...argsX) : Math.max(...argsX);
                            rect.y = (dy > 0) ? Math.min(...argsY) : Math.max(...argsY);

                            if (rect.x === pointX && rect.y === pointY) {
                                rect.pointX = null;
                                rect.pointY = null;
                            }
                        }
                    });
                }, 1000 / this.fps);
            }
        },

        grabDrop() {
            if (this.grabRect) {
                // this.grabRect.rotation = 0;
                this.grabRotation = 0;
                this.grabRect = null;
            }
        },

        intervalStop() {
            if (this.interval) {
                clearInterval(this.interval);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
    svg {
        width: 100%;
        height: 100vh;
        background-color: #45B0F1;

        .point {
            fill: #FE5E00;
        }

        .line {
            stroke:#FE5E00;
            stroke-width:2
        }

        .box {
            fill: #F7EB36;
            transform-box: fill-box;
            transform-origin: center;
        }
    }

</style>
