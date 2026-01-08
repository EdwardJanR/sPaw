CREATE TABLE usuario(
    idUsuario INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL,
    passwordUsuario VARCHAR(25) NOT NULL,
    rol ENUM('Cliente', 'Administrador') NOT NULL
) ENGINE=INNODB;

CREATE TABLE mascota(
    idMascota INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nombreMascota VARCHAR(50),
    idUsuario INT,
    FOREIGN KEY(idUsuario) REFERENCES usuario(idUsuario)
) ENGINE=INNODB;

CREATE TABLE groomer(
    idGroomer INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    telefono VARCHAR(15),
    email VARCHAR(100)
) ENGINE=INNODB;

CREATE TABLE servicio(
	idServicio INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(200) NOT NULL,
    precioTamPequeno DOUBLE NOT NULL,
    precioTamMediano DOUBLE NOT NULL,
    precioTamGrande DOUBLE NOT NULL
) ENGINE=INNODB;


CREATE TABLE reserva(
    idReserva INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    idGroomer INT NOT NULL,
    idServicio INT NOT NULL,
    idMascota INT NOT NULL, 
    fecha DATE NOT NULL,
    horaInicio TIME NOT NULL,
    horaFinal TIME NOT NULL,
    FOREIGN KEY(idGroomer) REFERENCES groomer(idGroomer),
    FOREIGN KEY(idServicio) REFERENCES servicio(idServicio),
    FOREIGN KEY(idMascota) REFERENCES mascota(idMascota)
) ENGINE=INNODB;


-- COMBOS BÁSICOS
INSERT INTO servicio (nombre, descripcion, precioTamPequeno, precioTamMediano, precioTamGrande) VALUES
('Combo Baño Básico', 'Baño con shampoo neutro, secado profesional, limpieza de oídos y corte de uñas. Ideal para mantener la higiene regular y dejar a tu peludito limpio y fresco.', 35000, 45000, 55000),

('Combo Grooming Completo', 'Baño + Corte de Pelo. Baño, secado y corte de pelo según raza o preferencia, perfilado de rostro y patas, corte de uñas y colonia hipoalergénica. Perfecto para una renovación total.', 60000, 75000, 95000),

('Combo Antipulgas Total', 'Baño + Tratamiento. Baño antipulgas y antigarrapatas, limpieza profunda de oídos, corte de uñas y revisión completa de piel. Diseñado para eliminar parásitos y proteger el bienestar de tu peludo.', 40000, 50000, 65000),

('Combo Dental & Limpieza de Oídos', 'Cepillado dental básico, limpieza profunda de oídos, corte de uñas y cepillado de pelaje. Ideal para el cuidado higiénico regular.', 30000, 40000, 50000),

('Combo Deslanado Básico', 'Baño, secado, cepillado intensivo para eliminar pelo muerto, limpieza de oídos y corte de uñas. Recomendado para razas de doble capa.', 45000, 55000, 70000),

('Combo Mantenimiento Express', 'Corte de uñas, limpieza de oídos, perfumado ligero y cepillado rápido. Perfecto entre baños.', 20000, 25000, 30000),

('Combo Hidratación Básica', 'Baño con shampoo hidratante, acondicionador nutritivo, secado profesional y corte de uñas. Ideal para pelajes resecos o maltratados.', 40000, 50000, 65000),

('Combo Revisión & Limpieza', 'Revisión general superficial (piel, patas, oídos), limpieza de oídos, corte de uñas y cepillado profundo.', 25000, 30000, 40000),

-- COMBOS PREMIUM
('Combo Cachorro (Primer Spa)', 'Especial para perritos jóvenes. Incluye baño suave con shampoo para cachorro, secado delicado, cepillado ligero, limpieza de oídos, recorte de puntas si es necesario y desensibilización al secador y equipos. Ideal para crear una experiencia tranquila desde pequeño.', 50000, 50000, 50000),

('Combo Spa Premium - Día de Relajación', 'Servicio de lujo con baño aromático, masaje relajante, hidratación profunda del pelaje, perfumado y obsequio (pañuelo o moñito). Perfecto para consentir a tu mascota.', 85000, 110000, 140000);

