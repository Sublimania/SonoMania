let track_art = document.querySelector(".track_art");
let track_name = document.querySelector(".track_name");

let play_pause_button = document.querySelector(".playpause_track");
let next_button = document.querySelector(".next_track");
let previous_button = document.querySelector(".prev_track");

let seek_slider = document.querySelector(".seek_slider");
let current_time = document.querySelector(".current_time");
let total_duration = document.querySelector(".total_duration");

let track_index = 0;
let is_playing = false;
let update_timer;

let current_track = document.createElement('audio');

let track_list = [];

fetch("../assets/json/tracklist.json")
    .then(response => response.json())
    .then(data => {
        track_list = data;
        console.log(track_list)
        load_track(track_index);

        render_track_list(track_list);

        attach_track_list_events(
            track_list,
            load_track,
            play_track,
            (i) => track_index = i
        );
    })
    .catch(err => console.error("Error:", err));

function load_track(track_index) {
    clearInterval(update_timer);
    reset_values();

    current_track.src = track_list[track_index].path;
    current_track.load();

    track_art.src = track_list[track_index].image;
    track_art.onerror = null;
    track_art.onerror = function () {
        this.src = "../assets/jpg/covers/crøs.jpg";
    };
    track_name.textContent = track_list[track_index].name;

    update_timer = setInterval(seek_update, 1000);

    current_track.addEventListener("ended", next_track);
}

function reset_values() {
    current_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function play_track() {
    current_track.play();
    is_playing = true;

    play_pause_button.innerHTML = '<button>⏸</button>';
}

function pause_track() {
    current_track.pause();
    is_playing = false;

    play_pause_button.innerHTML = '<button>▶</button>';
}

function play_pause_track() {
    if (!is_playing) play_track();
    else pause_track();
}


function next_track() {
    if (track_index < track_list.length - 1)
        track_index += 1;
    else track_index = 0;

    load_track(track_index);
    play_track();
}

function previous_track() {
    if (track_index > 0)
        track_index -= 1;
    else track_index = track_list.length - 1;

    load_track(track_index);
    play_track();
}

function seek_to() {
    new_time = current_track.duration * (seek_slider.value / 100);

    current_track.currentTime = new_time;
}

function seek_update() {
    let seek_position = 0;

    if (!isNaN(current_track.duration)) {
        seek_position = current_track.currentTime * (100 / current_track.duration);
        seek_slider.value = seek_position;

        let current_minutes = Math.floor(current_track.currentTime / 60);
        let current_seconds = Math.floor(current_track.currentTime - current_minutes * 60);
        let duration_minutes = Math.floor(current_track.duration / 60);
        let duration_seconds = Math.floor(current_track.duration - duration_minutes * 60);

        if (current_seconds < 10) { current_seconds = "0" + current_seconds; }
        if (duration_seconds < 10) { duration_seconds = "0" + duration_seconds; }
        if (current_minutes < 10) { current_minutes = "0" + current_minutes; }
        if (duration_minutes < 10) { duration_minutes = "0" + duration_minutes; }

        current_time.textContent = current_minutes + ":" + current_seconds;
        total_duration.textContent = duration_minutes + ":" + duration_seconds;
    }
}