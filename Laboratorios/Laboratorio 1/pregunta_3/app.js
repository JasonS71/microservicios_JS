const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/listar', (req, res) => {
    db.query('SELECT id, nombres, apellidos, direccion, telefono FROM agenda', (error, contactos) => {
        if (error) {
            console.log('Error al ejecutar la consulta');
            return;
        }
        res.render('listar', { contactos });
    });
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', (req, res) => {
    const { nombres, apellidos, direccion, telefono } = req.body;
    db.query(
        'INSERT INTO agenda (nombres, apellidos, direccion, telefono) VALUES (?, ?, ?, ?)',
        [nombres, apellidos, direccion, telefono],
        (error, resultado) => {
            if (error) {
                console.log('Error al insertar el contacto');
                return;
            }
            res.redirect('/listar');
        }
    ); 
});

app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT id, nombres, apellidos, direccion, telefono FROM agenda WHERE id = ?', [id], (error, contactos) => {
        if (error) {
            console.log('Error al ejecutar la consulta');
            return;
        }
        res.render('edit', { contacto: contactos[0] });
    });
});

app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { nombres, apellidos, direccion, telefono } = req.body;
    db.query(
        'UPDATE agenda SET nombres = ?, apellidos = ?, direccion = ?, telefono = ? WHERE id = ?',
        [nombres, apellidos, direccion, telefono, id],
        (error, resultado) => {
            if (error) {
                console.log('Error al actualizar el contacto');
                return;
            }
            res.redirect('/listar');
        }
    );
});

app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM agenda WHERE id = ?', [id], (error, resultado) => {
        if (error) {
            console.log('Error al eliminar el contacto');
            return;
        }
        res.redirect('/listar');
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});