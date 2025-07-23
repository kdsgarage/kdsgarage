const uploadInput = document.getElementById('imageUpload');
const gallery = document.getElementById('gallery');

// Load saved garage on page load
window.onload = () => {
  const savedImages = JSON.parse(localStorage.getItem('garageImages')) || [];
  if (savedImages.length > 0) {
    gallery.innerHTML = '';
    savedImages.forEach(dataUrl => addImageToGallery(dataUrl));
  }
};

uploadInput.addEventListener('change', event => {
  const files = event.target.files;
  if (!files.length) return;

  const savedImages = JSON.parse(localStorage.getItem('garageImages')) || [];

  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = function(e) {
      const dataUrl = e.target.result;
      savedImages.push(dataUrl);
      localStorage.setItem('garageImages', JSON.stringify(savedImages));
      addImageToGallery(dataUrl);
    };
    reader.readAsDataURL(file);
  });

  gallery.innerHTML = '';
});

function addImageToGallery(dataUrl) {
  const img = document.createElement('img');
  img.src = dataUrl;
  gallery.appendChild(img);
}

function clearGarage() {
  localStorage.removeItem('garageImages');
  gallery.innerHTML = '<p>No cars in your garage yet.</p>';
}