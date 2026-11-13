// Function to add the "navbarDark" class to the navbar on scroll
function handleNavbarScroll() {
    const header = document.querySelector(".navbar");
    window.onscroll = function () {
        const top = window.scrollY;
        if (top >= 100) {
            header.classList.add("navbarDark");
        } else {
            header.classList.remove("navbarDark");
        }
    };
}

// Function to handle navbar collapse on small devices after a click
function handleNavbarCollapse() {
    const navLinks = document.querySelectorAll(".nav-item");
    const menuToggle = document.getElementById("navbarSupportedContent");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            new bootstrap.Collapse(menuToggle).toggle();
        });
    });
}

// Fill a skill card (copied from the <template id="skill-template">)
function fillSkillCard(card, item) {
    card.querySelector("img").src = `./images/${item.image}`;
    card.querySelector("img").alt = item.title;
    card.querySelector("h3").textContent = item.title;
    card.querySelector("p").textContent = item.text;
}

// Fill a portfolio card (copied from the <template id="portfolio-template">)
function fillPortfolioCard(card, item) {
    card.querySelector("img").src = `images/${item.image}`;
    card.querySelector("img").alt = item.title;
    card.querySelector("h3").textContent = item.title;
    card.querySelector("p").textContent = item.text;
    card.querySelector("a").href = item.link;
}

// Load a JSON file, copy the template for each item, fill it and display it
function displayCards(jsonUrl, containerSelector, templateId, fillCard) {
    const container = document.querySelector(containerSelector);
    const template = document.getElementById(templateId);
    const row = document.createElement("div");
    row.classList.add("row");
    container.appendChild(row);

    fetch(jsonUrl)
        .then((response) => response.json())
        .then((data) => {
            data.forEach((item) => {
                const card = template.content.cloneNode(true);
                fillCard(card, item);
                row.appendChild(card);
            });
        })
        .catch((error) => console.error(`Erreur de chargement de ${jsonUrl} :`, error));
}

// Call the functions to execute the code
handleNavbarScroll();
handleNavbarCollapse();
displayCards("data/skills.json", "#skills .container", "skill-template", fillSkillCard);
displayCards("data/portfolio.json", "#portfolio .container", "portfolio-template", fillPortfolioCard);
