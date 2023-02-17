import express, { query } from 'express';
import { inquirerMenu, pausa, leerInput,confirmar, inquirerConsulta} from '../helpers/inquirer.js';




import cliente from '../db/connection.js';

class Server {
    app
    port
    

    constructor(){
        this.app = express();
        
        this.port = process.env.PORT|| 8080 ;
        try {
            console.log('Conectando...')
            this.conectarse()
            console.log('Conectado satisfactoriamentes')
        } catch (error) {
            console.log('No se ha podido conectar..')
        }
        
        
        
    
        
    }
    



    async menu(){
        
            let opt = ''
            let opt2= ''
        
            
            
            await pausa();
        
            do {
                // Imprimir menu
                opt = await inquirerMenu();
                switch (opt) {
                    case '1':
                        cliente.query('DROP TABLE IF EXISTS farmacia, personal, laboratorio, tipo_medicamento, medicamento, stock_medicamentos, factura, detalle_factura, cliente ')
                        
                        cliente.query(`
                        CREATE TABLE farmacia ( 
                        numero_farmacia SERIAL,
                        nombre_farmacia VARCHAR(30) NOT NULL,
                        direccion VARCHAR(30) NOT NULL,
                        PRIMARY KEY (numero_farmacia)
                        )
                        
                            `
                            )



                        cliente.query(`
                        CREATE TABLE personal(
                            id_personal SERIAL,
                            nombre_personal VARCHAR(30) NOT NULL,
                            edad INT NOT NULL,
                            direccion VARCHAR(60) NOT NULL,
                            sexo VARCHAR(1) NOT NULL,
                            turno VARCHAR(30) NOT NULL,
                            cargo VARCHAR(30) NOT NULL,
                            id_farmacia INT NOT NULL,
                            PRIMARY KEY (id_personal),
                            FOREIGN KEY (id_farmacia) REFERENCES farmacia(numero_farmacia)
                            )
                            `)
                            
                        


                        cliente.query(`
                            CREATE TABLE laboratorio
                            (
                            id SERIAL,
                            nombre VARCHAR(50),
                            telefono VARCHAR(20),
                            direccion VARCHAR(20),
                            PRIMARY KEY(id)
                            )
                        `)

                        cliente.query(`
                        CREATE TABLE tipo_medicamento
                        (
                        id SERIAL,
                        nombre VARCHAR(50),
                        PRIMARY KEY(id)
                        )
                        `)

                        cliente.query(`
                        CREATE TABLE medicamento
                        (
                        id SERIAL,
                        nombre VARCHAR(50),
                        precio MONEY,
                        id_laboratorio INT NOT NULL,
                        id_tipo_medicamento INT NOT NULL,
                        tipo_presentacion VARCHAR(30) NOT NULL,
                        PRIMARY KEY(id),
                        FOREIGN KEY (id_laboratorio) REFERENCES laboratorio(id),
                        FOREIGN KEY (id_tipo_medicamento) REFERENCES tipo_medicamento(id)
                        )
                        `)

                        

                        cliente.query(`
                        CREATE TABLE stock_medicamentos
                        (
                        id_stock SERIAL,
                        cantidad_stock INT NOT NULL,
                        numero_farmacia INT NOT NULL,
                        codigo_medicamento INT NOT NULL,
                        PRIMARY KEY (id_stock),
                        FOREIGN KEY (numero_farmacia) REFERENCES farmacia(numero_farmacia),  
                        FOREIGN KEY (codigo_medicamento) REFERENCES medicamento(id)
                        )
                        `)

                        cliente.query(`

                        CREATE TABLE factura
                        (
                        id_factura SERIAL,
                        id_client INT NOT NULL,
                        id_empleado INT NOT NULL,
                        PRIMARY KEY (id_factura), 
                        FOREIGN KEY (id_empleado) REFERENCES personal(id_personal)
                        
                        )


                        `)

                        cliente.query(`
                        CREATE TABLE detalle_factura
                        (
                        id_detalle SERIAL,
                        cantidad INT NOT NULL,
                        id_medicamento INT NOT NULL,
                        id_factura INT NOT NULL,
                        PRIMARY KEY (id_detalle),
                        FOREIGN KEY (id_medicamento) REFERENCES medicamento(id),
                        FOREIGN KEY (id_factura) REFERENCES factura(id_factura)
                        )
                        `)

                        

                        cliente.query(`
                        CREATE TABLE cliente
                        (
                        id SERIAL,
                        nombre VARCHAR(30) NOT NULL,
                        telefono BIGINT NOT NULL,
                        PRIMARY KEY (id)
                        )
                        `)



                            break;
                            
                            case '2':
                                cliente.query(`
                                INSERT INTO farmacia
                                (nombre_farmacia, direccion)
                                VALUES('DROGAS Y  MUCHO MAS', 'CARRERA 25 #200-454')
                                
                                `)

                                await cliente.query(`

                                INSERT INTO personal (nombre_personal, edad, direccion, sexo, turno, cargo, id_farmacia) VALUES
                                ('Jose Linares','58','Carrer Baeza, 187, Entre suelo 9º','M','Matutino','Practicante de Farmacia','1'),
                                ('Gustavo Andino','25','Rúa Ruvalcaba 6 3º D','M','Matutino','Practicante de Farmacia','1'),
                                ('Maria Rivera','35','Praza Enríquez, 402, 5º F','F','Vespertino','Practicante de Farmacia','1'),
                                ('Jesus Villalta','85','Rúa Iván, 56, 4º E','F','Nocturno','Practicante de Farmacia','1'),
                                ('David Medina','45','Camiño Francisco, 725, Bajos','M','Matutino','Practicante de Farmacia','1'),
                                ('Martha Salgado','40','Plaza Inés, 521, 9º C','F','Matutino','Practicante de Farmacia','1'),
                                ('Fanny Lopez','23','Travessera Perales, 6, 84º C','F','Vespertino','Practicante de Farmacia','1'),
                                ('Jimena Maradiaga','53','Ruela Joel, 531, 41º F','F','Vespertino','Practicante de Farmacia','1'),
                                ('Ermelindo Padilla','36','Plaça Mercado, 405, Entre suelo 1º','M','Nocturno','Regente de Farmacia','1'),
                                ('Aleman Pineda','23','Avinguda Sáez, 259, 5º F','M','Nocturno','Regente de Farmacia','1'),
                                ('Marco Peralta','15','Paseo Nuria, 2, Entre suelo 5º','M','Vespertino','Regente de Farmacia','1'),
                                ('Claudia Zoriano','69','Paseo Daniela, 00, 26º 3º','F','Vespertino','Regente de Farmacia','1'),
                                ('Camila Zepeda','63','Camino Víctor, 53, 19º B','F','Matutino','Regente de Farmacia','1'),
                                ('Alejandra Coello','19','Travesía Candelaria, 44, 6º F','F','Matutino','Regente de Farmacia','1'),
                                ('Fernando Lanza','65','Passeig Joan, 095, 24º A','M','Matutino','Regente de Farmacia','1'),
                                ('Oneyda Medina','52','Paseo Claudia, 25, 23º F','F','Vespertino','Regente de Farmacia','1'),
                                ('Patricia Rivera','63','Paseo Pardo, 14, 5º E','F','Vespertino','Regente de Farmacia','1'),
                                ('Max Galeano','36','Avenida Alfaro, 6, 9º 8º','M','Nocturno','Regente de Farmacia','1'),
                                ('Manuel Navarro','35','Avenida Lucía, 9, Entre suelo 9º','M','Nocturno','Regente de Farmacia','1'),
                                ('Emerita Hernandez','45','Passeig Alcántar, 21, 21º F','F','Vespertino','Regente de Farmacia','1'),
                                ('Astri Lagos','25','Travessera Adam, 8, 7º 5º','F','Nocturno','Regente de Farmacia','1'),
                                ('Daniel Portillo','56','Calle Manzano, 23, 15º 8º','M','Matutino','Regente de Farmacia','1'),
                                ('Vannesa Osorto','25','Rúa Candelaria, 97, 1º B','F','Matutino','Regente de Farmacia','1'),
                                ('Jimi Rosales','32','Carrer Guillermo, 628, 8º D','M','Matutino','Regente de Farmacia','1'),
                                ('Jorge Canizales','21','Travessera Carretero, 1, 45º F','M','Vespertino','Regente de Farmacia','1'),
                                ('Rosa Contreras','56','Calle Fuentes, 05, 38º D','F','Nocturno','Regente de Farmacia','1'),
                                ('Elmer Padilla','23','Paseo Delgadillo, 811, 76º 3º','M','Nocturno','Regente de Farmacia','1'),
                                ('Vilma Cruz','53','Camiño Alonzo, 4, 9º D','F','Matutino','Auxiliar de Farmacia','1'),
                                ('Reynieri Berrios','25','Camino Espinosa, 1, Entre suelo 8º','M','Matutino','Auxiliar de Farmacia','1'),
                                ('Manuel Gutierres','19','Passeig Godínez, 2, 62º F','M','Matutino','Auxiliar de Farmacia','1'),
                                ('Santos Hernandes','36','Plaza Tovar, 134, 9º E','M','Vespertino','Auxiliar de Farmacia','1'),
                                ('Olga Menguivar','65','Rúa Alba, 4, Ático 0º','F','Vespertino','Auxiliar de Farmacia','1'),
                                ('Perla Lagos','19','Rúa Alba, 4, Ático 0º','F','Nocturno','Auxiliar de Farmacia','1'),
                                ('Juan Garcia','54','Plaza Vázquez, 551, 8º F','M','Nocturno','Auxiliar de Farmacia','1'),
                                ('Cristian Godoy','22','Plaça Castellanos, 591, 47º C','M','Matutino','Auxiliar de Farmacia','1'),
                                ('Raul Avila','63','Passeig de Anda, 8, Bajo 1º','M','Vespertino','Auxiliar de Farmacia','1'),
                                ('Stefany Canales','23','Travessera Redondo, 45, 40º A','F','Matutino','Auxiliar de Farmacia','1'),
                                ('Yaky Umanzor','22','Travessera Redondo, 45, 40º A','F','Matutino','Auxiliar de Farmacia','1'),
                                ('Melissa Zavala','36','Ronda Delapaz, 243, 34º E','F','Vespertino','Auxiliar de Farmacia','1'),
                                ('Jessi Galdames','33','Rúa Serrato, 9, Ático 9º','F','Vespertino','Auxiliar de Farmacia','1'),
                                ('Anguie Osorio','18','Carrer Puente, 12, 3º','F','Nocturno','Auxiliar de Farmacia','1'),
                                ('Silvia Gonzales','33','Travessera Cortés, 943, 3º C','F','Nocturno','Auxiliar de Farmacia','1'),
                                ('Andres Angeles','28','Plaza Aaron, 44, 42º C','M','Matutino','Auxiliar de Farmacia','1'),
                                ('Maria Ucles','36','Plaza Espinosa, 1, 2º F','F','Matutino','Auxiliar de Farmacia','1'),
                                ('Jessica Velasquez','20','Plaza Rojas, 151, 74º B','F','Matutino','Auxiliar de Farmacia','1'),
                                ('Moises Caballero','19','Carrer Daniel, 69, 5º','M','Vespertino','Auxiliar de Farmacia','1'),
                                ('Fredy Salgado','25','Praza Nadia, 1, 4º A','M','Vespertino','Auxiliar de Farmacia','1'),
                                ('Fabiola Mendoza','21','Calle Porras, 593, 85º D','F','Nocturno','Auxiliar de Farmacia','1'),
                                ('Belkis Berrios','56','Carrer Vera, 6, 4º 2º','F','Nocturno','Auxiliar de Farmacia','1'),
                                ('Crolina Ponce','30','Carrer Ana 535 3º E','F','Nocturno','Auxiliar de Farmacia','1')






                                
                                `)
                                
                                await cliente.query(`
                                INSERT INTO laboratorio (nombre, telefono, direccion) VALUES
                                ('CentriLab', '6076972211', 'Calle 17 #15-24'),
                                ('CuaguLab', '6076419100', 'Carrera 78 #41-65'),
                                ('CliniFast', '6076313030', 'Avenida 17-A #15b-31'),
                                ('Drosalud', '6076214040', 'Carrera 15 #40-21'),
                                ('Profarma', '6076442200', 'Calle 15 #36-07'),
                                ('MediPharma', '6076542332', 'Calle 20 #29-32'),
                                ('ServiMedi', '6076474747', 'Calle 70 #60-87'),
                                ('BioQuimic', '607315567', 'Carrera 105 #95-45'),
                                ('NovaFarma', '6076342222', 'Avenida 15 #07-21'),
                                ('Promedic', '6076453434', 'Carrera 120 #102-75')
                                
                                `)

                                await cliente.query(`
                                INSERT INTO tipo_medicamento
                                (nombre)
                                VALUES('Antibiótico'),
                                ('Antihistamínico'),
                                ('Antiinflamatorio'),
                                ('Antidepresivo'),
                                ('Anticonvulsivo'),
                                ('Analgésico'),
                                ('Antipirético '),
                                ('Relajante muscular'),
                                ('Antimicótico')
                                `)

                                await cliente.query(`
                                INSERT INTO medicamento (nombre, precio, id_laboratorio, id_tipo_medicamento, tipo_presentacion)
                                VALUES('Propanolol', 15, (1+random()*9)::integer, 1, 'Crema'),
                                ('Isaniazida', 70, (1+random()*9)::integer, 2, 'En polvo'),
                                ('Amoxicilina', 35, (1+random()*9)::integer, 3, 'Pastilla'),
                                ('Fluconazol', 10, (1+random()*9)::integer, 8, 'Liquida'),
                                ('Aciclovir', 18, (1+random()*9)::integer, 8, 'Pastilla'),
                                ('Dextrano', 42, (1+random()*9)::integer, 9, 'En polvo'),
                                ('Poligelina', 50, (1+random()*9)::integer, 2, 'Pastilla'),
                                ('Digoxina', 70, (1+random()*9)::integer, 7, 'Crema'),
                                ('Amlodipino', 130, (1+random()*9)::integer, 7, 'Crema'),
                                ('Enalapril', 10, (1+random()*9)::integer, 1, 'Liquida'),
                                ('Atenolol', 45, (1+random()*9)::integer, 6, 'Liquida'),
                                ('Lidocaina', 15, (1+random()*9)::integer, 4, 'Crema'),
                                ('Furosemida', 39, (1+random()*9)::integer, 5, 'Crema'),
                                ('Hidroclorotiazida', 28, (1+random()*9)::integer, 1, 'Pastilla'),
                                ('Glutaral', 72, (1+random()*9)::integer, 1, 'Pastilla'),
                                ('Cloroxinelol', 58, (1+random()*9)::integer, 7, 'Pastilla'),
                                ('Clorhexidina', 30, (1+random()*9)::integer, 9, 'Crema'),
                                ('Nazidil', 95, (1+random()*9)::integer, 2, 'Liquida'),
                                ('Hydrobir', 20, (1+random()*9)::integer, 3, 'Crema'),
                                ('Iohexol', 22, (1+random()*9)::integer, 3, 'Pastilla'),
                                ('Amidotrizoato', 80, (1+random()*9)::integer, 3, 'En polvo'),
                                ('Tropicamida', 19, (1+random()*9)::integer, 4, 'Liquida'),
                                ('Betametasona', 40, (1+random()*9)::integer, 4, 'En polvo'),
                                ('Miconazol', 90, (1+random()*9)::integer, 9, 'En polvo'),
                                ('Metilrosalinila', 150, (1+random()*9)::integer, 9, 'Pastilla'),
                                ('Espironolactona', 50, (1+random()*9)::integer, 2, 'Liquida'),
                                ('Manitol', 36, (1+random()*9)::integer, 6, 'En polvo'),
                                ('Primperan', 27, (1+random()*9)::integer, 8, 'Pastilla'),
                                ('Diazepam', 15, (1+random()*9)::integer, 1, 'Crema'),
                                ('Amitriptilina', 35, (1+random()*9)::integer, 3, 'Pastilla'),
                                ('Fluoxetinica', 70, (1+random()*9)::integer, 2, 'En polvo'),
                                ('Lorazepam', 10, (1+random()*9)::integer, 8, 'Liquida'),
                                ('Haloperidol', 18, (1+random()*9)::integer, 8, 'Pastilla'),
                                ('Clorpromazina', 42, (1+random()*9)::integer, 9, 'En polvo'),
                                ('Valproato', 50, (1+random()*9)::integer, 2, 'Pastilla'),
                                ('Carbamazepina', 70, (1+random()*9)::integer, 7, 'Crema'),
                                ('Ventolin', 180, (1+random()*9)::integer, 7, 'Crema'),
                                ('Beclometasona', 70, (1+random()*9)::integer, 1, 'Liquida'),
                                ('Retanol', 49, (1+random()*9)::integer, 6, 'Liquida'),
                                ('Tiamina', 17, (1+random()*9)::integer, 4, 'Crema'),
                                ('Riboflavina', 39, (1+random()*9)::integer, 5, 'Crema'),
                                ('Piridoxima', 28, (1+random()*9)::integer, 1, 'Pastilla'),
                                ('Ergocalciferol', 32, (1+random()*9)::integer, 1, 'Pastilla'),
                                ('Colecalciferol', 58, (1+random()*9)::integer, 7, 'Pastilla'),
                                ('Bucofil', 30, (1+random()*9)::integer, 9, 'Crema'),
                                ('Acediur', 25, (1+random()*9)::integer, 2, 'Liquida'),
                                ('Acenam', 20, (1+random()*9)::integer, 3, 'Crema'),
                                ('Bukineton', 92, (1+random()*9)::integer, 3, 'Pastilla'),
                                ('Alcotina', 80, (1+random()*9)::integer, 3, 'En polvo'),
                                ('Galactogil', 49, (1+random()*9)::integer, 4, 'Liquida'),
                                ('Galantamina Kern',40, (1+random()*9)::integer, 4, 'En polvo'),
                                ('Galantamina Normon',60, (1+random()*9)::integer, 9, 'En polvo'),
                                ('Galantamina Combix',150, (1+random()*9)::integer, 9, 'Pastilla'),
                                ('Labileno', 50, (1+random()*9)::integer, 2, 'Liquida'),
                                ('Ladiva', 36, (1+random()*9)::integer, 6, 'En polvo'),
                                ('Lainema', 27, (1+random()*9)::integer, 8, 'Pastilla')    
                                `)

                                cliente.query(`
                                
                                INSERT INTO cliente (nombre, telefono)
                                VALUES
                                ('Daniel Caceres', 3133032357),
                                ('Roberto Guzman', 3182457864),
                                ('Mariana Jimenez', 3133739988),
                                ('Luis Alberto', 3157878389),
                                ('Valentina Martinez', 3105197060),
                                ('Edison Rojas', 3104282748),
                                ('Carlos Castillo', 3192552925),
                                ('Andres Avendaño', 3201521400),
                                ('Sebastian Torres', 3055684453),
                                ('Sofia Barrios', 3153593938),
                                ('Nicole Perez', 3136741463),
                                ('Miguel Castaño', 3173399718),
                                ('Maria Fernanda', 3202661554),
                                ('Elizabeth Perez', 3114291515),
                                ('Jorge Casas', 3105690281),
                                ('Diego Salas', 3053038787),
                                ('Dana Arenas', 3166013237),
                                ('Martha Lopez', 3216679342210),
                                ('Damian Villamizar', 3133042256),
                                ('Juan Gomez', 3156803764456)
                                `)

                                cliente.query(`
                                
                                
                                INSERT INTO stock_medicamentos
                                (cantidad_stock, numero_farmacia, codigo_medicamento)
                                VALUES((random()*50)::integer, 1, (random()*56)::integer),
                                ((random()*50)::integer, 1, 50),
                                ((random()*50)::integer, 1, 51),
                                ((random()*50)::integer, 1, 52),
                                ((random()*50)::integer, 1, 53),
                                ((random()*50)::integer, 1, 54),
                                ((random()*50)::integer, 1, 55),
                                ((random()*50)::integer, 1, 56),
                                ((random()*50)::integer, 1, 49),
                                ((random()*50)::integer, 1, 48),
                                ((random()*50)::integer, 1, 47),
                                ((random()*50)::integer, 1, 46),
                                ((random()*50)::integer, 1, 45),
                                ((random()*50)::integer, 1, 44),
                                ((random()*50)::integer, 1, 43),
                                ((random()*50)::integer, 1, 42),
                                ((random()*50)::integer, 1, 41),
                                ((random()*50)::integer, 1, 40),
                                ((random()*50)::integer, 1, 39),
                                ((random()*50)::integer, 1, 38),
                                ((random()*50)::integer, 1, 37),
                                ((random()*50)::integer, 1, 36),
                                ((random()*50)::integer, 1, 35),
                                ((random()*50)::integer, 1, 34),
                                ((random()*50)::integer, 1, 33),
                                ((random()*50)::integer, 1, 32),
                                ((random()*50)::integer, 1, 31),
                                ((random()*50)::integer, 1, 30),
                                ((random()*50)::integer, 1, 29),
                                ((random()*50)::integer, 1, 28),
                                ((random()*50)::integer, 1, 27),
                                ((random()*50)::integer, 1, 26),
                                ((random()*50)::integer, 1, 25),
                                ((random()*50)::integer, 1, 24),
                                ((random()*50)::integer, 1, 23),
                                ((random()*50)::integer, 1, 22),
                                ((random()*50)::integer, 1, 21),
                                ((random()*50)::integer, 1, 20),
                                ((random()*50)::integer, 1, 19),
                                ((random()*50)::integer, 1, 18),
                                ((random()*50)::integer, 1, 17),
                                ((random()*50)::integer, 1, 16),
                                ((random()*50)::integer, 1, 15),
                                ((random()*50)::integer, 1, 14),
                                ((random()*50)::integer, 1, 13),
                                ((random()*50)::integer, 1, 12),
                                ((random()*50)::integer, 1, 11),
                                ((random()*50)::integer, 1, 10),
                                ((random()*50)::integer, 1, 9),
                                ((random()*50)::integer, 1, 8),
                                ((random()*50)::integer, 1, 7),
                                ((random()*50)::integer, 1, 6),
                                ((random()*50)::integer, 1, 5),
                                ((random()*50)::integer, 1, 4),
                                ((random()*50)::integer, 1, 3),
                                ((random()*50)::integer, 1, 2),
                                ((random()*50)::integer, 1, 1)


                                                                
                                
                                `)

                                cliente.query(`
                                INSERT INTO factura
                                (id_client, id_empleado)
                                VALUES((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer ),
                                ((1+random()*19)::integer,(1+random()*49)::integer )
                                `)

                                cliente.query(`
                                INSERT INTO detalle_factura
                                (cantidad, id_medicamento, id_factura)
                                VALUES((random()*50)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer),
                                ((1+random()*49)::integer, (1+random()*55)::integer,(1+random()*93)::integer)
                                

                                `)

                                


                        break;
                    case '3':
                        await pausa();
                        do{
                        opt2 = await inquirerConsulta()
                        switch (opt2) {
                            case '1':
                                try {
                                    console.log('Cargando consulta...')
                                    const resp = await cliente.query(`
                                    
                                    
                                    SELECT p.nombre_personal, sum(fd.cantidad*m.precio) as Ventas  FROM medicamento m ,personal p, factura f, detalle_factura fd WHERE f.id_empleado = p.id_personal AND f.id_factura = fd.id_factura and fd.id_medicamento = m.id group by p.nombre_personal order by Ventas DESC
                                    `)
                                    console.log(resp.rows)
                                    
                                } catch (error) {
                                    console.log('Ha fallado', error)
                                    
                                }
                                
                                break;
                            case '2':

                            try {
                                console.log('Cargando consulta...')
                                const resp = await cliente.query(`
                                
                                SELECT l.nombre, sum(sm.cantidad_stock) FROM medicamento m, stock_medicamentos sm, laboratorio l, tipo_medicamento tm WHERE m.id = sm.codigo_medicamento and l.id = m.id_laboratorio and tm.id = m.id_tipo_medicamento and tm.nombre='Antibiótico' and (m.tipo_presentacion in('Pastilla','Crema'))  group by l.nombre
                                
                                `)
                                console.log(resp.rows)
                                
                            } catch (error) {
                                console.log('Ha fallado', error)
                                
                            }
                                
                                break;
                            case '3':
                                try {
                                    console.log('Cargando consulta...')
                                    const resp = await cliente.query(`
                                    
                                    SELECT p.nombre_personal, sum(df.cantidad) as Cantidad FROM medicamento m, factura f, detalle_factura df, laboratorio l, tipo_medicamento tm, personal p WHERE df.id_medicamento = m.id and f.id_factura = df.id_factura  and f.id_empleado = p.id_personal and l.id = m.id_laboratorio and tm.id = m.id_tipo_medicamento and tm.nombre = 'Antihistamínico' and (l.nombre = 'Profarma' or l.nombre= 'Medifarma') group by p.nombre_personal order by Cantidad desc
                                    
                                    `)
                                    console.log(resp.rows)
                                    
                                } catch (error) {
                                    console.log('Ha fallado', error)
                                    
                                }
                                
                                break;
                            case '4':
                                try {
                                    console.log('Cargando consulta...')
                                    const resp = await cliente.query(`
                                    
                                    SELECT m.nombre FROM medicamento m, factura f, detalle_factura df, tipo_medicamento tm, personal p WHERE df.id_medicamento = m.id and f.id_factura = df.id_factura  and f.id_empleado = p.id_personal and tm.id = m.id_tipo_medicamento and p.cargo='Regente de Farmacia' and tm.nombre LIKE 'Anti%' and m.precio > 50::money
                                    
                                    `)
                                    console.log(resp.rows)
                                    
                                } catch (error) {
                                    console.log('Ha fallado', error)
                                    
                                }
                                
                                break;
                            case '5':
                                try {
                                    console.log('Cargando consulta...')
                                    const resp = await cliente.query(`
                                    
                                    SELECT c.nombre, p.nombre_personal  FROM medicamento m, factura f, detalle_factura df, personal p, cliente c WHERE df.id_medicamento = m.id and f.id_factura = df.id_factura  and f.id_empleado = p.id_personal  and f.id_client = c.id and( p.nombre_personal='Elmer Padilla' or (p.sexo='F' AND p.turno = 'Nocturno' AND p.edad > 30) ) group by c.nombre, p.nombre_personal
                                    
                                    `)
                                    console.log(resp.rows)
                                    
                                } catch (error) {
                                    console.log('Ha fallado', error)
                                    
                                }
                                
                                break;
                            case '0':
                                
                                break;

                        
                            default:
                                break;
                            
                            }if (opt2 !== '0') await pausa();
                        }while(opt2 !== '0')
                        
                        
                        break;
        
                    case '5': // completado || pendiente
                        
                        break;
                    case '6':
                        
                       
                        break;
        
                    default:
                        break;
                }
        
               
        
                
        
                if (opt !== '0') await pausa();
        
        } while (opt !== '0');
        
    }



    listen(){
        this.app.listen( this.port ,()=>{
            console.log('Servidor corriendo en puerto ' + this.port);
        } )
    }

    async conectarse(){
        await cliente.connect()
    }
}
export default Server;

