function add_secret() {
    const remove_secret_button = document.createElement("button");
    remove_secret_button.setAttribute("onclick", "remove_secret()");
    remove_secret_button.innerHTML = "!";
    remove_secret_button.id = "remove_secret_button"
    remove_secret_button.classList = "secret_button"
    document.getElementById("add_secret_button").replaceWith(remove_secret_button);

    const secret_image = document.createElement("img");
    secret_image.src = "../assets/jpg/artwork/1.jpg";
    secret_image.id = "artwork";

    const secret_separator = document.createElement("br")
    secret_separator.id = "secret_separator";

    const secret_signature = document.createElement("img");
    secret_signature.src = "../assets/png/signature.png";
    secret_signature.id = "logo";
    
    document.getElementById("secrets").appendChild(secret_image);
    document.getElementById("secrets").appendChild(secret_separator);
    document.getElementById("secrets").appendChild(secret_signature);
}

function remove_secret() {
    const add_secret_button = document.createElement("button");
    add_secret_button.setAttribute("onclick", "add_secret()");
    add_secret_button.innerHTML = "?";
    add_secret_button.id = "add_secret_button"
    add_secret_button.classList = "secret_button"
    document.getElementById("remove_secret_button").replaceWith(add_secret_button);

    const secret_image = document.getElementById("artwork");
    const secret_separator = document.getElementById("secret_separator");
    const secret_signature = document.getElementById("logo");

    document.getElementById("secrets").removeChild(secret_image);
    document.getElementById("secrets").removeChild(secret_separator);
    document.getElementById("secrets").removeChild(secret_signature);
}