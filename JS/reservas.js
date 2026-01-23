document.addEventListener('DOMContentLoaded', function () {

    const API_URL = 'http://localhost:8080';

    flatpickr.localize(flatpickr.l10ns.es);

    let picker = flatpickr("#fechaReserva", {
        locale: "es",
        minDate: "today",
        maxDate: new Date().fp_incr(90),
        dateFormat: "d-m-Y",
        altInput: false,
        allowInput: false,
        disableMobile: false,


        // Germán
        onChange: function (selectedDates, dateStr) {
            const fechaInput = document.getElementById("fechaReserva");
            if (dateStr) {
                fechaInput.classList.remove("is-invalid");
                fechaInput.classList.add("is-valid");
            } else {
                fechaInput.classList.remove("is-valid");
                fechaInput.classList.add("is-invalid");
            }
        }
        // Germán

    });

    const nombreMascota = document.getElementById("nombreMascota");

    nombreMascota.addEventListener("focus", () => {
        setTimeout(() => {
            if (nombreMascota.value.trim().length >= 2) {
                nombreMascota.classList.remove("is-invalid");
                nombreMascota.classList.add("is-valid");
            }
        }, 50);
    });

    nombreMascota.addEventListener("input", () => {
        if (nombreMascota.value.trim().length >= 2) {
            nombreMascota.classList.add("is-valid");
            nombreMascota.classList.remove("is-invalid");
        } else {
            nombreMascota.classList.remove("is-valid");
        }
    });

    const btnReservar = document.getElementById('btnReservar');
    const inputNombreMascota = document.getElementById('nombreMascota');
    const inputTamanoMascota = document.getElementById('tamanoMascota');
    const inputNombreGroomer = document.getElementById('nombreGroomer');
    const inputNombreServicio = document.getElementById('nombreServicio');
    const inputFechaReserva = document.getElementById('fechaReserva');
    const inputHoraReserva = document.getElementById('horaReserva');

    btnReservar.addEventListener('click', function (e) {
        e.preventDefault();

        limpiarVal();

        const selectMascota = document.getElementById('nombreMascota');
        const selectTamano = document.getElementById('tamanoMascota');
        const selectGroomer = document.getElementById('nombreGroomer');
        const selectServicio = document.getElementById('nombreServicio');
        const inputFecha = document.getElementById('fechaReserva');
        const selectHora = document.getElementById('horaReserva');

        if (!selectMascota || !selectTamano || !selectGroomer || !selectServicio || !inputFecha || !selectHora) {
            return false;
        }

        const nombreMascota = selectMascota.value.trim();
        const tamanoMascota = selectTamano.value;
        const nombreGroomer = selectGroomer.value.trim();
        const nombreServicio = selectServicio.value.trim();
        const fechaReserva = inputFecha.value.trim();
        const horaReserva = selectHora.value.trim();

        if (nombreMascota === "" || nombreMascota === null) {
            mostrarVal('nombreMascota', 'Por favor selecciona una mascota');
            return false;
        }
        if (tamanoMascota === "") {
            mostrarVal('tamanoMascota', 'Por favor selecciona el tamaño de la mascota');
            return false;
        }
        if (nombreGroomer === "") {
            mostrarVal('nombreGroomer', 'Por favor selecciona un groomer');
            return false;
        }
        if (nombreServicio === "") {
            mostrarVal('nombreServicio', 'Por favor selecciona un servicio');
            return false;
        }
        if (fechaReserva === "") {
            mostrarVal('fechaReserva', 'Por favor selecciona una fecha para la reserva');
            return false;
        }

        if (horaReserva < "08:00" || horaReserva > "18:00" || horaReserva === "") {
            mostrarVal('horaReserva', 'Debe seleccionar una hora entre 08:00 AM y 06:00 PM');
            return false;
        }

        mostrarAlerta('exito', 'Todos los campos son válidos.');

    });

    function obtenerToken() {
        const jwtData = localStorage.getItem('jwt');
        if (jwtData) {
            try {
                const jwt = JSON.parse(jwtData);
                if (jwt.token) {
                    console.log('✅ Token obtenido de jwt.token');
                    return jwt.token;
                }
            } catch (e) {
                console.log('⚠️ jwt no es JSON, es token directo');
                return jwtData;
            }
        }

        const tokenDirecto = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (tokenDirecto) {
            console.log('✅ Token obtenido de token directo');
            return tokenDirecto;
        }

        console.log('❌ No se encontró token');
        return null;
    }

    async function fetchAutenticado(url, options = {}) {
        const token = obtenerToken();
        console.log('=== fetchAutenticado DEBUG ===');
        console.log('URL:', url);
        console.log('Token:', token ? 'PRESENTE' : 'AUSENTE');

        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(url, { ...options, headers });
            console.log('Response:', response.status, response.statusText);

            if (response.status === 403) {
                const text = await response.text();

            }

            return response;
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }

    function calcularHoraFinal(horaInicio) {
        const [horas, minutos] = horaInicio.split(':').map(Number);
        const horaFinal = new Date();
        horaFinal.setHours(horas + 2, minutos, 0);
        /*Germán*/
        /* Verificar si los campos del formulario son válidos antes de permitir su envío */
        const form = document.getElementById("formReserva");
        const fechaInput = document.getElementById("fechaReserva");

        fechaInput.classList.remove("is-valid", "is-invalid");

        fechaInput.classList.remove("is-valid");
        form.classList.remove("was-validated");

        // Forzar estado inválido si está vacía
        if (!fechaInput.value) {
            fechaInput.classList.remove("is-valid");
            fechaInput.classList.add("is-invalid");
        } else {
            fechaInput.classList.remove("is-invalid");
            fechaInput.classList.add("is-valid");
        }

        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            return;
        }

        /*Germán*/

        limpiarVal();
        const nombreMascota = document.getElementById('nombreMascota').value.trim();
        const tamanoMascota = document.getElementById('tamanoMascota').value.trim();
        const nombreGroomer = document.getElementById('nombreGroomer').value.trim();
        const nombreServicio = document.getElementById('nombreServicio').value.trim();
        const fechaReserva = document.getElementById('fechaReserva').value.trim();
        const horaReserva = document.getElementById('horaReserva').value.trim();

        if (nombreMascota.length < 2 || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombreMascota)) {
            mostrarVal('nombreMascota', 'El nombre de la mascota debe ser alfabético y mínimo dos caracteres');
            return false;
        }
        if (tamanoMascota === "") {
            mostrarVal('tamanoMascota', 'Por favor selecciona el tamaño de la mascota');
            return false;
        }
        if (nombreGroomer === "") {
            mostrarVal('nombreGroomer', 'Por favor selecciona un groomer');
            return false;
        }
        if (nombreServicio === "") {
            mostrarVal('nombreServicio', 'Por favor selecciona un servicio');
            return false;
        }

        if (fechaReserva === "") {
            mostrarVal('fechaReserva', 'Por favor selecciona una fecha para la reserva');
            return false;
        }

        if (horaReserva < "08:00" || horaReserva > "18:00" || horaReserva === "") {
            mostrarVal('horaReserva', 'Debe seleccionar una hora entre 08:00 AM y 06:00 PM');
            return false;
        }

        mostrarAlerta('success', '<strong>¡Éxito!</strong> Todos los campos son válidos. Enviando formulario...');

        setTimeout(() => {
            document.getElementById('formContactenos').submit();
        }, 1500);

        return `${horaFinal.getHours().toString().padStart(2, '0')}:${horaFinal.getMinutes().toString().padStart(2, '0')}:00`;
    }

    async function obtenerUsuarioId() {
        const usuarioIdStr = localStorage.getItem('usuarioId');
        if (usuarioIdStr && usuarioIdStr !== 'undefined' && usuarioIdStr !== 'null') {
            const id = parseInt(usuarioIdStr);
            if (!isNaN(id)) {
                console.log('✅ ID de localStorage:', id);
                return id;
            }
        }

        // 2. Intentar de usuarioActivo
        const usuarioActivoStr = localStorage.getItem('usuarioActivo');
        if (usuarioActivoStr) {
            try {
                const usuarioActivo = JSON.parse(usuarioActivoStr);
                if (usuarioActivo.idUsuario) {
                    console.log('✅ ID de usuarioActivo:', usuarioActivo.idUsuario);
                    return parseInt(usuarioActivo.idUsuario);
                }
            } catch (e) {
                console.error('Error parseando usuarioActivo:', e);
            }
        }

        // 3. Obtener del backend por email
        const jwtStr = localStorage.getItem('jwt');
        if (jwtStr) {
            try {
                const jwt = JSON.parse(jwtStr);
                if (jwt.usuario && jwt.usuario.email) {
                    console.log('🔍 Buscando usuario por email:', jwt.usuario.email);

                    // Usar el endpoint que acabamos de crear
                    const response = await fetchAutenticado(`${API_URL}/usuarios/email/${encodeURIComponent(jwt.usuario.email)}`);
                    if (response.ok) {
                        const usuario = await response.json();
                        if (usuario && usuario.idUsuario) {
                            console.log('✅ Usuario obtenido del backend, ID:', usuario.idUsuario);
                            // Guardar para futuras consultas
                            localStorage.setItem('usuarioId', usuario.idUsuario.toString());
                            return usuario.idUsuario;
                        }
                    } else {
                        const responseLista = await fetchAutenticado(`${API_URL}/usuarios`);
                        if (responseLista.ok) {
                            const usuarios = await responseLista.json();
                            const usuarioEncontrado = usuarios.find(u => u.email === jwt.usuario.email);
                            if (usuarioEncontrado && usuarioEncontrado.idUsuario) {
                                localStorage.setItem('usuarioId', usuarioEncontrado.idUsuario.toString());
                                return usuarioEncontrado.idUsuario;
                            }
                        }
                    }
                }
            } catch (e) {
                console.error('Error obteniendo usuario:', e);
            }
        }

        console.log('No se pudo obtener idUsuario');
        return null;
    }

    async function obtenerUsuarioIdPorEmail(email) {
        try {
            const response = await fetchAutenticado(`${API_URL}/usuarios/email/${email}`);
            if (response.ok) {
                const usuario = await response.json();
                return usuario.idUsuario;
            }
            return null;
        } catch (error) {
            console.error('Error obteniendo usuario por email:', error);
            return null;
        }
    }
    // Germán
    function mostrarVal(id) {
        const field = document.getElementById(id);
        field.classList.add('is-invalid');
    }

    function limpiarVal() {
        document.querySelectorAll('.error-message').forEach(error => error.remove());
        document.querySelectorAll('.is-invalid').forEach(field => field.classList.remove('is-invalid'));
        document.querySelectorAll('.is-valid').forEach(field => field.classList.remove('is-valid'));
    }
    // Germán

    async function obtenerMascotasUsuario(usuarioId) {
        try {
            const response = await fetchAutenticado(`${API_URL}/mascotas/usuario/${usuarioId}`);
            if (response.ok) {
                return await response.json();
            }
            return [];
        } catch (error) {
            console.error('Error obteniendo mascotas:', error);
            return [];
        }
    }

    async function cargarMascotasUsuario() {
        const usuarioId = await obtenerUsuarioId();
        if (!usuarioId) {
            return;
        }

        console.log('📡 Obteniendo mascotas...');
        const mascotas = await obtenerMascotasUsuario(usuarioId);
        console.log('📦 Mascotas obtenidas:', mascotas.length);

        if (mascotas.length === 0) {
            console.log('ℹ️ No hay mascotas para mostrar');
            return;
        }

        const formFloating = document.querySelector('.form-floating:has(#nombreMascota)');
        if (!formFloating) {
            console.log('❌ No se encontró contenedor form-floating');
            return;
        }

        let selectElement = document.getElementById('nombreMascota');

        if (!selectElement || selectElement.tagName !== 'SELECT') {
            console.log('⚠️ No hay SELECT válido, creando...');

            const newSelect = document.createElement('select');
            newSelect.id = 'nombreMascota';
            newSelect.name = 'nombreMascota';
            newSelect.className = 'form-select form-select-lg entrada';
            newSelect.required = true;

            if (selectElement) {
                selectElement.parentNode.replaceChild(newSelect, selectElement);
            } else {
                const label = formFloating.querySelector('label[for="nombreMascota"]');
                if (label) {
                    formFloating.insertBefore(newSelect, label);
                } else {
                    formFloating.appendChild(newSelect);
                }
            }

            selectElement = newSelect;
            console.log('✅ SELECT creado');
        }


        // 5. LIMPIAR Y AGREGAR OPCIONES
        console.log('🧹 Limpiando select...');
        selectElement.innerHTML = '<option value="" disabled selected></option>';

        console.log('➕ Agregando opciones de mascotas...');
        mascotas.forEach((mascota, index) => {
            const option = document.createElement('option');
            option.value = mascota.idMascota;
            option.textContent = mascota.nombreMascota;
            selectElement.appendChild(option);
            console.log(`   ${index + 1}. ${mascota.nombreMascota}`);
        });

        console.log('✅ Mascotas cargadas:', mascotas.length);
        console.log('✅ Select final:', selectElement);
        console.log('=== FIN cargarMascotasUsuario ===');

    }

    async function obtenerServicios() {
        try {
            const response = await fetch(`${API_URL}/servicio`);
            if (response.ok) {
                const servicios = await response.json();
                return servicios;
            } else {
                console.log('Error obteniendo servicios:', response.status);
                return [];
            }
        } catch (error) {
            console.error('Error en obtenerServicios:', error);
            return [];
        }
    }

    async function cargarServicios() {
        try {
            console.log('🔍 Iniciando cargarServicios...');

            const servicios = await obtenerServicios();
            console.log('📦 Servicios recibidos:', servicios);

            if (!servicios || servicios.length === 0) {
                console.warn('⚠️ No se recibieron servicios o el array está vacío');
                return;
            }

            const selectServicio = document.getElementById('nombreServicio');
            if (!selectServicio) {
                console.error('❌ Select de servicio no encontrado');
                return;
            }

            console.log('🧹 Limpiando select...');
            selectServicio.innerHTML = '<option value="" disabled selected></option>';

            console.log('➕ Agregando opciones...');
            servicios.forEach((servicio, index) => {
                console.log(`Servicio ${index}:`, servicio);

                const nombre = servicio.nombreServicio ||
                    servicio.nombre ||
                    servicio.descripcion ||
                    servicio.servicioNombre ||
                    `Servicio ${index + 1}`;

                const id = servicio.idServicio || servicio.id || index;

                console.log(`   -> ID: ${id}, Nombre: "${nombre}"`);

                const option = document.createElement('option');
                option.value = id;
                option.textContent = nombre;
                selectServicio.appendChild(option);
            });

            console.log('✅ Total opciones agregadas:', selectServicio.options.length);
            console.log('✅ HTML final:', selectServicio.innerHTML);

        } catch (error) {
            console.error('🚨 Error en cargarServicios:', error);
        }
    }

    async function obtenerGroomers() {
        try {
            console.log('📡 Obteniendo groomers...');

            // PRIMERO: Intentar con autenticación (para procesarReserva)
            const responseAuth = await fetchAutenticado(`${API_URL}/groomers`);
            console.log('🔐 Status con auth:', responseAuth.status);

            if (responseAuth.ok) {
                const data = await responseAuth.json();
                console.log('✅ Groomers con auth:', data.length);
                return data;
            }

            console.log('🔄 Intentando sin autenticación...');
            const response = await fetch(`${API_URL}/groomers`);
            console.log('🔓 Status sin auth:', response.status);

            if (response.ok) {
                const data = await response.json();
                console.log('✅ Groomers sin auth:', data.length);
                return data;
            }

            console.log('⚠️ API no responde, usando datos mock');
            return [
                { idGroomer: 1, nombre: 'Manuel', apellido: 'Miranda' },
                { idGroomer: 2, nombre: 'Jorge', apellido: 'González' },
                { idGroomer: 3, nombre: 'Sergio', apellido: 'Rincón' },
                { idGroomer: 4, nombre: 'Sandra', apellido: 'López' },
                { idGroomer: 5, nombre: 'Adriana', apellido: 'Ramírez' },
                { idGroomer: 6, nombre: 'Diana', apellido: 'Ortega' }
            ];

        } catch (error) {
            console.error('🚨 Error obtenerGroomers:', error);
            return [];
        }
    }

    async function cargarGroomers() {
        try {
            const groomers = await obtenerGroomers();
            console.log('📦 Groomers crudos:', groomers);

            const selectGroomer = document.getElementById('nombreGroomer');
            if (!selectGroomer) return;

            selectGroomer.innerHTML = '<option value="" disabled selected></option>';

            groomers.forEach((groomer, index) => {
                console.log(`➕ Groomer ${index}:`, {
                    id: groomer.idGroomer,
                    nombre: groomer.nombre,
                    apellido: groomer.apellido,
                    value: groomer.idGroomer,
                    text: `${groomer.nombre} ${groomer.apellido}`
                });

                const option = document.createElement('option');
                option.value = groomer.idGroomer;
                option.textContent = `${groomer.nombre} ${groomer.apellido}`;
                selectGroomer.appendChild(option);
            });

        } catch (error) {
            console.error('Error cargando groomers:', error);
        }
    }

    async function procesarReserva(datosReserva) {
        try {

            const usuarioId = await obtenerUsuarioId();
            if (!usuarioId) {
                mostrarAlerta('error', 'Debes iniciar sesión para hacer una reserva');
                return;
            }

            const mascotaId = datosReserva.nombreMascota;
            if (!mascotaId) {
                mostrarAlerta('error', 'Por favor selecciona una mascota');
                return;
            }

            const mascotas = await obtenerMascotasUsuario(usuarioId);
            if (mascotas.length === 0) {
                mostrarAlerta('error', 'No tienes mascotas registradas.');
                return;
            }

            const mascotaSeleccionada = mascotas.find(m => m.idMascota == mascotaId);
            if (!mascotaSeleccionada) {
                mostrarAlerta('error', 'No se encontró la mascota seleccionada.');
                return;
            }

            console.log('📡 Obteniendo groomers y servicios...');
            const [groomers, servicios] = await Promise.all([
                obtenerGroomers(),
                obtenerServicios()
            ]);

            console.log('📦 Groomers obtenidos:', groomers.length);
            console.log('📦 Servicios obtenidos:', servicios.length);

            const groomerSelect = document.getElementById('nombreGroomer');
            const servicioSelect = document.getElementById('nombreServicio');

            console.log('🎯 Groomer select value:', groomerSelect.value);
            console.log('🎯 Servicio select value:', servicioSelect.value);

            const groomerId = parseInt(groomerSelect.value);
            console.log('🔍 Buscando groomer ID:', groomerId);

            let groomerSeleccionado = null;

            groomerSeleccionado = groomers.find(g => g.idGroomer === groomerId);

            if (!groomerSeleccionado) {
                groomerSeleccionado = groomers.find(g => g.idGroomer == groomerId);
            }

            if (!groomerSeleccionado) {
                const textoSelect = groomerSelect.options[groomerSelect.selectedIndex]?.text;
                groomerSeleccionado = groomers.find(g =>
                    textoSelect === `${g.nombre} ${g.apellido}` ||
                    textoSelect.includes(g.nombre) ||
                    textoSelect.includes(g.apellido)
                );
            }

            if (!groomerSeleccionado) {
                console.error('❌ Groomer no encontrado');
                console.error('Valor buscado:', groomerId);
                console.error('Groomers disponibles:', groomers.map(g => ({
                    id: g.idGroomer,
                    nombre: `${g.nombre} ${g.apellido}`
                })));
                mostrarAlerta('error', 'No se encontró el groomer seleccionado');
                return;
            }

            console.log('✅ Groomer encontrado:', groomerSeleccionado);

            const servicioId = parseInt(servicioSelect.value);
            console.log('🔍 Buscando servicio ID:', servicioId);

            const servicioSeleccionado = servicios.find(s => s.idServicio == servicioId);

            if (!servicioSeleccionado) {
                console.error('❌ Servicio no encontrado');
                mostrarAlerta('error', 'No se encontró el servicio seleccionado');
                return;
            }

            console.log('✅ Servicio encontrado:', servicioSeleccionado);

            const [dia, mes, anio] = datosReserva.fechaReserva.split('-');
            const fechaFormateada = `${anio}-${mes}-${dia}`;

            const reservaData = {
                fecha: fechaFormateada,
                horaInicio: datosReserva.horaReserva + ":00",
                horaFinal: calcularHoraFinal(datosReserva.horaReserva),
                groomer: { idGroomer: groomerSeleccionado.idGroomer },
                servicio: { idServicio: servicioSeleccionado.idServicio },
                mascota: { idMascota: mascotaSeleccionada.idMascota }
            };

            console.log('📤 Enviando reserva:', reservaData);

            const response = await fetchAutenticado(`${API_URL}/reservas/crear`, {
                method: 'POST',
                body: JSON.stringify(reservaData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error: ${errorText}`);
            }

            const reservaGuardada = await response.json();
            console.log('✅ Reserva creada:', reservaGuardada);

            mostrarAlerta('exito', '¡Reserva creada exitosamente!');
            limpiarFormulario();
            await mostrarReservas();

        } catch (error) {
            console.error('🚨 Error en procesarReserva:', error);
            mostrarAlerta('error', error.message);
        }
    }

    async function mostrarReservas() {
        try {
            const usuarioId = await obtenerUsuarioId();
            if (!usuarioId) {
                console.log('No hay usuarioId');
                return;
            }

            console.log('🔍 Obteniendo reservas para usuario:', usuarioId);

            const reservas = await fetchAutenticado(`${API_URL}/reservas/usuario/${usuarioId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error ${response.status}: ${response.statusText}`);
                    }
                    return response.json();
                });

            console.log('📦 Reservas obtenidas (crudas):', reservas);

            if (!reservas || reservas.length === 0) {
                document.getElementById("servicio-reservado").innerHTML =
                    "<p class='text-muted'>No tienes reservas</p>";
                return;
            }

            console.log('🔄 Obteniendo datos de servicios, mascotas y groomers...');

            const servicioIds = [...new Set(reservas.map(r => r.servicio?.idServicio || r.idServicio).filter(Boolean))];
            const mascotaIds = [...new Set(reservas.map(r => r.mascota?.idMascota || r.idMascota).filter(Boolean))];
            const groomerIds = [...new Set(reservas.map(r => r.groomer?.idGroomer || r.idGroomer).filter(Boolean))];

            console.log('🔍 IDs a buscar:', { servicioIds, mascotaIds, groomerIds });

            const [servicios, mascotas, groomers] = await Promise.all([
                fetch(`${API_URL}/servicio`).then(r => r.ok ? r.json() : []),
                fetchAutenticado(`${API_URL}/mascotas/usuario/${usuarioId}`).then(r => r.ok ? r.json() : []),
                fetch(`${API_URL}/groomers`).then(r => r.ok ? r.json() : [])
            ]);

            console.log('📊 Datos obtenidos:', {
                servicios: servicios.length,
                mascotas: mascotas.length,
                groomers: groomers.length
            });

            const serviciosMap = new Map(servicios.map(s => [s.idServicio || s.id, s]));
            const mascotasMap = new Map(mascotas.map(m => [m.idMascota || m.id, m]));
            const groomersMap = new Map(groomers.map(g => [g.idGroomer || g.id, g]));

            console.log('🗺️ Mapas creados:', {
                servicios: serviciosMap.size,
                mascotas: mascotasMap.size,
                groomers: groomersMap.size
            });

            const contenedor = document.getElementById("servicio-reservado");
            contenedor.innerHTML = "";

            reservas.forEach(reserva => {
                console.log('🎴 Procesando reserva ID:', reserva.idReserva);

                // Obtener IDs de la reserva (soportar diferentes estructuras)
                const servicioId = reserva.servicio?.idServicio || reserva.idServicio || reserva.servicio;
                const mascotaId = reserva.mascota?.idMascota || reserva.idMascota || reserva.mascota;
                const groomerId = reserva.groomer?.idGroomer || reserva.idGroomer || reserva.groomer;

                console.log('🔍 IDs encontrados:', { servicioId, mascotaId, groomerId });

                const servicio = serviciosMap.get(Number(servicioId));
                const mascota = mascotasMap.get(Number(mascotaId));
                const groomer = groomersMap.get(Number(groomerId));

                console.log('🔍 Objetos encontrados:', { servicio, mascota, groomer });

                const servicioNombre = servicio?.nombre ||
                    servicio?.nombreServicio ||
                    `Servicio #${servicioId}`;

                const mascotaNombre = mascota?.nombreMascota ||
                    mascota?.nombre ||
                    `Mascota #${mascotaId}`;

                const mascotaTamano = mascota?.tamanoMascota ||
                    mascota?.tamano ||
                    'No especificado';

                const groomerNombre = groomer ?
                    `${groomer.nombre || ''} ${groomer.apellido || ''}`.trim() :
                    `Groomer #${groomerId}`;

                let fechaFormateada = reserva.fecha || '';
                if (fechaFormateada && fechaFormateada.includes('-')) {
                    const [anio, mes, dia] = fechaFormateada.split('-');
                    fechaFormateada = `${dia}-${mes}-${anio}`;
                }

                let horaFormateada = reserva.horaInicio || '';
                if (horaFormateada && horaFormateada.includes(':')) {
                    horaFormateada = horaFormateada.substring(0, 5);
                }

                console.log('📝 Datos para card:', {
                    servicio: servicioNombre,
                    mascota: mascotaNombre,
                    tamano: mascotaTamano,
                    groomer: groomerNombre,
                    fecha: fechaFormateada,
                    hora: horaFormateada
                });

                const card = document.createElement('reserva-card');
                card.setAttribute('nombreServicio', servicioNombre);
                card.setAttribute('nombreMascota', mascotaNombre);
                card.setAttribute('tamanoMascota', mascotaTamano);
                card.setAttribute('nombreGroomer', groomerNombre);
                card.setAttribute('fechaReserva', fechaFormateada);
                card.setAttribute('horaReserva', horaFormateada);
                card.setAttribute('idReserva', reserva.idReserva);
                contenedor.appendChild(card);
            });

            console.log('✅ Total cards creadas:', reservas.length);

        } catch (error) {
            const contenedor = document.getElementById("servicio-reservado");
            contenedor.innerHTML = `
            <div class="alert alert-warning">
                <strong>Atención:</strong> No se pudieron cargar las reservas. 
                <small>${error.message}</small>
            </div>
        `;
        }
    }

    document.addEventListener('click', async function (e) {
        const botonEliminar = e.target.closest('.eliminar-reserva');

        if (!botonEliminar) return;

        e.preventDefault();
        const idReserva = parseInt(botonEliminar.dataset.id);

        if (!idReserva) {
            console.error('ID de reserva no encontrado');
            return;
        }

        const confirmacion = await mostrarAlerta('confirmar',
            '¿Eliminar esta reserva?<br><small>¡Esta acción no se puede deshacer!</small>', {
            botonConfirmar: 'Sí, eliminar'
        });

        if (!confirmacion.isConfirmed) return;

        try {
            const response = await fetchAutenticado(`${API_URL}/reservas/eliminar/${idReserva}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error del servidor: ${errorText}`);
            }

            const resultado = await response.text();
            console.log('Respuesta eliminación:', resultado);

            const card = botonEliminar.closest('reserva-card');
            if (card) {

                card.style.opacity = '0';
                card.style.transform = 'translateY(-20px)';
                card.style.transition = 'all 0.3s ease';

                setTimeout(() => {
                    card.remove();

                    const contenedor = document.getElementById('servicio-reservado');
                    const cardsRestantes = contenedor.querySelectorAll('reserva-card').length;

                    if (cardsRestantes === 0) {
                        contenedor.innerHTML = '<p class="text-muted">No tienes reservas</p>';
                    }
                }, 300);
            }

            mostrarAlerta('exito', 'La reserva ha sido eliminada correctamente.');

        } catch (error) {
            console.error('Error al eliminar reserva:', error);
            mostrarAlerta('error', `Error al eliminar la reserva: ${error.message}`);
        }
    });

    // function mostrarVal(id, mensaje) {
    //     const field = document.getElementById(id);
    //     const formFloating = field.closest('.form-floating');

    //     const errorElement = document.createElement('div');
    //     errorElement.className = 'error-message text-danger mt-1 small';
    //     errorElement.textContent = mensaje;

    //     formFloating.appendChild(errorElement);

    //     field.classList.add('is-invalid');
    // }

    // function limpiarVal() {
    //     document.querySelectorAll('.error-message').forEach(error => error.remove());
    //     document.querySelectorAll('.is-invalid').forEach(field => field.classList.remove('is-invalid'));
    // }

    function mostrarAlerta(tipo, mensaje, opciones = {}) {
        if (opciones.campoId) {
            const field = document.getElementById(opciones.campoId);
            if (!field) return;
            const formFloating = field.closest('.form-floating');
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message text-danger mt-1 small';
            errorElement.textContent = mensaje;
            formFloating.appendChild(errorElement);
            field.classList.add('is-invalid');
            return;
        }

        if (tipo === 'confirmar') {
            return Swal.fire({
                icon: 'warning',
                title: '¿Confirmar?',
                html: mensaje,
                showCancelButton: true,
                confirmButtonColor: '#e97502',
                cancelButtonColor: '#2ab7ae',
                confirmButtonText: opciones.botonConfirmar || 'Sí',
                cancelButtonText: 'Cancelar'
            });
        }

        const config = {
            html: mensaje,
            confirmButtonColor: '#e97502'
        };

        if (tipo === 'exito') {
            config.icon = 'success';
            config.title = '¡Éxito!';
            config.timer = opciones.duracion || 2000;
            config.showConfirmButton = false;
            config.timerProgressBar = true;
        } else if (tipo === 'error') {
            config.icon = 'error';
            config.title = 'Error';
            config.confirmButtonText = 'Entendido';
        } else if (tipo === 'info') {
            config.icon = 'info';
            config.title = 'Información';
        }

        if (opciones.titulo) config.title = opciones.titulo;

        Swal.fire(config);
    }

    async function probarConexionBackend() {
        try {
            console.log('Probando conexión con el backend...');

            const response = await fetch(`${API_URL}/servicio`);
            console.log('Servicios disponibles:', response.ok ? 'CONECTADO' : 'ERROR');


            const token = obtenerToken();
            console.log('Token disponible:', token ? 'SÍ' : 'NO');

            if (token) {
                const usuarioId = await obtenerUsuarioId();
                console.log('Usuario ID:', usuarioId);
            }

        } catch (error) {
            console.error('Error en prueba de conexión:', error);
        }
    }

    function limpiarFormulario() {
        document.getElementById("formReserva").reset();
    }

    probarConexionBackend();
    cargarMascotasUsuario();
    cargarGroomers();
    cargarServicios();
    mostrarReservas();

});

function nuevaReserva() {
    const seccion = document.getElementById("seccionReserva");
    seccion.classList.toggle("d-none");

    seccion.scrollIntoView({ behavior: "smooth" });
}


function limpiarFormulario() {
    document.getElementById("formReserva").reset();
}

mostrarReservas();


// Germán
// Mostrar check en el campo nombreMascota al seleccionar opción en caché
document.addEventListener("DOMContentLoaded", () => {

});
// Germán
