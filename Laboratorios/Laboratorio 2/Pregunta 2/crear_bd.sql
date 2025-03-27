CREATE TABLE IF NOT EXISTS usuarios (
  Id int(11) NOT NULL AUTO_INCREMENT,
  Nombre varchar(100) NOT NULL,
  Correo varchar(50) NOT NULL,
  Fecha_registro date NOT NULL,
  PRIMARY KEY (Id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO usuarios (Nombre, Correo, Fecha_registro) VALUES
('Ejemplo 1', 'ejemplo1@test.com', CURDATE()),
('Ejemplo 2', 'ejemplo2@test.com', CURDATE());