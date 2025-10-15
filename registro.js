<<<<<<< HEAD
// Variable global para almacenar los usuarios
let usuarios = [];
/*Cargar usuarios existentes desde localStorage al cargar la página*/
=======
// Sistema de registro simple - Solo localStorage, sin archivos JSON

// Variable global para almacenar los usuarios
let usuarios = [];

/**
 * Cargar usuarios existentes desde localStorage al cargar la página
 */
>>>>>>> 00f51a31421b63c99f483961f43b6c7ce866a138
function cargarUsuarios() {
    const usuariosGuardados = localStorage.getItem('legacyFramesUsuarios');
    if (usuariosGuardados) {
        usuarios = JSON.parse(usuariosGuardados);
    }
    console.log('Usuarios cargados:', usuarios.length);
}
<<<<<<< HEAD
/*Guardar usuarios en localStorage*/
=======

/**
 * Guardar usuarios en localStorage
 */
>>>>>>> 00f51a31421b63c99f483961f43b6c7ce866a138
function guardarUsuarios() {
    localStorage.setItem('legacyFramesUsuarios', JSON.stringify(usuarios));
    console.log('Usuarios guardados en localStorage');
}
<<<<<<< HEAD
/*Validar si el email ya existe*/
function emailExiste(email) {
    return usuarios.some(usuario => usuario.email.toLowerCase() === email.toLowerCase());
}
/*Validar contraseña en tiempo real*/
=======

/**
 * Validar si el email ya existe
 */
function emailExiste(email) {
    return usuarios.some(usuario => usuario.email.toLowerCase() === email.toLowerCase());
}

/**
 * Validar contraseña en tiempo real
 */
>>>>>>> 00f51a31421b63c99f483961f43b6c7ce866a138
function validarPassword(password) {
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password)
    };

    // Actualizar indicadores visuales
    document.getElementById('req-length').className = requirements.length ? 'requirement valid' : 'requirement invalid';
    document.getElementById('req-uppercase').className = requirements.uppercase ? 'requirement valid' : 'requirement invalid';
    document.getElementById('req-lowercase').className = requirements.lowercase ? 'requirement valid' : 'requirement invalid';
    document.getElementById('req-number').className = requirements.number ? 'requirement valid' : 'requirement invalid';

    return Object.values(requirements).every(req => req === true);
}
<<<<<<< HEAD
/*Validar que las contraseñas coincidan*/
=======

/**
 * Validar que las contraseñas coincidan
 */
>>>>>>> 00f51a31421b63c99f483961f43b6c7ce866a138
function validarConfirmacionPassword() {
    const password = document.getElementById('password').value;
    const confirmarPassword = document.getElementById('confirmarPassword').value;
    const input = document.getElementById('confirmarPassword');

    if (confirmarPassword && password !== confirmarPassword) {
        input.setCustomValidity('Las contraseñas no coinciden');
        return false;
    } else {
        input.setCustomValidity('');
        return true;
    }
}
<<<<<<< HEAD
/*Validar email único*/
=======

/**
 * Validar email único
 */
>>>>>>> 00f51a31421b63c99f483961f43b6c7ce866a138
function validarEmailUnico() {
    const email = document.getElementById('email').value;
    const input = document.getElementById('email');

    if (email && emailExiste(email)) {
        input.setCustomValidity('Este correo electrónico ya está registrado');
        return false;
    } else {
        input.setCustomValidity('');
        return true;
    }
}

<<<<<<< HEAD
/*Registrar nuevo usuario*/
=======
/**
 * Registrar nuevo usuario
 */
>>>>>>> 00f51a31421b63c99f483961f43b6c7ce866a138
function registrarUsuario(datosUsuario) {
    const nuevoUsuario = {
        id: Date.now(), // ID único basado en timestamp
        nombre: datosUsuario.nombre,
        apellido: datosUsuario.apellido,
        email: datosUsuario.email.toLowerCase(),
        telefono: datosUsuario.telefono || '',
        direccion: datosUsuario.direccion || '',
        password: datosUsuario.password, // En producción, esto debería estar hasheado
        newsletter: datosUsuario.newsletter,
        fechaRegistro: new Date().toISOString(),
        activo: true
    };

    usuarios.push(nuevoUsuario);
    guardarUsuarios();
    
    console.log('Usuario registrado:', nuevoUsuario);
    return nuevoUsuario;
}

<<<<<<< HEAD
/*Mostrar mensaje de éxito*/
=======
/**
 * Mostrar mensaje de éxito
 */
>>>>>>> 00f51a31421b63c99f483961f43b6c7ce866a138
function mostrarExito() {
    document.getElementById('formularioRegistro').style.display = 'none';
    document.getElementById('alertExito').style.display = 'block';
    
    // Redirigir después de 3 segundos
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 3000);
}

<<<<<<< HEAD
/*Mostrar spinner de carga*/
=======
/**
 * Mostrar spinner de carga
 */
>>>>>>> 00f51a31421b63c99f483961f43b6c7ce866a138
function mostrarCargando(mostrar) {
    const boton = document.querySelector('button[type="submit"]');
    const spinner = boton.querySelector('.spinner-border');
    
    if (mostrar) {
        boton.disabled = true;
        spinner.classList.remove('d-none');
        boton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Creando cuenta...';
    } else {
        boton.disabled = false;
        spinner.classList.add('d-none');
        boton.innerHTML = 'Crear Cuenta';
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de registro cargada');
    cargarUsuarios();

    const formulario = document.getElementById('formularioRegistro');
    const passwordInput = document.getElementById('password');
    const confirmarPasswordInput = document.getElementById('confirmarPassword');
    const emailInput = document.getElementById('email');

    // Validación de contraseña en tiempo real
    passwordInput.addEventListener('input', function() {
        validarPassword(this.value);
        if (confirmarPasswordInput.value) {
            validarConfirmacionPassword();
        }
    });

    // Validación de confirmación de contraseña
    confirmarPasswordInput.addEventListener('input', validarConfirmacionPassword);

    // Validación de email único
    emailInput.addEventListener('blur', validarEmailUnico);

    // Envío del formulario
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();

        // Validaciones adicionales
        const passwordValida = validarPassword(passwordInput.value);
        const passwordsCoinciden = validarConfirmacionPassword();
        const emailUnico = validarEmailUnico();

        if (!passwordValida) {
            passwordInput.setCustomValidity('La contraseña no cumple los requisitos');
        } else {
            passwordInput.setCustomValidity('');
        }

        // Verificar validez del formulario
        if (formulario.checkValidity() && passwordValida && passwordsCoinciden && emailUnico) {
            mostrarCargando(true);

            // Simular delay de registro
            setTimeout(() => {
                const formData = new FormData(formulario);
                const datosUsuario = {
                    nombre: formData.get('nombre'),
                    apellido: formData.get('apellido'),
                    email: formData.get('email'),
                    telefono: formData.get('telefono'),
                    direccion: formData.get('direccion'),
                    password: formData.get('password'),
                    newsletter: formData.has('newsletter')
                };

                try {
                    registrarUsuario(datosUsuario);
                    mostrarCargando(false);
                    mostrarExito();
                } catch (error) {
                    mostrarCargando(false);
                    alert('Error al registrar usuario. Por favor intenta nuevamente.');
                    console.error('Error:', error);
                }
            }, 1500);
        }

        formulario.classList.add('was-validated');
    });

    document.getElementById('telefono').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, ''); // Solo números
        
        if (value.startsWith('56')) {
            // Formato chileno: +56 9 1234 5678
            if (value.length <= 11) {
                value = value.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '+$1 $2 $3 $4');
            }
        }
        
        e.target.value = value;
    });
});
