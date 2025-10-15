// Sesión de usuario en navbar - Legacy Frames
(function(){
  const KEY_SESION = 'legacyFramesSesion';
  function getSesion(){
    try{ const s = localStorage.getItem(KEY_SESION); return s? JSON.parse(s): null; }catch{ return null; }
  }
  function cerrarSesion(){ localStorage.removeItem(KEY_SESION); window.location.reload(); }

  document.addEventListener('DOMContentLoaded', () => {
    const area = document.getElementById('navbarAuthArea');
    if(!area) return;
    const sesion = getSesion();
    if(sesion){
      area.innerHTML = `
        <span class="me-2 small text-nowrap">Hola, ${sesion.nombre || ''}</span>
        <button id="btnCerrarSesion" class="btn btn-outline-danger btn-sm"><i class="fas fa-sign-out-alt me-1"></i>Salir</button>
      `;
      document.getElementById('btnCerrarSesion')?.addEventListener('click', cerrarSesion);
    }
  });
})();
