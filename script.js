document.addEventListener("DOMContentLoaded", function() {
  loadCSV(displayContent);
});

function loadCSV(callback) {
  fetch('data.csv')
    .then(response => response.text())
    .then(data => {
      const parsedData = parseCSV(data);
      callback(parsedData);
    })
    .catch(error => {
      console.error('Error loading CSV:', error);
      const errorMessage = document.createElement('p');
      errorMessage.textContent = 'Terjadi kesalahan saat memuat data. Silakan coba lagi nanti.';
      document.body.appendChild(errorMessage);
    });
}

function parseCSV(data) {
  const lines = data.split('\n');
  return lines.map(line => line.split(','));
}

function displayContent(data) {
  // Removing the header row
  data.shift();

  data.forEach(row => {
    const sectionId = row[0].toLowerCase().replace(/\s+/g, '-') + "-content";
    const element = document.getElementById(sectionId);

    if (element) {
      if (sectionId === "skills-content" || sectionId === "portfolio-content" || sectionId === "products-content") {
        const items = row[2].split(',').map(item => item.trim());
        element.innerHTML = '';
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
