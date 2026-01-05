document.getElementById('mostrarPass').addEventListener('click', function() {
    const pass = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');
    
    // cambia tipa de input
    const type = pass.getAttribute('type') === 'password' ? 'text' : 'password';
    pass.setAttribute('type', type);
    
    // cambia el icono del ojo
    eyeIcon.classList.toggle('bi-eye');
    eyeIcon.classList.toggle('bi-eye-slash');
});