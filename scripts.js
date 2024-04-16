let info = [];
async function logCharacters() {
    const response = await fetch("https://wjs-api.vercel.app/api/books");
    info = await response.json();

    let params = new URLSearchParams(window.location.search);
    let searchValue = params.get("search") || "";

    if (searchValue) {
        searchFunction(searchValue);
    } else {
        showCharacters(info);
    }
}

function showCharacters(data) {
    const container = document.getElementById("container");
    container.innerHTML = "";

    data.forEach(element => {
        const containerInContainer = document.createElement("div")
        const name = document.createElement("p");
        name.innerText = element.title;
        containerInContainer.classList.add("containerInContainer");
        name.classList.add("name");
        containerInContainer.appendChild(name);
        container.appendChild(containerInContainer);

        containerInContainer.addEventListener("click", function() {
            container.innerHTML = "";
            container.innerText = element.title;
            input.style.display = "none";

            const btn = document.createElement("button");
            btn.innerText = "Zpět na hlavní stránku";
            btn.addEventListener("click", function() {
                input.style.display = "unset";
                container.innerHTML = "";
                logCharacters();
            });
            container.appendChild(btn);
        });
    })
}

function searchFunction(searchValue) {
    input.value = searchValue;
    let filter = searchValue.toUpperCase();

    let filteredData = info.filter(element => {
        return element.title.toUpperCase().includes(filter);
    });

    showCharacters(filteredData);

    window.history.replaceState(null, null, "?search=" + input.value);
}

const input = document.getElementById("hledat");
input.addEventListener("input", function() {
    searchFunction(input.value);
});

logCharacters();