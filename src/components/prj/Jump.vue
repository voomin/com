<template>
    <svg
        :viewBox="`0 0 ${windowW} ${windowH}`"
        @mousedown="down"
        @touchstart="down"
    >
        <!-- grid line -->
        <g>
            <line
                v-for="(line,i) in lineArr"
                :key="`line${i}`"
                class="line"
                :x1="line.x1"
                :y1="line.y1"
                :x2="line.x2"
                :y2="line.y2"
            />
        </g>

        <!-- 원점 -->
        <circle
            :cx="cGridX * gridSize"
            :cy="cGridY * gridSize"
            :r="10"
            style="fill: #000;"
        />

        <!-- 물체 -->
        <circle
            v-if="isMove"
            :cx="x"
            :cy="y"
            :r="gridSize / 3"
            style="fill: #45B0F1;"
        />

        <!-- 목적지 -->
        <circle
            v-if="isMove"
            :cx="toX"
            :cy="toY"
            :r="10"
            style="fill: yellow;"
        />
    </svg>
</template>

<script>
import { getClientXY } from '../../util/func';

export default {
    data() {
        return {
            fps: 60,
            interval: null,

            isMove: false,

            windowW: window.innerWidth,
            windowH: window.innerHeight,

            lineArr: [],

            gridSize: 0,
            cGridX: 0,
            cGridY: 0,

            col: 10,
            row: 0,

            x: 0,
            y: 0,

            toX: 0,
            toY: 0

        };
    },

    computed: {
        // grabRectX() {
        //     return this.grabRect.x + this.gapX;
        // }
    },

    beforeUnmount() {
        this.intervalStop();
    },

    created() {
        this.gridSize = this.windowW / this.col;
        this.row = Math.ceil(this.windowH / this.gridSize);

        for (let i = 0; i < this.col; i++) {
            const x = i * this.gridSize;
            this.lineArr.push({
                x1: x,
                y1: 0,
                x2: x,
                y2: this.windowH
            });
        }

        for (let i = 0; i < this.row; i++) {
            const y = (i * this.gridSize);
            this.lineArr.push({
                x1: 0,
                y1: y,
                x2: this.windowW,
                y2: y
            });
        }

        this.cGridX = Math.floor(this.col / 2);
        this.cGridY = Math.ceil(this.row / 2);

        this.x = this.cGridX * this.gridSize;
        this.y = this.cGridY * this.gridSize;

        console.log({ col: this.col, row: this.row });
    },

    mounted() {
        this.intervalStart();
    },

    methods: {
        anim() {

        },

        intervalStart() {
            if (!this.interval) {
                const spd = 3;
                this.interval = setInterval(() => {
                    const dx = this.toX - this.x;
                    const dy = this.toY - this.y;
                    const spdX = dx / this.fps;
                    const spdY = dy / this.fps;

                    this.x += spdX * spd;
                    this.y += spdY * spd;
                }, 1000 / this.fps);
            }
        },

        intervalStop() {
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = null;
            }
        },

        down(evt) {
            const { clientX: x, clientY: y } = getClientXY(evt);
            this.toX = x;
            this.toY = y;
            this.isMove = true;
        },

        getXY(gridX, gridY) {
            return {
                x: ((this.cGridX + gridX) * this.gridSize),
                y: ((this.cGridY + gridY) * this.gridSize)
            };
        }
    }
};
</script>

<style lang="scss" scoped>
    svg {
        width: 100%;
        height: 100%;
        background-color: #333;
    }

    .line {
        stroke: #868686;
        stroke-width: 1;
    }

</style>
