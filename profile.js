const fileInput = document.getElementById('fileInput');
const profileImage = document.getElementById('profile-image');

if (fileInput && profileImage) {
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      profileImage.style.backgroundImage = `url('${reader.result}')`;
    };
    reader.readAsDataURL(file);
  });
}


const editBtn = document.getElementById('editBtn');
const inputs = document.querySelectorAll('#profileForm input');
let editing = false;

if (editBtn && inputs.length > 0) {
  editBtn.addEventListener('click', () => {
    editing = !editing;

    inputs.forEach(input => {
      input.disabled = !editing;
    });

    editBtn.textContent = editing ? 'Guardar cambios' : 'Editar perfil';

    if (!editing) {
      alert('Cambios guardados');
    }
  });
}
