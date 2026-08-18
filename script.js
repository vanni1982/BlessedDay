const root = document.documentElement;
const lens = document.getElementById('lens');
const audio = document.getElementById('hymnAudio');
const signature = document.getElementById('vanniSignature');

let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;

window.addEventListener('resize', () => {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
});

function updateLensPosition(x, y) {
    root.style.setProperty('--mouse-x', x + 'px');
    root.style.setProperty('--mouse-y', y + 'px');
    
    const textLeftOffset = (screenWidth / 2) - x;
    const textTopOffset = (screenHeight / 2) - y;
    
    root.style.setProperty('--text-left', textLeftOffset + 'px');
    root.style.setProperty('--text-top', textTopOffset + 'px');
}

function initLens() {
    const defaultX = screenWidth * 0.5;
    const defaultY = screenHeight * 0.15;
    updateLensPosition(defaultX, defaultY);
}
initLens();

window.addEventListener('mousemove', (e) => {
    updateLensPosition(e.clientX, e.clientY);
});

window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
        e.preventDefault(); 
        const touch = e.touches[0]; 
        updateLensPosition(touch.clientX, touch.clientY);
    }
}, { passive: false });

window.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
        const touch = e.touches[0];
        updateLensPosition(touch.clientX, touch.clientY);
    }
}, { passive: true });


// TULOY-TULOY NA AUDIO AT WATERMARK ENGINE (NON-STOP FEATURES)
let initialTapDone = false;

lens.addEventListener('click', () => {
    // Kapag tinap ang lens, kahit ulit-ulitin ang tap, hindi hihinto ang music at blink
    if (!initialTapDone) {
        audio.play().then(() => {
            initialTapDone = true;
            
            // I-set ang lens border sa yellow-green active look
            lens.style.borderColor = "#adff2f"; 
            
            // I-activate ang permanenteng infinite neon kislap sa pangalan mo
            signature.classList.add('music-playing');
        }).catch((err) => {
            console.log("Audio streaming profile update:", err);
        });
    }
});
