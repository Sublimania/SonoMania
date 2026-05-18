function render_track_list(track_list) {
    const list_container = document.querySelector(".track_list");

    list_container.innerHTML = "";

    track_list.forEach((track, index) => {
        const li = document.createElement("li");

        const track_link = document.createElement("a");
        track_link.href = "#";
        track_link.className = "track_link";
        track_link.dataset.index = index;

        const cover_image = document.createElement("img");
        cover_image.className = "cover";
        cover_image.src = encodeURI(track.image);
        cover_image.onerror = function () {
            this.src = "../assets/jpg/covers/crøs.jpg";
        };

        const title = document.createElement("span");
        title.innerHTML = " " + track.name;
        title.className = "track_title"

        const play_select = document.createElement("span");
        play_select.textContent = "Click to preview!"
        play_select.className = "select_indicator"

        const br = document.createElement("br")

        const download_button = document.createElement("button");
        download_button.innerHTML = '<a class="download_text">Save</a>';
        download_button.className = "download_button";

        download_button.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            const download_link = document.createElement("a");
            download_link.href = encodeURI(track.src);
            download_link.download = track.name + ".mp3";

            document.body.appendChild(download_link);
            download_link.click();
            download_link.remove();
        });
        
        track_link.appendChild(download_button)
        track_link.append(br)
        track_link.appendChild(cover_image);
        track_link.appendChild(title);
        title.appendChild(play_select);
        li.appendChild(track_link);
        list_container.appendChild(li);
    });
}

function attach_track_list_events(track_list, load_track, play_track, set_track_index) {
    document.querySelectorAll(".track_link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            const index = parseInt(link.dataset.index);

            set_track_index(index);
            load_track(index);
            play_track();
        });
    });
}
