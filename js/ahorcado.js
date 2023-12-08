

    let letrasPresionadas = [];
    let palabraSecreta = '';
    let palabraAdivinada = '';
    let intentosDisponibles = 5;
    let juegosPerdidos  =   0;
    let juegosGanados  =   0;
    let isReady =   false;
    let categoria   =   'Profesiones';

    const palabrasDisponibles = {
        'Profesiones': ['DOCTOR', 'INGENIERO', 'COCINERO', 'ABOGADO', 'CHEF', 'DIPUTADO'],
        'Peliculas': ['AVENGERS', 'GODZILLA', 'EL GATO', 'EXTERMINIO'],
        'Colores': ['AZUL', 'ROJO', 'VERDE', 'MORADO', 'NEGRO', 'BLANCO', 'BLANCO' ]
    };


    $(document).ready(function () {
        iniciarComponentes();
    });

    function iniciarComponentes() {
        $('#btnIniciarJuego').on('click', function () {
            reiniciarJuego();
        });

        $('#asignarCategoria').on('click', function () {
            categoria = $('#selectCategoria').val();
            alert('Asignada');
            reiniciarJuego();
        });

        limipiarCanvasDibujo();
        iniciarLetras();
        iniciarJuego();
    }

    function reiniciarJuego() {
        letrasPresionadas = [];
        palabraSecreta = generarPalabraAleatoria().toUpperCase();
        palabraAdivinada = '_'.repeat(palabraSecreta.length);
        intentosDisponibles = 5;
        setIntentosDisponibles(5);
        actualizarPalabraSecreta();
        limipiarCanvasDibujo();
        iniciarLetras();
        isReady = true;
    }

    function iniciarJuego() {
        letrasPresionadas = [];
        palabraSecreta = generarPalabraAleatoria().toUpperCase();
        palabraAdivinada = '_'.repeat(palabraSecreta.length);
        intentosDisponibles = 5;
        setJuegosGanados(0);
        setJuegosPerdidos(0);
        setIntentosDisponibles(5);

        actualizarPalabraSecreta();
        limipiarCanvasDibujo();
        iniciarLetras();
    }

    function setIntentosDisponibles(intentosDisponibles) {

        $('#intentosDisponiblesElemnt').text(intentosDisponibles)
    }

    function limipiarCanvasDibujo() {
        const canvas = document.getElementById('canvasDibujo');
        const ctx = canvas.getContext('2d');

        // Reiniciar el canvas borrando todo el contenido
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
    }

    function actualizarCanvasAhorcado() {
        const canvas = document.getElementById('canvasDibujo');
        const ctx = canvas.getContext('2d');

        function dibujarBase(ctx) {
            const img = new Image();
            img.src = 'img/dibujo_base.png';
            img.onload = ev => {
                ctx.drawImage(img, 0, 0);
            };
        }

        function dibujarCabeza(ctx) {
            const img = new Image();
            img.src = 'img/dibujo_cabeza.png';
            img.onload = ev => {
                ctx.drawImage(img, 0, 0);
            };
        }

        function dibujarBrazos(ctx) {
            const img = new Image();
            img.src = 'img/dibujo_brazos.png';
            img.onload = ev => {
                ctx.drawImage(img, 0, 0);
            };
        }

        function dibujarPiernas(ctx) {
            const img = new Image();
            img.src = 'img/dibujo_piernas.png';
            img.onload = ev => {
                ctx.drawImage(img, 0, 0);
            };
        }

        function dibujarCuerpo(ctx) {
            const img = new Image();
            img.src = 'img/dibujo_cuerpo.png';
            img.onload = ev => {
                ctx.drawImage(img, 0, 0);
            };
        }

        // Dibujar el ahorcado según los intentos
        switch (intentosDisponibles) {
            case 4:
                dibujarBase(ctx);
                break;
            case 3:
                dibujarCabeza(ctx);
                break;
            case 2:
                dibujarBrazos(ctx);
                break;
            case 1:
                dibujarCuerpo(ctx);
                break;
            case 0:
                dibujarPiernas(ctx);
                break;
            default:
                break;
        }
    }


    function verificarFinJuego() {
        if (palabraAdivinada === palabraSecreta) {
            // El usuario ha adivinado la palabra
            juegosGanados += 1;
            setJuegosGanados(juegosGanados);
            $('.btn-letra').prop('disabled', true);

            $('#modalGanado').modal('show');

        } else if (intentos === intentosMaximos) {
            // El usuario ha perdido
            juegosPerdidos += 1;
            setJuegosPerdidos(juegosPerdidos);
            $('.btn-letra').prop('disabled', true);

            $('#modalPerdidoPS').text(palabraSecreta);
            $('#modalPerdido').modal('show');
            isReady =   false;
        }
    }

    function setJuegosGanados(juegosGanados) {
        $('#juegosGanadosElement').text(juegosGanados);
    }

    function setJuegosPerdidos(juegosPerdidos) {
        $('#juegosPerdidosElement').text(juegosPerdidos);
    }

    function verificarFinDeJuego() {
        if (palabraAdivinada === palabraSecreta) {
            // El usuario ha adivinado la palabra
            juegosGanados += 1;
            setJuegosGanados(juegosGanados);
            $('.btn-letra').prop('disabled', true);

            $('#modalGanado').modal('show');

        } else if (intentosDisponibles === 0) {
            // El usuario ha perdido
            juegosPerdidos += 1;
            setJuegosPerdidos(juegosPerdidos);
            $('.btn-letra').prop('disabled', true);

            $('#modalPerdidoPS').text(palabraSecreta);
            $('#modalPerdido').modal('show');

            isReady = false;
        }
    }

    function handleClickLetra(letra) {

        if (letrasPresionadas.includes(letra)){
            return;
        }

        if (palabraSecreta.includes(letra)){
            for (let i = 0; i < palabraSecreta.length; i++) {
                if (palabraSecreta[i] === letra) {
                    palabraAdivinada = palabraAdivinada.substring(0, i) + letra + palabraAdivinada.substring(i + 1);
                }
            }
        }else{
            intentosDisponibles--;
            setIntentosDisponibles(intentosDisponibles);
            actualizarCanvasAhorcado();
        }

        bloquearBoton(letra);

        actualizarPalabraSecreta();

        verificarFinDeJuego();

        letrasPresionadas.push(letra);

    }

    function iniciarLetras() {
        const letrasDiv = $('#letras');
        letrasDiv.empty();
        const abecedario = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ ';

        for (let i = 0; i < abecedario.length; i++) {
            const letra = abecedario[i];

            const btn = $('<button>', {
                class: 'btn-letra',
                id: `letra_${letra}`,
                text: letra,
                click: function () {
                    handleClickLetra(letra);
                }
            });

            letrasDiv.append(btn);
        }
    }


    function actualizarPalabraSecreta() {
        const palabraSecretaDiv = $('#palabraSecreta');
        const palabraMostrada = palabraAdivinada.split('').join(' ');
        palabraSecretaDiv.text(palabraMostrada);
    }

    function generarPalabraAleatoria() {

        const palabrasCategoria = palabrasDisponibles[categoria];
        const palabraAleatoria = palabrasCategoria[Math.floor(Math.random() * palabrasCategoria.length)];

        return palabraAleatoria;
    }

    function bloquearBoton(letra) {
        const botonLetra = $(`#letra_${letra}`);

        // Cambiar estilo según si la letra es correcta o incorrecta
        if (palabraSecreta.includes(letra)) {
            botonLetra.removeClass('btn-letra-neutro').addClass('btn-letra-success');
        } else {
            botonLetra.removeClass('btn-letra-neutro').addClass('btn-letra-error');
        }

        // Deshabilitar el botón después de cambiar el estilo
        botonLetra.prop('disabled', true);

    }