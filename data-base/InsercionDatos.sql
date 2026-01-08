INSERT INTO groomer (nombre, apellido, telefono, email) VALUES
('Laura', 'Gómez', '3004567890', 'laura.gomez@groomerspaw.com'),
('Andrés', 'Martínez', '3105678901', 'andres.martinez@groomerspaw.com'),
('Camila', 'Rodríguez', '3206789012', 'camila.rodriguez@groomerspaw.com'),
('Daniel', 'Pérez', '3017890123', 'daniel.perez@groomerspaw.com'),
('Valentina', 'Hernández', '3158901234', 'valentina.hernandez@groomerspaw.com');


INSERT INTO usuario (nombre, apellido, telefono, email, passwordUsuario, rol) VALUES
('Carlos','Ramirez','3001112233','carlos@correo.com','$2a$10$hash1','Cliente'),
('Ana','Gomez','3002223344','ana@correo.com','$2a$10$hash2','Cliente'),
('Luis','Perez','3003334455','luis@correo.com','$2a$10$hash3','Cliente'),
('Maria','Lopez','3004445566','maria@correo.com','$2a$10$hash4','Cliente'),
('Juan','Torres','3005556677','juan@correo.com','$2a$10$hash5','Cliente'),
('Laura','Diaz','3006667788','laura@correo.com','$2a$10$hash6','Cliente'),
('Pedro','Martinez','3007778899','pedro@correo.com','$2a$10$hash7','Cliente'),
('Sofia','Castro','3008889900','sofia@correo.com','$2a$10$hash8','Cliente'),
('Andres','Vargas','3009990011','andres@correo.com','$2a$10$hash9','Administrador'),
('Paula','Rios','3010001122','paula@correo.com','$2a$10$hash10','Cliente');

INSERT INTO servicio (nombre, descripcion, precioTamPequeno, precioTamMediano, precioTamGrande) VALUES
('Combo Baño Básico', 'Baño con shampoo neutro, secado profesional, limpieza de oídos y corte de uñas. Ideal para mantener la higiene regular.',
35000, 45000, 55000),
('Combo Grooming Completo', 'Baño, secado y corte de pelo según raza o preferencia, perfilado de rostro y patas, corte de uñas y colonia hipoalergénica.',
60000, 75000, 95000),
('Combo Antipulgas Total', 'Baño antipulgas y antigarrapatas, limpieza profunda de oídos, corte de uñas y revisión completa de piel.',
40000, 50000, 65000),
('Combo Dental & Limpieza de Oídos', 'Cepillado dental básico, limpieza profunda de oídos, corte de uñas y cepillado de pelaje.',
30000, 40000, 50000),
('Combo Deslanado Básico', 'Baño, secado y cepillado intensivo para eliminar pelo muerto, limpieza de oídos y corte de uñas.',
45000, 55000, 70000),
('Combo Mantenimiento Express', 'Corte de uñas, limpieza de oídos, perfumado ligero y cepillado rápido. Ideal entre baños.',
20000, 25000, 30000),
('Combo Hidratación Básica', 'Baño con shampoo hidratante, acondicionador nutritivo, secado profesional y corte de uñas.',
40000, 50000, 65000),
('Combo Revisión & Limpieza', 'Revisión general superficial, limpieza de oídos, corte de uñas y cepillado profundo.',
25000, 30000, 40000),
('Combo Cachorro (Primer Spaw)', 'Baño suave para cachorro, secado delicado, cepillado ligero, limpieza de oídos y desensibilización al equipo.',
50000, 50000, 50000),
('Combo Spaw Premium - Día de Relajación', 'Servicio de lujo con baño aromático, masaje relajante, hidratación profunda, perfumado y obsequio.',
85000, 110000, 140000);




 