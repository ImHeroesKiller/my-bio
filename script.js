document.addEventListener("DOMContentLoaded", function() {
  fetch('/api/sheets-data') // Mengambil data dari endpoint server proxy
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => displayContent(data))
    .catch(error => {
      console.error('Error fetching data:', error);
      // Tampilkan pesan kesalahan yang lebih informatif kepada pengguna (misalnya, menggunakan elemen HTML)
      const errorMessage = document.createElement('p');
      errorMessage.textContent = 'Terjadi kesalahan saat memuat data. Silakan coba lagi nanti.';
      document.body.appendChild(errorMessage);
    });
});

function displayContent(data) {
  data.forEach(row => {
    const sectionId = row[0].toLowerCase().replace(/\s+/g, '-') + "-content"; // Convert to lowercase and replace spaces with hyphens
    const element = document.getElementById(sectionId);

    if (element) {
      if (sectionId === "skills-content" || sectionId === "portfolio-content" || sectionId === "products-content") {
        const items = row[2].split(',').map(item => item.trim()); // Split by comma and trim whitespace
        element.innerHTML = ''; // Clear existing content
        items.forEach(subItem => {
          const li = document.createElement("li");
          li.textContent = subItem;
          element.appendChild(li);
        });
      } else {
        element.textContent = row[2];
      }
    }
  });
}

