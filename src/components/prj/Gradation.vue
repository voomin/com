<template>
    <svg
        :viewBox="`0 0 ${windowW} ${windowH}`"
        @click="click"
    >
        <g
            v-for="(c, i) in circleArr"
            :key="i"
        >
            <radialGradient
                :id="`grad${i}`"
                cx="50%" cy="50%"
                r="50%" fx="50%" fy="50%"
            >
                <stop
                    offset="0%"
                    :style="[{'stop-color':c.color}, {'stop-opacity': 1}]"
                />
                <stop
                    offset="100%"
                    :style="[{'stop-color':c.color}, {'stop-opacity': 0}]"
                />
            </radialGradient>

            <circle
                class="circle"
                :cx="c.x"
                :cy="c.y"
                :r="c.r"
                :fill="`url(#grad${i})`"
                :transform="`scale(${scale})`"
            />
        </g>

    </svg>
</template>

<script>
import { getRndm } from '../../cmn/util/func';

export default {
    data() {
        return {
            fps: 60,
            interval: null,

            windowW: window.innerWidth,
            windowH: window.innerHeight,

            spd: 1,
            scale: 1,

            minSize: 0,
            maxSize: 0,

            circleCnt: 15,
            circleArr: []
        };
    },

    computed: {
        // grabRectX() {
        //     return this.grabRect.x + this.gapX;
        // },
    },

    beforeUnmount() {
        this.intervalStop();
    },

    created() {
        const size = (this.windowH < this.windowW ? this.windowW : this.windowH);
        this.minSize = size * 0.2;
        this.maxSize = size * 0.5;

        this.circleArr = [...Array(this.circleCnt).keys()].map(() => this.getCircle());
    },

    mounted() {
        this.intervalStart();
    },

    methods: {
        click() {
            this.circleArr.shift();
            this.circleArr.push(this.getCircle());
        },

        getCircle() {
            const r = getRndm(this.maxSize - this.minSize) + this.minSize;
            const x = getRndm(this.windowW);
            const y = getRndm(this.windowH);
            const hex = [...Array(6).keys()].map(() => getRndm(16).toString(16)).join('');
            const color = `#${hex}`;
            const angle = getRndm(360);

            return {
                x,
                y,
                r,
                color,
                angle
            };
        },

        intervalStart() {
            if (!this.interval) {
                const scaleCycle = this.fps * 5;
                let cnt = 0;
                let scaleSpd = 0.001;

                this.interval = setInterval(() => {
                    this.circleArr.forEach((e) => {
                        // const cw = e.r * 2;
                        const radian = ((e.angle - 90) * Math.PI) / 180;
                        e.x += this.spd * Math.cos(radian);
                        e.y += this.spd * Math.sin(radian);

                        const xend = this.windowW;
                        const yend = this.windowH;

                        if (e.x < 0) {
                            e.x = 0;
                            e.angle = 360 - e.angle;
                        } else if (xend < e.x) {
                            e.x = xend;
                            e.angle = 360 - e.angle;
                        } else if (e.y < 0) {
                            e.y = 0;
                            e.angle = 180 - e.angle;
                        } else if (yend < e.y) {
                            e.y = yend;
                            e.angle = 180 - e.angle;
                        }
                    });

                    this.scale += scaleSpd;

                    if (cnt++ > scaleCycle) {
                        cnt = 0;
                        scaleSpd *= -1;
                    }
                }, 1000 / this.fps);
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
    }

    .circle {
        transform-box: fill-box;
        transform-origin: center;
    }

</style>
