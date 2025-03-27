const mysql=require('mysql2');

const conection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'bd_agenda'

});

conection.connect((error)=>{
    if(error){
        console.log('Error al conectar a la base de datos');
        return;
    }
    console.log('Conectado a la base de datos');
});

module.exports=conection;