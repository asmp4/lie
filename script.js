const form = document.getElementById('scenario-form');
const linksContainer = document.getElementById('links');

document.addEventListener('DOMContentLoaded', () => {
    const storedLinks = JSON.parse(localStorage.getItem('links')) || [];
    storedLinks.forEach(({ title, content }) => addLink(title, content));
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    addLink(title, content);
    saveLink(title, content);
    form.reset();
});

function addLink(title, content) {
    const linkDiv = document.createElement('div');
    linkDiv.classList.add('scenario');

    const linkAnchor = document.createElement('a');
    linkAnchor.href = 'about:blank';
    linkAnchor.target = '_blank';
    linkAnchor.textContent = title;
    linkAnchor.addEventListener('click', () => openScenario(title, content));

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit');
    editButton.addEventListener('click', () => editLink(linkDiv, title, content));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', () => deleteLink(linkDiv, title));

    linkDiv.appendChild(linkAnchor);
    linkDiv.appendChild(editButton);
    linkDiv.appendChild(deleteButton);
    linksContainer.appendChild(linkDiv);
}

function saveLink(title, content) {
    const storedLinks = JSON.parse(localStorage.getItem('links')) || [];
    storedLinks.push({ title, content });
    localStorage.setItem('links', JSON.stringify(storedLinks));
}

function deleteLink(linkDiv, title) {
    linkDiv.remove();
    const storedLinks = JSON.parse(localStorage.getItem('links')) || [];
    const updatedLinks = storedLinks.filter((link) => link.title !== title);
    localStorage.setItem('links', JSON.stringify(updatedLinks));
}

function editLink(linkDiv, oldTitle, oldContent) {
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');
    titleInput.value = oldTitle;
    contentInput.value = oldContent;
    deleteLink(linkDiv, oldTitle);
}

function openScenario(title, content) {
    const newWindow = window.open();
    newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background: #020318;
                    color: #e0e0e0;
                    padding: 20px;
                }
                h1 {
                    color: #febfea;
                }
            </style>
        </head>
        <body>
            <h1>${title}</h1>
            <p>${content}</p>
        </body>
        </html>
    `);
}
