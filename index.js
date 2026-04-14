const localPlayer = mp.players.local;
let browser = null;

setTimeout(() => {
    browser = mp.browsers.new('package://cef/head-glitch/index.html');
}, 500);

const MAX_WALL_DISTANCE = 2;
const INPUT_ATTACK = 24;
const INPUT_ATTACK2 = 257;
const INPUT_AIM = 25;

let lastUpdate = 0;

function rotationToDirection(rotation) {
    const z = rotation.z * (Math.PI / 180.0);
    const x = rotation.x * (Math.PI / 180.0);
    const num = Math.abs(Math.cos(x));
    return new mp.Vector3(
        -Math.sin(z) * num,
        Math.cos(z) * num,
        Math.sin(x)
    );
}

mp.events.add('render', () => {
    if (!localPlayer.weapon || localPlayer.vehicle) return;

    const isAiming = mp.game.controls.isControlPressed(0, INPUT_AIM) || mp.game.controls.isDisabledControlPressed(0, INPUT_AIM);
    const isShooting = mp.game.controls.isControlPressed(0, INPUT_ATTACK) || mp.game.controls.isDisabledControlPressed(0, INPUT_ATTACK) ||
        mp.game.controls.isControlPressed(0, INPUT_ATTACK2) || mp.game.controls.isDisabledControlPressed(0, INPUT_ATTACK2);

    // 6286 (PH_R_Hand - Sağ El)
    const handPos = localPlayer.getBoneCoords(6286, 0.1, 0, 0);

    const gameplayCam = mp.cameras.new('gameplay');
    const camRot = gameplayCam.getRot(2);
    const dir = rotationToDirection(camRot);

    const targetPos = new mp.Vector3(
        handPos.x + (dir.x * MAX_WALL_DISTANCE),
        handPos.y + (dir.y * MAX_WALL_DISTANCE),
        handPos.z + (dir.z * MAX_WALL_DISTANCE)
    );

    const raycast = mp.raycasting.testPointToPoint(handPos, targetPos, localPlayer, 17);

    if (raycast) {
        mp.game.controls.disableControlAction(0, INPUT_ATTACK, true);
        mp.game.controls.disableControlAction(0, INPUT_ATTACK2, true);
        mp.game.controls.disableControlAction(0, 142, true);

        if (Date.now() - lastUpdate > 50 && browser) {
            if (isAiming || isShooting) {
                const screenPos = mp.game.graphics.world3dToScreen2d(raycast.position.x, raycast.position.y, raycast.position.z);
                if (screenPos) {
                    const res = mp.game.graphics.getScreenActiveResolution(0, 0);
                    const px = screenPos.x * res.x;
                    const py = screenPos.y * res.y;
                    browser.execute(`updateMarker(${px}, ${py});`);
                    lastUpdate = Date.now();
                }
            } else {
                browser.execute('hideMarker()');
                lastUpdate = Date.now();
            }
        }
    } else {
        if (Date.now() - lastUpdate > 100 && browser) {
            browser.execute('hideMarker()');
            lastUpdate = Date.now();
        }
    }
});