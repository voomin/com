export const getRndm = (length) => Math.round(Math.random() * length);

// TouchEvent or MouseEvent에서 x, y 좌표 획득
export const getClientXY = (evt) => {
    let clientX;
    let clientY;

    if (evt instanceof TouchEvent) {
        const [{ pageX, pageY }] = evt.changedTouches;
        clientX = pageX;
        clientY = pageY;
    } else {
        clientX = evt.clientX;
        clientY = evt.clientY;
    }

    return { clientX, clientY };
};

export const lint = '';
