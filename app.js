import express from 'express';
import cors from 'cors';
import db from './db/db.js';
import nodemailer from 'nodemailer';

// Importa modelos y rutas
import {
  PacienteModel,
  MedicoModel,
  PerfilModel,
  TurnosModel,
  ServiciosModel,
  IngresoModel,
  ConsultasModel,
  RegistrosModel
} from './models/CN_Model.js';

import PacientesRoutes from './routes/routes.js';
import MedicosRoutes from './routes/routes.js';
import PerfilesRoutes from './routes/routes.js';
import IngresoRoutes from './routes/routes.js';
import TurnosRoutes from './routes/routes.js';
import ConsultasRoutes from './routes/routes.js';
import ServiciosRoutes from './routes/routes.js';
import RegistrosRoutes from './routes/routes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Conexión de rutas
app.use('/pacientes', PacientesRoutes);
app.use('/medicos', MedicosRoutes);
app.use('/perfiles', PerfilesRoutes);
app.use('/ingresos', IngresoRoutes);
app.use('/turnos', TurnosRoutes);
app.use('/consultas', ConsultasRoutes);
app.use('/servicios', ServiciosRoutes);
app.use('/registros', RegistrosModel);

// Endpoint para el envío de correos electrónicos
app.post('/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;


  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'jmalmendro74@gmail.com',
      pass: 'smgw lkak rhvx grvd',
    },
    tls: {
      rejectUnauthorized: false, // Desactiva la verificación del certificado
    },
  });
  const mailOptions = {
    from: 'tu-correo@gmail.com',
    to: 'jmalmendro74@gmail.com',
    subject: subject,
    text: `Nombre: ${name}\nCorreo Electrónico: ${email}\nMensaje: ${message}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo electrónico enviado:', info.response);
    res.status(200).send('Correo electrónico enviado correctamente');
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    res.status(500).json({ error: 'Error interno del servidor al enviar el correo electrónico' });
  }
});


// Verificar la existencia de un registro por DNI, contraseña y tipo
app.get('/ingresos/verificar', async (req, res) => {
  const { dni, contrasena, tipo } = req.query;

  try {
    let ingreso;

    if (tipo === 'paciente') {
      ingreso = await IngresoModel.findOne({
        where: { Dni: dni, Contraseña: contrasena, IdMedico: null },
      });
    } else if (tipo === 'medico') {
      ingreso = await IngresoModel.findOne({
        where: { Dni: dni, Contraseña: contrasena, Id: null },
      });
    }

    res.json(ingreso !== null);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al verificar el registro de ingreso' });
  }
});



// Sincroniza los modelos con la base de datos
db.sync()
  .then(() => {
    console.log('Modelos sincronizados correctamente con la base de datos');

    // Inicia el servidor después de sincronizar los modelos
    app.listen(8000, () => {
      console.log('Servidor funcionando correctamente en http://localhost:8000/');
    });
  })
  .catch((error) => {
    console.error('Error al sincronizar modelos con la base de datos', error);
  });
