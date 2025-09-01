const map = L.map('map').setView([13.7034, -89.2182], 12);
  
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

L.marker([13.7034, -89.2182]).addTo(map)
  .bindPopup('San Salvador')
  .openPopup();

document.addEventListener('DOMContentLoaded', function () {
    const currentPath = window.location.pathname.split('/').pop();
    const links = document.querySelectorAll('aside nav a');

    links.forEach(link => {
      const linkPath = link.getAttribute('href');

      if (linkPath === currentPath) {
        link.classList.add('text-purple-300');
      }
    });
  });

  const searchInput = document.getElementById('search-input');

  searchInput.addEventListener('keydown', async function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (!query) return;

      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
        const results = await response.json();

        if (results.length > 0) {
          const { lat, lon, display_name } = results[0];
          map.flyTo([lat, lon], 13);

          L.marker([lat, lon]).addTo(map)
            .bindPopup(`<strong>${display_name}</strong>`)
            .openPopup();
        } else {
          alert('Location not found.');
        }
      } catch (error) {
        console.error('Geocoding error:', error);
        alert('There was a problem searching for the location.');
      }
    }
  });

