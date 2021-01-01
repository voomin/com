const basePath = '/rive/';

let id = 0;

/* global Rive */
/* eslint no-undef: "error" */
export const rive = async (canvas, {
    riv,
    anim,
    w = 100, h = 100
}, cb) => {
    let rtn = null;
    if (riv && anim) {
        try {
            const riveObj = await Rive({ locateFile: (file) => `https://unpkg.com/rive-canvas@0.6.7/${file}` });
            const req = new Request(`${basePath}${riv}`);
            const res = await fetch(req);
            const buf = await res.arrayBuffer();
            const file = riveObj.load(new Uint8Array(buf));
            const artboard = file.defaultArtboard();
            const firstAnim = artboard.animation(anim);
            let animInstance = new riveObj.LinearAnimationInstance(firstAnim);

            const ctx = canvas.getContext('2d');
            const renderer = new riveObj.CanvasRenderer(ctx);

            // Set canvas size
            canvas.width = w;
            canvas.height = h;

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
            let isRun = true;
            let playingSpd = 1;
            let actvAnim = anim;

            const draw = (time) => {
                if (!lastTime) {
                    lastTime = time;
                }
                const elapsedTime = (time - lastTime) / 1000;
                lastTime = time;

                animInstance.advance(elapsedTime * playingSpd);
                animInstance.apply(artboard, 1.0);
                artboard.advance(elapsedTime * playingSpd);

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

                if (isRun) requestAnimationFrame(draw);
            };

            requestAnimationFrame(draw);

            // 전달해줄 객체
            rtn = {
                id: id++,
                anim: (animName) => {
                    if (actvAnim !== animName) {
                        const animation = artboard.animation(animName);
                        animInstance = new riveObj.LinearAnimationInstance(animation);
                        actvAnim = animName;
                    }
                },
                stop: () => { isRun = false; },
                run: () => {
                    isRun = true;
                    requestAnimationFrame(draw);
                },
                spd: (spd) => { playingSpd = spd; }
            };

            // 전달
            cb(rtn);
        } catch (err) {
            console.error(err);
        }
    } else {
        console.log('riv || anim 값이 없습니다.');
    }

    return rtn;
};

export const lint = '';
