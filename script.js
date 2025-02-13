const API_BASE_URL = "https://starxkey-backend.vercel.app";

// Fungsi untuk membuat key
async function createKey() {
  const expiration = document.getElementById("expiration").value;
  const response = await fetch(`${API_BASE_URL}/generate?expired=${expiration}`);
  const data = await response.json();

  if (data.key) {
    document.getElementById("generated-key").innerText = `Generated Key: ${data.key}`;
    fetchKeyStats(); // Update statistik setelah membuat key
    fetchKeyList(); // Update daftar key
  } else {
    alert("Failed to generate key.");
  }
}

// Fungsi untuk mengambil statistik key
async function fetchKeyStats() {
  const response = await fetch(`${API_BASE_URL}/data`);
  const data = await response.json();

  if (data.keys) {
    const keys = Object.keys(data.keys);
    const now = new Date();
    const hourlyKeys = keys.filter(key => {
      const timeDiff = (now - new Date(data.keys[key])) / 1000 / 60 / 60;
      return timeDiff < 1;
    }).length;

    const dailyKeys = keys.filter(key => {
      const timeDiff = (now - new Date(data.keys[key])) / 1000 / 60 / 60;
      return timeDiff < 24;
    }).length;

    const weeklyKeys = keys.filter(key => {
      const timeDiff = (now - new Date(data.keys[key])) / 1000 / 60 / 60 / 24;
      return timeDiff < 7;
    }).length;

    const monthlyKeys = keys.filter(key => {
      const timeDiff = (now - new Date(data.keys[key])) / 1000 / 60 / 60 / 24;
      return timeDiff < 30;
    }).length;

    document.getElementById("total-keys").innerText = keys.length;
    document.getElementById("hourly-keys").innerText = hourlyKeys;
    document.getElementById("daily-keys").innerText = dailyKeys;
    document.getElementById("weekly-keys").innerText = weeklyKeys;
    document.getElementById("monthly-keys").innerText = monthlyKeys;
  }
}

// Fungsi untuk mengambil daftar key
async function fetchKeyList() {
  const response = await fetch(`${API_BASE_URL}/data`);
  const data = await response.json();

  if (data.keys) {
    const keyList = document.getElementById("key-list");
    keyList.innerHTML = ""; // Clear existing list
    Object.keys(data.keys).forEach(key => {
      const li = document.createElement("li");
      li.innerText = key;
      keyList.appendChild(li);
    });
  }
}

// Inisialisasi
fetchKeyStats();
fetchKeyList();
