// ==========================================
// RELOJ CON FECHA Y HORA (Requerimiento 1)
// ==========================================

function actualizarReloj() {
    const ahora = new Date();
    
    // Extraer fecha
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    const diaSemana = dias[ahora.getDay()];
    const dia = ahora.getDate();
    const mes = meses[ahora.getMonth()];
    const año = ahora.getFullYear();
    
    // Extraer hora
    let horas = ahora.getHours();
    let minutos = ahora.getMinutes();
    let segundos = ahora.getSeconds();
    
    // Agregar cero a la izquierda
    horas = horas < 10 ? '0' + horas : horas;
    minutos = minutos < 10 ? '0' + minutos : minutos;
    segundos = segundos < 10 ? '0' + segundos : segundos;
    
    // Formato: "Lunes, 12 de Abril de 2026 - 14:35:08"
    const fechaString = `${diaSemana}, ${dia} de ${mes} de ${año}`;
    const tiempoString = `${horas}:${minutos}:${segundos}`;
    
    document.getElementById('reloj').textContent = `${fechaString} - ${tiempoString}`;

    // Actualizar ambos relojes
    const relojDesktop = document.getElementById('reloj');
    const relojMovil = document.getElementById('reloj-movil');
    const textoReloj = `${fechaString} - ${tiempoString}`;
    
    if (relojDesktop) relojDesktop.textContent = textoReloj;
    if (relojMovil) relojMovil.textContent = textoReloj;
}

// Iniciar reloj inmediatamente y actualizar cada segundo
actualizarReloj();
setInterval(actualizarReloj, 1000);

// === DATOS DE EJEMPLO ===
let articulos = [
    {
        id: 1,
        seccion: 'inicio',
        titulo: 'Nueva tecnología revoluciona el mercado',
        categoria: 'Tecnología',
        descripcion: 'Un avance significativo en inteligencia artificial promete cambiar la forma en que interactuamos con los dispositivos. Expertos aseguran que esta innovación llegó para quedarse.',
        fecha: new Date('2026-04-10'),
        fuente: 'TechDaily'
    },
    {
        id: 2,
        seccion: 'deportes',
        titulo: 'Equipo local gana campeonato nacional',
        categoria: 'Fútbol',
        descripcion: 'En un emocionante partido, el equipo local se coronó campeón tras vencer al favorito 2-1 en tiempo extra. La celebración duró toda la noche.',
        fecha: new Date('2026-04-12'),
        fuente: 'DeportesHoy'
    },
    {
        id: 3,
        seccion: 'negocios',
        titulo: 'Mercado financiero muestra recuperación',
        categoria: 'Economía',
        descripcion: 'Los índices bursátiles cerraron en alza esta semana, mostrando signos de recuperación económica tras meses de incertidumbre.',
        fecha: new Date('2026-04-14'),
        fuente: 'FinanzasMundial'
    },
    {
        id: 4,
        seccion: 'inicio',
        titulo: 'Festival cultural este fin de semana',
        categoria: 'Cultura',
        descripcion: 'El parque central acogerá música, gastronomía y arte local durante tres días de celebración. Entrada gratuita para toda la familia.',
        fecha: new Date('2026-04-13'),
        fuente: 'CulturaViva'
    },
    {
        id: 5,
        seccion: 'deportes',
        titulo: 'Tenista chileno avanza en torneo internacional',
        categoria: 'Tenis',
        descripcion: 'Joven promesa del tenis nacional logró clasificar a cuartos de final en competencia ATP, superando al número 5 del mundo.',
        fecha: new Date('2026-04-11'),
        fuente: 'TennisPro'
    }
];

// === FUNCIONES PARA MOSTRAR ARTÍCULOS ===

function crearCardArticulo(articulo, esDestacado = false) {
    // Clases responsivas: móvil 1 col, tablet 2 col, escritorio 3 col
    const columnClasses = 'is-12-mobile is-6-tablet is-4-desktop';
    const titleClass = esDestacado ? 'is-5' : 'is-6';

    return `
        <div class="column ${columnClasses}">
            <div class="box articulo-card" onclick="abrirModal(${articulo.id})">
                <div class="content is-flex is-flex-direction-column" style="height: 100%;">
                    <span class="tag is-primary is-light mb-2">${articulo.categoria}</span>
                    <h3 class="title ${titleClass} mb-3">${articulo.titulo}</h3>
                    <p class="subtitle is-6" style="flex-grow: 1;">${articulo.descripcion.substring(0, esDestacado ? 120 : 80)}${articulo.descripcion.length > (esDestacado ? 120 : 80) ? '...' : ''}</p>
                    <div class="is-size-7 has-text-grey mt-auto">
                        <time datetime="${articulo.fecha.toISOString()}">${articulo.fecha.toLocaleDateString('es-ES')}</time>
                        ${articulo.fuente ? ` | <span>${articulo.fuente}</span>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderizarArticulos() {
    // Ordenar por fecha (más recientes primero)
    const ordenados = [...articulos].sort((a, b) => b.fecha - a.fecha);

    // Separar destacados (3 más recientes) y otros
    const destacados = ordenados.slice(0, 3);
    const otros = ordenados.slice(3);

    // Renderizar destacados
    const gridDestacados = document.getElementById('grid-destacados');
    if (gridDestacados) {
        gridDestacados.innerHTML = destacados.map(a => crearCardArticulo(a, true)).join('');
    }

    // Renderizar otros
    const gridOtros = document.getElementById('grid-otros');
    if (gridOtros) {
        if (otros.length > 0) {
            gridOtros.innerHTML = otros.map(a => crearCardArticulo(a, false)).join('');
        } else {
            gridOtros.innerHTML = '<div class="column is-12"><p class="has-text-grey">No hay más artículos disponibles.</p></div>';
        }
    }

    // Renderizar por secciones originales
    renderizarSeccion('inicio', articulos.filter(a => a.seccion === 'inicio'));
    renderizarSeccion('deportes', articulos.filter(a => a.seccion === 'deportes'));
    renderizarSeccion('negocios', articulos.filter(a => a.seccion === 'negocios'));
}

function renderizarSeccion(seccion, articulosSeccion) {
    const grid = document.getElementById(`grid-${seccion}`);
    const contador = document.getElementById(`contador-${seccion}`);

    if (grid) {
        if (articulosSeccion.length > 0) {
            grid.innerHTML = articulosSeccion.map(a => `
                <div class="column is-12-mobile is-6-tablet is-4-desktop">
                    <div class="box articulo-card" onclick="abrirModal(${a.id})">
                        <span class="tag is-primary is-light mb-2">${a.categoria}</span>
                        <h3 class="title is-6">${a.titulo}</h3>
                        <p class="is-size-7">${a.descripcion.substring(0, 80)}...</p>
                        <p class="is-size-7 has-text-grey mt-2">${a.fecha.toLocaleDateString('es-ES')}</p>
                    </div>
                </div>
            `).join('');
        } else {
            grid.innerHTML = '<div class="column is-12"><p class="has-text-grey">No hay artículos en esta sección.</p></div>';
        }
    }

    if (contador) {
        contador.textContent = articulosSeccion.length;
    }
}

// === MODAL ===
function abrirModal(id) {
    const articulo = articulos.find(a => a.id === id);
    if (!articulo) return;

    const modalTitulo = document.getElementById('modalTitulo');
    const modalContenido = document.getElementById('modalContenido');

    if (modalTitulo) modalTitulo.textContent = articulo.titulo;
    if (modalContenido) {
        modalContenido.innerHTML = `
            <div class="content">
                <span class="tag is-primary is-medium mb-3">${articulo.categoria}</span>
                <p class="is-size-5">${articulo.descripcion}</p>
                <hr>
                <div class="level is-mobile">
                    <div class="level-left">
                        <div class="level-item">
                            <p class="is-size-6 has-text-grey">
                                <strong>Publicado:</strong> ${articulo.fecha.toLocaleDateString('es-ES', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}
                            </p>
                        </div>
                    </div>
                    ${articulo.fuente ? `
                    <div class="level-right">
                        <div class="level-item">
                            <p class="is-size-6 has-text-grey"><strong>Fuente:</strong> ${articulo.fuente}</p>
                        </div>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    const modal = document.getElementById('modalArticulo');
    if (modal) modal.classList.add('is-active');
}

function cerrarModal() {
    const modal = document.getElementById('modalArticulo');
    if (modal) modal.classList.remove('is-active');
}

// === EVENT LISTENERS ===
document.addEventListener('DOMContentLoaded', () => {
    // Cerrar modal
    const closeModal = document.getElementById('closeModal');
    const closeModalFooter = document.getElementById('closeModalFooter');
    const modalBackground = document.querySelector('.modal-background');

    if (closeModal) closeModal.addEventListener('click', cerrarModal);
    if (closeModalFooter) closeModalFooter.addEventListener('click', cerrarModal);
    if (modalBackground) modalBackground.addEventListener('click', cerrarModal);

    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') cerrarModal();
    });

    // Formulario agregar artículo
    const btnMostrarForm = document.getElementById('btnMostrarFormArticulo');
    const btnCancelar = document.getElementById('btnCancelarForm');
    const formulario = document.getElementById('formularioArticulo');
    const form = document.getElementById('formNuevoArticulo');

    if (btnMostrarForm && formulario) {
        btnMostrarForm.addEventListener('click', () => {
            formulario.style.display = formulario.style.display === 'none' ? 'block' : 'none';
        });
    }

    if (btnCancelar && formulario) {
        btnCancelar.addEventListener('click', () => {
            formulario.style.display = 'none';
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const nuevoArticulo = {
                id: articulos.length + 1,
                seccion: document.getElementById('seccionArticulo').value,
                titulo: document.getElementById('tituloArticulo').value,
                categoria: document.getElementById('categoriaArticulo').value,
                descripcion: document.getElementById('descripcionArticulo').value,
                fuente: document.getElementById('fuenteArticulo').value,
                fecha: new Date()
            };

            articulos.push(nuevoArticulo);
            renderizarArticulos();

            form.reset();
            if (formulario) formulario.style.display = 'none';

            alert('¡Artículo publicado con éxito!');
        });
    }

    // Formulario contacto
    const btnMostrarContacto = document.getElementById('btnMostrarContacto');
    const formContacto = document.getElementById('formularioContacto');

    if (btnMostrarContacto && formContacto) {
        btnMostrarContacto.addEventListener('click', () => {
            formContacto.style.display = formContacto.style.display === 'none' ? 'block' : 'none';
        });
    }

    if (formContacto) {
        formContacto.addEventListener('submit', (e) => {
            e.preventDefault();
            const mensajeConfirmacion = document.getElementById('mensajeConfirmacion');
            if (mensajeConfirmacion) {
                mensajeConfirmacion.textContent = '¡Mensaje enviado correctamente! Te contactaremos pronto.';
            }
            setTimeout(() => {
                formContacto.reset();
                formContacto.style.display = 'none';
                if (mensajeConfirmacion) mensajeConfirmacion.textContent = '';
            }, 3000);
        });
    }

    // Menú hamburguesa
    const navbarBurger = document.querySelector('.navbar-burger');
    const navbarMenu = document.getElementById('navMenu');

    if (navbarBurger && navbarMenu) {
        navbarBurger.addEventListener('click', () => {
            navbarBurger.classList.toggle('is-active');
            navbarMenu.classList.toggle('is-active');
        });
    }

    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Cerrar menú móvil
                if (navbarMenu && navbarMenu.classList.contains('is-active')) {
                    navbarMenu.classList.remove('is-active');
                    navbarBurger.classList.remove('is-active');
                }
            }
        });
    });

    // Renderizar artículos iniciales
    renderizarArticulos();
});
