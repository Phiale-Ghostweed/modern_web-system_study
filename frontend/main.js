window.addEventListener("DOMContentLoaded", async () => {
    const responce = await fetch('/api/message');
    const data = await responce.json();

    document.getElementById('output').textContent = data.text;
});