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
import { getClientXY } from 'util/func';

export default {
    data() {
        return {
            fps: 60,
            jumpHeight: 100,
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
            toY: 0,

            downX: 0,
            downY: 0
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

        this.downX = this.x;
        this.downY = this.y;
        this.toX = this.x;
        this.toY = this.y;
    },

    mounted() {
    },

    methods: {
        anim(startValue, toValue, time, cb) {
            return new Promise((resolve) => {
                const values = startValue.slice();

                let interval;
                let func;

                if (toValue[0] >= values[0]) {
                    func = () => {
                        for (let i = 0; i < values.length; i++) {
                            values[i] += (toValue[i] - startValue[i]) * (33 / time);
                        }

                        if (values[0] >= toValue[0]) {
                            cb(toValue.slice(0));

                            clearInterval(interval);
                            resolve();
                        } else {
                            cb(values.slice(0));
                        }
                    };
                } else {
                    func = () => {
                        for (let i = 0; i < values.length; i++) {
                            values[i] += (toValue[i] - startValue[i]) * (33 / time);
                        }

                        if (values[0] <= toValue[0]) {
                            cb(toValue.slice(0));

                            clearInterval(interval);
                            resolve();
                        } else {
                            cb(values.slice(0));
                        }
                    };
                }

                func();

                interval = setInterval(func, 33);
            });
        },

        getY(x) {
            const a = this.downX;
            const b = this.downY;
            const f = this.toX;
            const g = this.toY;
            const c = (a + f) / 2;
            const d = Math.min(b, g) - this.jumpHeight;

            const A = (g * (a ** 2 - c ** 2) + d * (f ** 2 - a ** 2)
            + b * (c ** 2 - f ** 2)) / (2 * ((g - d) * a + (b - g) * c + (d - b) * f));
            const C = (b - d) / (a ** 2 - c ** 2 + 2 * A * (c - a));
            const B = d - C * (c - A) ** 2;

            return C * ((x - A) ** 2) + B;
        },

        down(evt) {
            const { clientX: x, clientY: y } = getClientXY(evt);
            this.downX = this.x;
            this.downY = this.y;
            this.toX = x;
            this.toY = y;
            this.isMove = true;

            this.anim(
                [this.downX, this.downY],
                [this.toX, this.toY],
                1000,
                ([moveX]) => {
                    this.x = moveX;
                    this.y = this.getY(this.x);
                }
            );
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
