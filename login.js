// Lógica de Inicio de Sesión - Legacy Frames
(function(){
  const KEY_USUARIOS = 'legacyFramesUsuarios';
  const KEY_SESION = 'legacyFramesSesion';

  function cargarUsuarios(){
    try {
      const data = localStorage.getItem(KEY_USUARIOS);
      return data ? JSON.parse(data) : [];
    } catch(e){
      console.error('Error leyendo usuarios:', e);
      return [];
    }
  }

  function guardarSesion(sesion){
    localStorage.setItem(KEY_SESION, JSON.stringify(sesion));
  }

  function iniciarSesion(email, password){
    const usuarios = cargarUsuarios();
    const usuario = usuarios.find(u => u.email && u.email.toLowerCase() === String(email).toLowerCase());
    if(!usuario) return { ok:false, msg:'Usuario no encontrado' };
    if(usuario.password !== password) return { ok:false, msg:'Contraseña incorrecta' };
    const sesion = {
      id: usuario.id,
      email: usuario.email,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      inicio: new Date().toISOString(),
      recordar: !!document.getElementById('recordarme')?.checked
    };
    guardarSesion(sesion);
    return { ok:true, usuario: sesion };
  }

  function mostrarCargando(mostrar){
    const btn = document.querySelector('#formLogin button[type="submit"]');
    const spinner = document.getElementById('spinnerLogin');
    if(!btn || !spinner) return;
    if(mostrar){
      btn.disabled = true;
      spinner.classList.remove('d-none');
    } else {
      btn.disabled = false;
      spinner.classList.add('d-none');
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formLogin');
    const alerta = document.getElementById('alertLogin');
    const bienvenida = document.getElementById('alertBienvenida');
    if(!form) return;

    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      if(!form.checkValidity()){
        form.classList.add('was-validated');
        return;
      }
      mostrarCargando(true);
      const email = document.getElementById('loginEmail').value.trim();
      const pass = document.getElementById('loginPassword').value;

      setTimeout(() => {
        const res = iniciarSesion(email, pass);
        mostrarCargando(false);
        if(res.ok){
          alerta?.classList.add('d-none');
          bienvenida?.classList.remove('d-none');
          // Redirigir a inicio (empresa)
          setTimeout(() => { window.location.href = 'Login.html'; }, 1500);
        } else {
          bienvenida?.classList.add('d-none');
          alerta.textContent = res.msg || 'Correo o contraseña incorrectos.';
          alerta.classList.remove('d-none');
        }
      }, 800);
    });
  });
})();
