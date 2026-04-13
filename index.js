const localPlayer = mp.players.local;
let browser = mp.browsers.new('package://cef/head-glitch/index.html');
const MAX_WALL_DISTANCE = 1.5;

function getDistance(pos1, pos2) {
    return Math.sqrt(
        Math.pow(pos1.x - pos2.x, 2) +
        Math.pow(pos1.y - pos2.y, 2) +
        Math.pow(pos1.z - pos2.z, 2)
    );
}

mp.events.add('playerWeaponShot', (targetPosition, targetEntity) => {
    try {
        // Bone ID 31086 (Baş/Kafa). Silah namlusu duvardan geçse bile baş geçemez. 6286 (El)
        const headPos = localPlayer.getBoneCoords(6286, 0, 0, 0);

        const raycast = mp.raycasting.testPointToPoint(
            headPos,
            targetPosition,
            localPlayer,
            17
        );

        if (raycast) {
            const hitPos = raycast.position;
            const distance = getDistance(hitPos, targetPosition);

            mp.gui.chat.push(`[DEBUG] Hedefe Kalan Mesafe: ${distance.toFixed(2)} metre`);

            if (distance > MAX_WALL_DISTANCE) {
                const screenPos = mp.game.graphics.world3dToScreen2d(hitPos.x, hitPos.y, hitPos.z);
                if (screenPos) {
                    const resolution = mp.game.graphics.getScreenActiveResolution(0, 0);
                    const pixelX = screenPos.x * resolution.x;
                    const pixelY = screenPos.y * resolution.y;

                    browser.execute(`drawMarkerAt(${pixelX}, ${pixelY});`);
                }
                return true;
            }
        }
    } catch (error) {

        mp.gui.chat.push(`[HATA] Raycast Hatası: ${error.message}`);
    }
});