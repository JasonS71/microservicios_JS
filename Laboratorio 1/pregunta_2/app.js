    // P A G I N A S - D I N A M I C A S
// EJS - Motor de plantillas
// npm install ejs

// Importamos librerías
const express = require('express');
const path=require('path');

// Creamos la variable para la aplicación y definimos el puerto
const app = express();
const port = 3000;

// M I D D L E W A R E      para procesar las vistas dinámicas
// app.set: Método utilizado para configurar varias propiedades en tu aplicación Express.
// 'views': Nombre de la propiedad que estás configurando. Indica el directorio donde se encuentran las plantillas de vistas.
// './views': Valor asignado a la propiedad 'views'. Especifica que las plantillas de vistas se encuentran en la carpeta views en el directorio raíz de tu proyecto.
app.set('views', './views');
// view engine: Propiedad que se utiliza para establecer el motor de plantillas que se utilizará en tu aplicación Express.
// 'ejs': Valor asignado a la propiedad 'view engine'. Indica que se utilizará el motor de plantillas EJS.
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// G E T
// Información que el cliente nos pide
app.get('/', (req, res) => {
    res.send(`
        <form method="POST" action="/tabla">
            <label for="operacion">Operación:</label>
            <select id="operacion" name="operacion">
                <option value="suma">Suma</option>
                <option value="resta">Resta</option>
                <option value="multiplicacion">Multiplicación</option>
                <option value="division">División</option>
            </select><br>
            
            <label for="numero">Número base:</label>
            <input type="number" id="numero" name="numero" required><br>
            
            <label for="inicio">Inicio de tabla:</label>
            <input type="number" id="inicio" name="inicio" required><br>
            
            <label for="fin">Fin de tabla:</label>
            <input type="number" id="fin" name="fin" required><br>
            
            <button type="submit">Generar tabla</button>
        </form>
    `);
});

// P O S T
// Información que el cliente nos manda mediante esa dirección "http://localhost:3000/calcular"
// en este caso se recibe dos números, se realiza la suma de estos y se manda una respuesta al cliente
app.post('/tabla', (req, res) => {
    const { operacion, numero, inicio, fin } = req.body;
    const base = parseInt(numero);
    const start = parseInt(inicio);
    const end = parseInt(fin);
    
    // Determinar símbolo de operación
    const operaciones = {
        suma: '+',
        resta: '-',
        multiplicacion: '×',
        division: '÷'
    };
    const simbolo = operaciones[operacion] || '?';

    // Generar datos para la tabla
    const datos = [];
    for (let i = start; i <= end; i++) {
        let resultado;
        switch(operacion) {
            case 'suma': resultado = base + i; break;
            case 'resta': resultado = base - i; break;
            case 'multiplicacion': resultado = base * i; break;
            case 'division': resultado = base / i; break;
            default: resultado = 'Error';
        }
        datos.push({ valor: i, resultado });
    }

    res.render('tabla', { base, simbolo, datos});
});

// Iniciamos el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
  

