const API_URL = "https://starxkey-backend.vercel.app";

async function fetchTotalKeys() {
    try {
        let response = await fetch(`${API_URL}/data`);
        let data = await response.json();
        document.getElementById("total-keys").innerText = data.total || 0;
    } catch (error) {
        console.error("Error fetching key data:", error);
    }
}

async function generateKey() {
    let expire = document.getElementById("expireOption").value;
    try {
        let response = await fetch(`${API_URL}/generate?expired=${expire}`);
        let data = await response.json();
        alert(`Key Generated: ${data.key}`);
        closeModal();
        fetchTotalKeys();
    } catch (error) {
        console.error("Error generating key:", error);
    }
}

async function checkKey() {
    let key = document.getElementById("checkKeyInput").value;
    if (!key) return alert("Please enter a key!");

    try {
        let response = await fetch(`${API_URL}/check?key=${key}`);
        let data = await response.json();
        document.getElementById("result").innerText = data.valid ? "Valid Key ✅" : "Invalid Key ❌";
    } catch (error) {
        console.error("Error checking key:", error);
    }
}

function openModal() {
    document.getElementById("modal").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// Auto fetch total keys on load
fetchTotalKeys();
