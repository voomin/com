const path = '/rive/';

/* global Rive */
/* eslint no-undef: "error" */
export const rive = (canvas, {
    riv, w = 100, h = 100
}, cb) => {
    if (riv) {
        try {
            Rive({
                locateFile: (file) => `https://unpkg.com/rive-canvas@0.6.7/${file}`
            }).then((riveObj) => {
                const req = new Request(riv);
                fetch(req).then((res) => {
                    return res.arrayBuffer();
                }).then((buf) => {
                    // we've got the raw bytes of the animation,
                    // let's load them into a riveObj file
                    const file = riveObj.load(new Uint8Array(buf));
                    const artboard = file.defaultArtboard();
                    const mainAnim = artboard.animation('Animation2');
                    const myAnimInstance = new riveObj.LinearAnimationInstance(mainAnim);

                    const ctx = canvas.getContext('2d');
                    const renderer = new riveObj.CanvasRenderer(ctx);

                    // Set canvas size
                    canvas.width = w;
                    canvas.height = h;
                    // canvas.height = 1000

                    artboard.advance(0);

                    ctx.save();
                    renderer.align(riveObj.Fit.contain, riveObj.Alignment.center, {
                        minX: 0,
                        minY: 0,
                        maxX: canvas.width,
                        maxY: canvas.height
                    }, artboard.bounds);

                    artboard.draw(renderer);
                    ctx.restore();

                    let lastTime = 0;

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
                        renderer.align(riveObj.Fit.contain, riveObj.Alignment.center, {
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

                    cb();
                });
            });
        } catch (err) {
            console.error(err);
        }
    } else {
        console.log('파일경로를 전달해 주세요');
    }
};

export const riv = Object.freeze({
    marty: `${path}marty.riv`
});
