<template>
    <svg
        :viewBox="`0 0 ${windowW - 3} ${windowH - 3}`"
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
            <!-- 목적지 point -->
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

            <!-- 잡은 객체 point -->
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
import { getRndm, getClientXY } from '../../util/func';

export default {
    data() {
        return {
            fps: 60,
            interval: null,

            windowW: window.innerWidth,
            windowH: window.innerHeight,

            spd: 5, // 가속도

            pointX: 0,
            pointY: 0,
            pointR: 0,

            rectW: 100,
            rectH: 100,
            rectArr: [],
            grabRect: null,
            gapX: 0,
            gapY: 0

        };
    },

    computed: {
        grabRectX() {
            return this.grabRect.x + this.gapX;
        },

        grabRectY() {
            return this.grabRect.y + this.gapY;
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
            const x = getRndm(maxX);
            const y = getRndm(maxY);
            // console.log(x2 + y2);
            // const x = 0;
            // const y = 0;
            this.rectArr.push({
                width: this.rectW,
                height: this.rectH,
                x,
                y,
                rotation: 0
            });
        }
    },

    mounted() {
        this.intervalStart();
    },

    methods: {
        mousedown(evt, rect) {
            if (!this.grabRect) {
                const { clientX: x, clientY: y } = getClientXY(evt);
                this.grabRect = rect;
                this.gapX = x - rect.x;
                this.gapY = y - rect.y;

                this.mousemove(evt);
            }
        },

        mousemove(evt) {
            if (this.grabRect) {
                const { clientX: x, clientY: y } = getClientXY(evt);
                this.pointX = x;
                this.pointY = y;

                this.grabRect.toX = x - this.gapX;
                this.grabRect.toY = y - this.gapY;
            }
        },

        mouseup() {
            this.grabDrop();
        },

        intervalStart() {
            if (!this.interval) {
                this.interval = setInterval(() => {
                    if (this.grabRect) {
                        const {
                            toX, toY, x, y
                        } = this.grabRect;
                        const dx = toX - x;
                        const dy = toY - y;
                        const spdX = Math.abs(dx) / this.fps;
                        const spdY = Math.abs(dy) / this.fps;
                        // const spd = Math.min(Math.max(spdX, 0), 1);
                        // this.grabRect.spd += this.acl;

                        this.grabRect.x += spdX * (dx > 0 ? this.spd : -this.spd);
                        this.grabRect.y += spdY * (dy > 0 ? this.spd : -this.spd);
                    }
                    // this.rectArr.forEach((rect) => {
                    //     console.log(rect);
                    // });
                }, 1000 / this.fps);
            }
        },

        grabDrop() {
            if (this.grabRect) {
                // this.grabRect.rotation = 0;
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
