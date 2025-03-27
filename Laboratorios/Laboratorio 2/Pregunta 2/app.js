const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    if (db.state === 'disconnected') {
      return res.status(503).send('Base de datos no disponible');
    }
    next();
  });
  
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/listar', (req, res) => {
    db.query(
        'SELECT Id AS id, Nombre AS nombre, Correo AS correo, Fecha_registro AS fecha_registro FROM usuarios',
        (error, usuarios) => {
            if (error) {
                console.log('Error al obtener usuarios:', error);
                return res.status(500).send('Error del servidor');
            }
            res.render('listar', { contactos: usuarios });
        }
    );
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', (req, res) => {
    const { nombre, correo } = req.body;
    db.query(
        'INSERT INTO usuarios (Nombre, Correo, Fecha_registro) VALUES (?, ?, CURDATE())',
        [nombre, correo],
        (error, resultado) => {
            if (error) {
                console.log('Error al crear usuario:', error);
                return res.status(500).send('Error del servidor');
            }
            res.redirect('/listar');
        }
    );
});

app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    db.query(
        'SELECT Id AS id, Nombre AS nombre, Correo AS correo FROM usuarios WHERE Id = ?',
        [id],
        (error, resultados) => {
            if (error) {
                console.log('Error al obtener usuario:', error);
                return res.status(500).send('Error del servidor');
            }
            res.render('edit', { contacto: resultados[0] });
        }
    );
});

app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, correo } = req.body;
    db.query(
        'UPDATE usuarios SET Nombre = ?, Correo = ? WHERE Id = ?',
        [nombre, correo, id],
        (error, resultado) => {
            if (error) {
                console.log('Error al actualizar usuario:', error);
                return res.status(500).send('Error del servidor');
            }
            res.redirect('/listar');
        }
    );
});

app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query(
        'DELETE FROM usuarios WHERE Id = ?',
        [id],
        (error, resultado) => {
            if (error) {
                console.log('Error al eliminar usuario:', error);
                return res.status(500).send('Error del servidor');
            }
            res.redirect('/listar');
        }
    );
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});