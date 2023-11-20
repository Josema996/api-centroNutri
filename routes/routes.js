import express from 'express';
import {
  createPaciente,
  deletePaciente,
  getAllPacientes,
  getPacientes,
  updatePaciente,
} from '../controllers/CN_Controllers.js';
import {
  createMedico,
  deleteMedico,
  getAllMedicos,
  getMedico,
  updateMedico,
} from '../controllers/CN_Controllers.js';
import {
  createPerfil,
  deletePerfil,
  getAllPerfiles,
  getPerfil,
  updatePerfil,
} from '../controllers/CN_Controllers.js';
import {
  getAllIngresos,
  createIngreso,
  updateIngreso,
  deleteIngreso,
  getIngresosByMedicoId,
  getIngresosByPacienteId,
} from '../controllers/CN_Controllers.js';
import {
  getAllTurnos,
  createTurno,
  deleteTurno,
  getTurno,
  updateTurno,
} from '../controllers/CN_Controllers.js';
import {
  getAllConsultas,
  createConsulta,
  deleteConsulta,
  getConsulta,
  updateConsulta,
} from '../controllers/CN_Controllers.js';
import {
  getAllServicios,
  createServicio,
  deleteServicio,
  getServicio,
  updateServicio,
} from '../controllers/CN_Controllers.js';
import{
  getAllRegistros,
  getRegistro,
  createRegistro,
  updateRegistro,
  deleteRegistro
} from '../controllers/CN_Controllers.js'

const router = express.Router();

// Rutas para el Modelo de Pacientes
router.get('/pacientes', getAllPacientes);
router.get('/pacientes/:id', getPacientes);
router.post('/pacientes', createPaciente);
router.put('/pacientes/:id', updatePaciente);
router.delete('/pacientes/:id', deletePaciente);

// Rutas para los médicos
router.get('/medicos', getAllMedicos);
router.get('/medicos/:id', getMedico);
router.post('/medicos', createMedico);
router.put('/medicos/:id', updateMedico);
router.delete('/medicos/:id', deleteMedico);

// Rutas para los perfiles de ingreso
router.get('/perfiles', getAllPerfiles);
router.get('/perfiles/:id', getPerfil);
router.post('/perfiles', createPerfil);
router.put('/perfiles/:id', updatePerfil);
router.delete('/perfiles/:id', deletePerfil);

// Rutas para los ingresos
router.get('/ingresos', getAllIngresos);
router.post('/ingresos/', createIngreso);
router.put('/ingresos/:id', updateIngreso);
router.delete('/ingresos/:id', deleteIngreso);
router.get('/ingresos/:id', getIngresosByMedicoId);
router.get('/ingresos/:id', getIngresosByPacienteId);

// Rutas para los turnos
router.get('/turnos', getAllTurnos);
router.get('/turnos/:id', getTurno);
router.post('/turnos', createTurno);
router.put('/turnos/:id', updateTurno);
router.delete('/turnos/:id', deleteTurno);

// Rutas para las consultas
router.get('/consultas', getAllConsultas);
router.get('/consultas/:id', getConsulta);
router.post('/consultas', createConsulta);
router.put('/consultas/:id', updateConsulta);
router.delete('/consultas/:id', deleteConsulta);

// Rutas para los servicios
router.get('/servicios', getAllServicios);
router.get('/servicios/:id', getServicio);
router.post('/servicios', createServicio);
router.put('/servicios/:id', updateServicio);
router.delete('/servicios/:id', deleteServicio);

// Rutas para los registros
router.get('/registros', getAllRegistros);
router.get('/registros/:id', getRegistro);
router.post('/registros', createRegistro);
router.put('/registros/:id', updateRegistro);
router.delete('/registros/:id', deleteRegistro);


export default router;