function confirmEntry() {
    const confirm = document.getElementById('enter-popup');

    const background_music = new Audio('tijuana_sound_machine.mp3');
    background_music.play();
    background_music.loop = true;
    document.title = "Tacos Con Espagueti!";
    const icon = document.getElementById('favicon');
    icon.href = 'https://sonomania.forgeheart.org/psychescapea/favicon.ico'
    confirm.remove();
}
