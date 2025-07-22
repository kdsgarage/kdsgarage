
const imageInput = document.getElementById("imageUpload");
const preview = document.getElementById("preview");
const galleryKey = "kdsgarage_gallery";

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const imgData = reader.result;
      addToGallery(imgData);
      saveImage(imgData);
    };
    reader.readAsDataURL(file);
  }
});

function saveImage(data) {
  const gallery = JSON.parse(localStorage.getItem(galleryKey) || "[]");
  gallery.push(data);
  localStorage.setItem(galleryKey, JSON.stringify(gallery));
}

function addToGallery(src) {
  const img = document.createElement("img");
  img.src = src;
  preview.appendChild(img);
}

function loadGallery() {
  const gallery = JSON.parse(localStorage.getItem(galleryKey) || "[]");
  gallery.forEach(addToGallery);
}

loadGallery();

// Service log functionality
const form = document.getElementById("serviceForm");
const logTable = document.querySelector("#logTable tbody");
const logKey = "kdsgarage_log";

form.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("serviceName").value;
  const date = document.getElementById("serviceDate").value;
  const cost = document.getElementById("serviceCost").value;

  const entry = { name, date, cost };
  addLogEntry(entry);
  saveLogEntry(entry);
  form.reset();
});

function addLogEntry(entry, index = null) {
  const row = logTable.insertRow();
  row.innerHTML = `
    <td>${entry.name}</td>
    <td>${entry.date}</td>
    <td>$${entry.cost}</td>
    <td><button onclick="removeEntry(${index})">❌</button></td>
  `;
}

function saveLogEntry(entry) {
  const log = JSON.parse(localStorage.getItem(logKey) || "[]");
  log.push(entry);
  localStorage.setItem(logKey, JSON.stringify(log));
  renderLog();
}

function removeEntry(index) {
  const log = JSON.parse(localStorage.getItem(logKey) || "[]");
  log.splice(index, 1);
  localStorage.setItem(logKey, JSON.stringify(log));
  renderLog();
}

function renderLog() {
  logTable.innerHTML = "";
  const log = JSON.parse(localStorage.getItem(logKey) || "[]");
  log.forEach((entry, i) => addLogEntry(entry, i));
}

renderLog();
