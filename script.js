let content = [];

const displayContent = (data = content) => {
    const container = document.getElementById("content");
    container.innerHTML = "";

    data.forEach(item => {
        const article = document.createElement("article");
        article.innerHTML = `
            <h2>${item.title}</h2>
            <p>${item.body}</p>
            <button class="edit" onclick="editContent(${item.id})">Szerkesztés</button>
            <button class="delete" onclick="deleteContent(${item.id})">Törlés</button>
        `;
        container.appendChild(article);
    });
};

const openModal = () => {
    const modal = document.getElementById("modal");
    modal.style.display = "block";
};

const closeModal = () => {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
};

document.getElementById("openModalBtn").addEventListener("click", openModal);

document.getElementById("addContentForm").addEventListener("submit", event => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
    const id = content.length + 1;
    content.push({ id, title, body });
    displayContent();
    closeModal();
});

const editContent = id => {
    const item = content.find(item => item.id === id);
    if (item) {
        document.getElementById("title").value = item.title;
        document.getElementById("body").value = item.body;
        openModal();
        document.getElementById("addContentForm").addEventListener("submit", event => {
            event.preventDefault();
            const title = document.getElementById("title").value;
            const body = document.getElementById("body").value;
            content = content.map(item => (item.id === id ? { ...item, title, body } : item));
            displayContent();
            closeModal();
        });
    }
};

const deleteContent = id => {
    content = content.filter(item => item.id !== id);
    displayContent();
};

document.addEventListener("click", event => {
    if (event.target.classList.contains("close")) {
        closeModal();
    }
});

const searchContent = searchTerm => {
    searchTerm = searchTerm.toLowerCase();
    const filteredContent = content.filter(item => item.title.toLowerCase().includes(searchTerm));
    displayContent(filteredContent);
};

document.getElementById("searchInput").addEventListener("input", event => {
    const searchTerm = event.target.value;
    searchContent(searchTerm);
});

// Példa tartalom hozzáadása
content.push({ id: 1, title: "HTML alapok", body: "HTML (HyperText Markup Language) az internetes oldalak strukturális alapjait definiálja." });
content.push({ id: 2, title: "CSS alapok", body: "CSS (Cascading Style Sheets) segítségével formázhatók az HTML elemei." });

displayContent();
