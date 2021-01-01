<template>
    <div>
        <h1>Rive Context 2D Example</h1>
        <p>
            For more info, check out the
            <a href="https://www.npmjs.com/package/rive-canvas">
                Rive web canvas package
            </a>
            .
        </p>
        <div id="canvasContainer">
            <canvas id="riveCanvas2" class="mx-auto" />
        </div>
    </div>
</template>

<script>
// const loaderRiv = () => import('./rive/loader.riv');

export default {
    data() {
        return {
            fps: 60,
            interval: null,

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
        /* global Rive */
        /* eslint no-undef: "error" */
        Rive({
            locateFile: (file) => `https://unpkg.com/rive-canvas@0.6.7/${file}`
        }).then((rive) => {
            const req = new Request('/rive/marty.riv');
            console.log(req);
            fetch(req).then((res) => {
                console.log(res);
                return res.arrayBuffer();
            }).then((buf) => {
                console.log(buf);
                // we've got the raw bytes of the animation,
                // let's load them into a Rive file
                const file = rive.load(new Uint8Array(buf));
                console.log(file);
                const artboard = file.defaultArtboard();
                const mainAnim = artboard.animation('Animation2');
                const myAnimInstance = new rive.LinearAnimationInstance(mainAnim);

                this.canvas = document.getElementById('riveCanvas2');
                const ctx = this.canvas.getContext('2d');
                const renderer = new rive.CanvasRenderer(ctx);

                // Get container size
                const canvasContainer = document.getElementById('canvasContainer');
                const canvasRect = canvasContainer.getBoundingClientRect();

                // Set canvas size
                this.canvas.width = canvasRect.width;
                this.canvas.height = 500;
                // this.canvas.height = 1000

                artboard.advance(0);

                ctx.save();
                renderer.align(rive.Fit.contain, rive.Alignment.center, {
                    minX: 0,
                    minY: 0,
                    maxX: this.canvas.width,
                    maxY: this.canvas.height
                }, artboard.bounds);

                artboard.draw(renderer);
                ctx.restore();

                let lastTime = 0;
                const { canvas } = this;

                function draw(time) {
                    if (!lastTime) {
                        lastTime = time;
                    }
                    const elapsedTime = (time - lastTime) / 1000;
                    lastTime = time;

                    myAnimInstance.advance(elapsedTime);
                    myAnimInstance.apply(artboard, 1.0);
                    artboard.advance(elapsedTime);

                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.save();
                    renderer.align(rive.Fit.contain, rive.Alignment.center, {
                        minX: 0,
                        minY: 0,
                        maxX: canvas.width,
                        maxY: canvas.height
                    }, artboard.bounds);
                    artboard.draw(renderer);
                    ctx.restore();

                    requestAnimationFrame(draw);
                }

                requestAnimationFrame(draw);
            });
        });
    },

    methods: {
        // intervalStop() {
        //     if (this.interval) {
        //         clearInterval(this.interval);
        //     }
        // }
    }
};
</script>

<style lang="scss" scoped>
    svg {
        width: 100%;
        height: 100%;

    }

</style>
