// Importamos la librería
const express = require('express');
// Creamos la aplicación
const app = express();
// Definimos el puerto para la aplicación
const port = 3000;

// M I D D L E W A R E      para procesar archivos de formulario
// Middleware tiene acceso a req y res para que pueda modificarlos
// modificarlos nos ayuda a que el servidor pueda recibir y mandar información
// que sea más entendible para el cliente
app.use(express.urlencoded({ extended: false }));
// Creo que req.body del metodo POST no funcionaría sin el middleware

// G E T
// Información que el cliente nos pide mediante esa dirección "http://localhost:3000/"
// Menú principal
app.get('/', (req, res) => {
    res.send(`
        <h1>Calculadora</h1>
        <h3>Seleccione una operación:</h3>
        <a href="/suma"><button>Suma</button></a>
        <a href="/resta"><button>Resta</button></a>
        <a href="/multiplicacion"><button>Multiplicación</button></a>
        <a href="/division"><button>División</button></a>
    `);
});

app.get('/suma', (req, res) => {
    res.send(`
        <h2>Suma</h2>
        <form method="POST" action="/calcular">
            <input type="hidden" name="operacion" value="sumar">
            <label>Número 1: <input type="number" name="num1" required></label><br>
            <label>Número 2: <input type="number" name="num2" required></label><br>
            <button type="submit">Calcular</button>
        </form>
        <a href="/"><button>Volver al menú</button></a>
    `);
});

app.get('/resta', (req, res) => {
    res.send(`
        <h2>Resta</h2>
        <form method="POST" action="/calcular">
            <input type="hidden" name="operacion" value="restar">
            <label>Número 1: <input type="number" name="num1" required></label><br>
            <label>Número 2: <input type="number" name="num2" required></label><br>
            <button type="submit">Calcular</button>
        </form>
        <a href="/"><button>Volver al menú</button></a>
    `);
});

app.get('/multiplicacion', (req, res) => {
    res.send(`
        <h2>Multiplicación</h2>
        <form method="POST" action="/calcular">
            <input type="hidden" name="operacion" value="multiplicar">
            <label>Número 1: <input type="number" name="num1" required></label><br>
            <label>Número 2: <input type="number" name="num2" required></label><br>
            <button type="submit">Calcular</button>
        </form>
        <a href="/"><button>Volver al menú</button></a>
    `);
});

app.get('/division', (req, res) => {
    res.send(`
        <h2>División</h2>
        <form method="POST" action="/calcular">
            <input type="hidden" name="operacion" value="dividir">
            <label>Número 1: <input type="number" name="num1" required></label><br>
            <label>Número 2: <input type="number" name="num2" required></label><br>
            <button type="submit">Calcular</button>
        </form>
        <a href="/"><button>Volver al menú</button></a>
    `);
});

app.post('/calcular', (req, res) => {
    const num1 = parseFloat(req.body.num1);
    const num2 = parseFloat(req.body.num2);
    const operacion = req.body.operacion;

    let resultado;
    let operacionTexto;
    const errorStyle = "color: red; font-weight: bold;";

    switch (operacion) {
        case 'sumar':
            resultado = num1 + num2;
            operacionTexto = 'suma';
            break;
        case 'restar':
            resultado = num1 - num2;
            operacionTexto = 'resta';
            break;
        case 'multiplicar':
            resultado = num1 * num2;
            operacionTexto = 'multiplicación';
            break;
        case 'dividir':
            if (num2 === 0) throw new Error('División entre cero');
            resultado = num1 / num2;
            operacionTexto = 'división';
            break;
        default:
            throw new Error('Operación no válida');
    }

    res.send(`
            <h2>Resultado:</h2>
            <p>La ${operacionTexto} de ${num1} y ${num2} es: ${resultado}</p>
            <a href="/"><button>Nueva operación</button></a>
        `);
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
