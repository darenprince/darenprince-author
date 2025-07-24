
function checkPassword() {
    const correctPassword = "Im@g355uck";
    const input = document.getElementById("passwordInput").value;
    if (input === correctPassword) {
        document.getElementById("loginOverlay").style.display = "none";
    } else {
        document.getElementById("loginError").style.display = "block";
    }
}

function filterContent() {
    let query = document.getElementById("searchInput").value.toLowerCase();
    let divs = document.querySelectorAll("#reportContent *");
    divs.forEach(el => {
        if (el.innerText.toLowerCase().includes(query)) {
            el.style.display = "";
        } else {
            el.style.display = "none";
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const content = document.querySelectorAll("#reportContent h2, #reportContent h3");
    const nav = document.getElementById("dynamicNav");
    content.forEach((el, i) => {
        const id = "section" + i;
        el.id = id;
        const li = document.createElement("li");
        li.innerHTML = `<a href="#${id}" style="color: inherit; text-decoration: none;">${el.innerText}</a>`;
        nav.appendChild(li);
    });
});
