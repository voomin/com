<template>
    <svg
        :viewBox="`0 0 ${windowW} ${windowH}`"
        @mousemove="mousemove"
        @touchmove="mousemove"
        @mouseup="mouseup"
        @touchend="mouseup"
    >
        <!-- 사각형 -->
        <g
            v-for="(rect, i) in rectArr"
            :key="i"

            :transform="`translate(${rect.x}, ${rect.y}) rotate(${rect.rotation})`"
            @mousedown="mousedown($event, i)"
            @touchstart="mousedown($event, i)"
        >
            <!-- eslint-disable-next-line vue/max-attributes-per-line -->
            <filter id="dropshadow" height="130%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                <feOffset dx="2" dy="2" result="offsetblur" />
                <feComponentTransfer>
                    <feFuncA type="linear" slope="0.5" />
                </feComponentTransfer>
                <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>

            <rect
                class="box"
                style="filter:url(#dropshadow)"
                :width="rectW"
                :height="rectH"
                :x="0"
                :y="0"
            />
        </g>

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
                v-if="grabRect"
                class="point"
                :cx="grabRectX"
                :cy="grabRectY"
                :r="pointR"
            />
        </g>
    </svg>
</template>

<script>
import { getRndm, getClientXY } from 'util/func';

export default {
    data() {
        return {
            fps: 60,
            interval: null,

            windowW: window.innerWidth,
            windowH: window.innerHeight,

            spd: 5,
            maxRotation: 30,

            pointX: 0,
            pointY: 0,
            pointR: 5,

            rectW: 200,
            rectH: 160,
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
        const maxX = this.windowW - this.rectW;
        const maxY = this.windowH - this.rectH;
        for (let i = 0; i < 10; i++) {
            const x = getRndm(maxX);
            const y = getRndm(maxY);
            // console.log(x2 + y2);
            // const x = 0;
            // const y = 0;
            this.rectArr.push({
                id: `rect${i}`,
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
        mousedown(evt, idx) {
            if (!this.grabRect) {
                const { clientX: x, clientY: y } = getClientXY(evt);
                const [rect] = this.rectArr.splice(idx, 1);
                this.rectArr.push(rect);
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
                    this.rectArr.forEach((rect) => {
                        const {
                            toX, toY, x, y
                        } = rect;

                        if (typeof toX === 'number') {
                            const dx = toX - x;
                            const dy = toY - y;
                            const spdX = Math.abs(dx) / this.fps;
                            const spdY = Math.abs(dy) / this.fps;
                            const alphaX = (dx > 0 ? 1 : -1); // 양수냐 음수냐

                            const rotation = (this.maxRotation)
                                            * Math.min(Math.max(spdX, 0), 1)
                                            * alphaX;

                            rect.rotation += (rotation - rect.rotation) * 0.12;
                            rect.x += spdX * this.spd * alphaX;
                            rect.y += spdY * this.spd * (dy > 0 ? 1 : -1);

                            // 목적지에 도착
                            if (Math.round(rect.x) === toX && Math.round(rect.y) === toY) {
                                rect.x = toX;
                                rect.y = toY;
                                rect.rotation = 0;

                                delete rect.toX;
                                delete rect.toY;
                            }
                        }
                    });
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
        height: 100%;
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

        .shadow {
            fill: #fff;
            opacity: 0.5;

        }
    }

</style>
