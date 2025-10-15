// Carrito de Compras - Legacy Frames
class CarritoCompras {
    constructor() {
        this.items = this.cargarCarrito();
        this.init();
    }

    init() {
        this.actualizarContador();
        this.mostrarCarrito();
        this.agregarEventListeners();
    }

    cargarCarrito() {
        const carrito = localStorage.getItem('legacyFramesCarrito');
        return carrito ? JSON.parse(carrito) : [];
    }

    guardarCarrito() {
        localStorage.setItem('legacyFramesCarrito', JSON.stringify(this.items));
    }

    agregarProducto(producto) {
        const existe = this.items.find(item => item.id === producto.id);
        if (existe) {
            existe.cantidad++;
        } else {
            this.items.push({ id: producto.id, nombre: producto.nombre, precio: parseInt(producto.precio), imagen: producto.imagen, cantidad: 1 });
        }
        this.guardarCarrito();
        this.actualizarContador();
        this.mostrarCarrito();
        this.mostrarNotificacion(`${producto.nombre} agregado al carrito`);
    }

    eliminarProducto(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.guardarCarrito();
        this.actualizarContador();
        this.mostrarCarrito();
    }

    actualizarCantidad(id, cantidad) {
        const item = this.items.find(item => item.id === id);
        if (!item) return;
        if (cantidad <= 0) { this.eliminarProducto(id); return; }
        item.cantidad = cantidad;
        this.guardarCarrito();
        this.actualizarContador();
        this.mostrarCarrito();
    }

    vaciarCarrito() {
        if (confirm('¿Estás seguro de vaciar el carrito?')) {
            this.items = [];
            this.guardarCarrito();
            this.actualizarContador();
            this.mostrarCarrito();
            this.mostrarNotificacion('Carrito vaciado');
        }
    }

    calcularTotal() { return this.items.reduce((t, i) => t + (i.precio * i.cantidad), 0); }
    contarItems() { return this.items.reduce((t, i) => t + i.cantidad, 0); }

    actualizarContador() {
        const contador = document.getElementById('contadorCarrito');
        if (!contador) return;
        const total = this.contarItems();
        if (total > 0) { contador.textContent = total; contador.classList.remove('d-none'); }
        else { contador.classList.add('d-none'); }
    }

    mostrarCarrito() {
        const carritoVacio = document.getElementById('carritoVacio');
        const carritoContenido = document.getElementById('carritoContenido');
        const itemsCarrito = document.getElementById('itemsCarrito');
        const totalCarrito = document.getElementById('totalCarrito');
        if (!carritoVacio || !carritoContenido) return;

        if (this.items.length === 0) {
            carritoVacio.classList.remove('d-none');
            carritoContenido.classList.add('d-none');
            return;
        }
        carritoVacio.classList.add('d-none');
        carritoContenido.classList.remove('d-none');
        itemsCarrito.innerHTML = this.items.map(item => `
            <div class="carrito-item mb-3 p-3 border rounded">
                <div class="row align-items-center">
                    <div class="col-3">
                        <img src="${item.imagen}" alt="${item.nombre}" class="img-fluid rounded" style="max-height: 60px; object-fit: cover;">
                    </div>
                    <div class="col-9">
                        <h6 class="mb-1">${item.nombre}</h6>
                        <p class="mb-2 text-muted small">$${item.precio.toLocaleString()}</p>
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="input-group" style="width: 120px;">
                                <button class="btn btn-outline-secondary btn-sm cantidad-btn" data-id="${item.id}" data-accion="restar">-</button>
                                <input type="text" class="form-control form-control-sm text-center" value="${item.cantidad}" readonly>
                                <button class="btn btn-outline-secondary btn-sm cantidad-btn" data-id="${item.id}" data-accion="sumar">+</button>
                            </div>
                            <button class="btn btn-outline-danger btn-sm eliminar-item" data-id="${item.id}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                        <small class="text-muted">Subtotal: $${(item.precio * item.cantidad).toLocaleString()}</small>
                    </div>
                </div>
            </div>
        `).join('');
        totalCarrito.textContent = this.calcularTotal().toLocaleString();
    }

    mostrarNotificacion(mensaje) {
        const toast = document.createElement('div');
        toast.className = 'toast align-items-center text-white bg-success border-0 position-fixed';
        toast.style.cssText = 'top: 20px; right: 20px; z-index: 9999;';
        toast.setAttribute('role', 'alert');
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    <i class="fas fa-check-circle me-2"></i>${mensaje}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;
        document.body.appendChild(toast);
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        toast.addEventListener('hidden.bs.toast', () => toast.remove());
    }

    agregarEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('agregar-carrito') || e.target.closest('.agregar-carrito')) {
                const btn = e.target.closest('.agregar-carrito');
                const producto = { id: btn.dataset.id, nombre: btn.dataset.nombre, precio: btn.dataset.precio, imagen: btn.dataset.imagen };
                this.agregarProducto(producto);
            }
            if (e.target.classList.contains('cantidad-btn')) {
                const id = e.target.dataset.id;
                const accion = e.target.dataset.accion;
                const item = this.items.find(i => i.id === id);
                if (!item) return;
                const nueva = accion === 'sumar' ? item.cantidad + 1 : item.cantidad - 1;
                this.actualizarCantidad(id, nueva);
            }
            if (e.target.classList.contains('eliminar-item') || e.target.closest('.eliminar-item')) {
                const id = (e.target.closest('.eliminar-item')).dataset.id;
                this.eliminarProducto(id);
            }
            if (e.target.id === 'vaciarCarrito') this.vaciarCarrito();
            if (e.target.id === 'procederCompra') this.procederCompra();
        });
    }

    procederCompra() {
        if (this.items.length === 0) { alert('Tu carrito está vacío'); return; }
        const total = this.calcularTotal();
        const resumen = this.items.map(i => `${i.nombre} (x${i.cantidad}): $${(i.precio*i.cantidad).toLocaleString()}`).join('\n');
        const mensaje = `Resumen de tu compra:\n\n${resumen}\n\nTotal: $${total.toLocaleString()}\n\n¿Proceder con el pago?`;
        if (confirm(mensaje)) {
            alert('Redirigiendo al proceso de pago...');
            // window.location.href = 'checkout.html';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => { window.carrito = new CarritoCompras(); });
