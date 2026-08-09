function confirmEntry() {
    const confirm = document.getElementById('enter-popup');

    const background_music = new Audio('tijuana sound machine.mp3');
    background_music.play();
    background_music.loop = true;

    confirm.remove();
}