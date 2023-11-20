import { PacienteModel, MedicoModel, PerfilModel, TurnosModel, ServiciosModel, IngresoModel, ConsultasModel, RegistrosModel  } from "../models/CN_Model.js";

//METODOS PARA EL CRUD

//CRUD DE PACIENTES

//Mostrar todos los pacientes
export const getAllPacientes = async (req, res) => {
    try {
      const pacientes = await PacienteModel.findAll();
      res.json(pacientes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los pacientes' });
    }
  };
// Mostrar un paciente por su ID
export const getPacientes = async (req, res) => {
    const pacienteId = req.params.id; 
    try {
      const paciente = await PacienteModel.findByPk(pacienteId);
      if (!paciente) {
        res.status(404).json({ message: 'Paciente no encontrado' });
        return;
      }
      res.json(paciente);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el paciente' });
    }
  };
// Crear un nuevo paciente

export const createPaciente = async (req, res) => {
    const nuevoPaciente = req.body;
    try {
      const pacienteCreado = await PacienteModel.create(nuevoPaciente);
      res.json(pacienteCreado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el paciente' });
    }
  };


// Actualizar un paciente por su ID
export const updatePaciente = async (req, res) => {
  const Id = req.params.id; 
  const datosActualizados = req.body; 

  try {
      const paciente = await PacienteModel.findByPk(Id);

      if (!paciente) {
          return res.status(404).json({ message: 'Paciente no encontrado' });
      }

      await paciente.update(datosActualizados);

      // Devolver los datos actualizados en lugar de los originales
      return res.json(paciente);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al actualizar el paciente' });
  }
};


export const deletePaciente = async (req, res) => {
  const { id } = req.params;

  try {
    // Verificar si hay ingresos asociados al paciente
    const ingresosAsociados = await IngresoModel.findOne({
      where: { Id: id },
    });

    if (ingresosAsociados) {
      // Si hay ingresos asociados, eliminar el ingreso del paciente
      await IngresoModel.destroy({ where: { Id: id } });
    }

    // Luego, elimina al paciente
    await PacienteModel.destroy({ where: { Id: id } });

    res.json({ message: 'Paciente y su ingreso eliminados correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el paciente' });
  }
};






//CRUD DE MEDICOS

//Mostrar todos los Medicos
export const getAllMedicos = async (req, res) => {
    // Implementa la lógica para obtener todos los médicos
    try {
        const medicos = await MedicoModel.findAll();
        res.json(medicos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los médicos' });
    }
};

// Mostrar un Medico por su ID
export const getMedico = async (req, res) => {
    // Implementa la lógica para obtener un médico por su ID
    const medicoId = req.params.id;
    try {
        const medico = await MedicoModel.findByPk(medicoId);
        if (!medico) {
            res.status(404).json({ message: 'Médico no encontrado' });
            return;
        }
        res.json(medico);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el médico' });
    }
};

// Crear un nuevo Medico
export const createMedico = async (req, res) => {
    // Implementa la lógica para crear un nuevo médico
    const nuevoMedico = req.body;
    try {
        const medicoCreado = await MedicoModel.create(nuevoMedico);
        res.json(medicoCreado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el médico' });
    }
};

// Actualizar un Medico por su ID
export const updateMedico = async (req, res) => {
  const medicoId = req.params.id;
  const datosActualizados = req.body;

  try {
    const medico = await MedicoModel.findByPk(medicoId);

    if (!medico) {
      res.status(404).json({ message: 'Médico no encontrado' });
      return;
    }

    // Verifica si se proporcionó una nueva foto y actualiza la propiedad 'FotoPerfil'
    if (req.file) {
      datosActualizados.FotoPerfil = req.file.path; // Ajusta según la propiedad donde se almacene la foto en tu aplicación
    }

    // Actualiza la información del médico
    await medico.update(datosActualizados);

    // Puedes enviar el medico actualizado como respuesta si es necesario
    res.json(medico);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el médico' });
  }
};

// Eliminar un Medico por su ID
export const deleteMedico = async (req, res) => {
    // Implementa la lógica para eliminar un médico por su ID
    const medicoId = req.params.id;
    try {
        const medico = await MedicoModel.findByPk(medicoId);
        if (!medico) {
            res.status(404).json({ message: 'Médico no encontrado' });
            return;
        }
        await medico.destroy();
        res.json({ message: 'Médico eliminado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el médico' });
    }
};


//CRUD DE PERFILES

// Mostrar todos los perfiles de ingreso
export const getAllPerfiles = async (req, res) => {
  try {
      const perfiles = await PerfilModel.findAll();
      res.json(perfiles);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los perfiles' });
  }
};

// Mostrar un perfil de ingreso por su ID
export const getPerfil = async (req, res) => {
  const perfilId = req.params.id;
  try {
      const perfil = await PerfilModel.findByPk(perfilId);
      if (!perfil) {
          res.status(404).json({ message: 'Perfil no encontrado' });
          return;
      }
      res.json(perfil);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el perfil' });
  }
};

// Crear un nuevo perfil de ingreso (tanto médico como paciente)
export const createPerfil = async (req, res) => {
  const nuevoPerfil = req.body;
  try {
      const perfilCreado = await PerfilModel.create(nuevoPerfil);
      res.json(perfilCreado);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el perfil' });
  }
};

// Actualizar un perfil de ingreso por su ID
export const updatePerfil = async (req, res) => {
  const perfilId = req.params.id;
  const datosActualizados = req.body;
  try {
      const perfil = await PerfilModel.findByPk(perfilId);
      if (!perfil) {
          res.status(404).json({ message: 'Perfil no encontrado' });
          return;
      }
      await perfil.update(datosActualizados);
      res.json(perfil);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el perfil' });
  }
};

// Eliminar un perfil de ingreso por su ID
export const deletePerfil = async (req, res) => {
  const perfilId = req.params.id;
  try {
      const perfil = await PerfilModel.findByPk(perfilId);
      if (!perfil) {
          res.status(404).json({ message: 'Perfil no encontrado' });
          return;
      }
      await perfil.destroy();
      res.json({ message: 'Perfil eliminado con éxito' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el perfil' });
  }
};


//CRUD DE INGRESO

// Mostrar todos los registros de ingresos
export const getAllIngresos = async (req, res) => {
  try {
    const ingresos = await IngresoModel.findAll();
    res.json(ingresos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los registros de ingresos' });
  }
};

// Obtener ingresos por el ID del médico
export const getIngresosByMedicoId = async (req, res) => {
  const medicoId = req.params.id;

  try {
    const ingresos = await IngresoModel.findAll({ where: { IdMedico: medicoId } });
    res.json(ingresos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los registros de ingresos del médico' });
  }
};

// Obtener ingresos por el ID del paciente
export const getIngresosByPacienteId = async (req, res) => {
  const pacienteId = req.params.id;

  try {
    const ingresos = await IngresoModel.findAll({ where: { IdPaciente: pacienteId } });
    res.json(ingresos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los registros de ingresos del paciente' });
  }
};

// Crear un nuevo registro de ingreso (para médico o paciente)
export const createIngreso = async (req, res) => {
  const { Dni, Contraseña } = req.body; // Cambia Contrasena a Contraseña

  if (!Dni || !Contraseña) {
    res.status(400).json({ error: 'DNI y Contraseña son campos requeridos' });
    return;
  }
  try {
    // Busca un perfil con el DNI y la Contraseña proporcionados
    const perfil = await PerfilModel.findOne({
      where: { Dni, Contraseña }, // Cambia Contrasena a Contraseña
      attributes: ['IdMedico', 'Id', 'Dni', 'Contraseña'], // Asegúrate de incluir estas columnas
    });

    if (!perfil) {
      console.log(`Perfil no encontrado para DNI: ${Dni} y Contraseña: ${Contraseña}`); // Cambia Contrasena a Contraseña
      res.status(404).json({ message: 'DNI o contraseña incorrectos' });
      return;
    }

    // Crear el registro de ingreso con la referencia al perfil correspondiente
    console.log('Perfil encontrado:', perfil);
    const ingresoCreado = await IngresoModel.create({
      IdMedico: perfil.IdMedico,
      Id: perfil.Id,
      Dni: Dni,
      Contraseña: Contraseña,
      // Puedes agregar más campos según sea necesario
    });

    res.json(ingresoCreado);
  } catch (error) {
    console.error('Error al crear el registro de ingreso:', error);
    res.status(500).json({ error: 'Error al crear el registro de ingreso' });
  }
};
// Eliminar un registro de ingreso por su ID
export const deleteIngreso = async (req, res) => {
  const ingresoId = req.params.id;

  try {
    // Buscar el registro de ingreso por su ID
    const ingreso = await IngresoModel.findByPk(ingresoId);

    if (!ingreso) {
      res.status(404).json({ message: 'Registro de ingreso no encontrado' });
      return;
    }

    // Eliminar el registro de ingreso
    await ingreso.destroy();
    res.json({ message: 'Registro de ingreso eliminado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el registro de ingreso' });
  }
};

// Actualizar un ingreso por su ID
export const updateIngreso = async (req, res) => {
  const ingresoId = req.params.id;
  const datosActualizados = req.body;

  try {
    const ingreso = await IngresoModel.findByPk(ingresoId);

    if (!ingreso) {
      res.status(404).json({ message: 'Registro de ingreso no encontrado' });
      return;
    }

    await ingreso.update(datosActualizados);
    res.json(ingreso);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el registro de ingreso' });
  }
};


//CRUD DE TURNOS

// Mostrar todos los turnos
export const getAllTurnos = async (req, res) => {
  try {
    const turnos = await TurnosModel.findAll({
      attributes: ['IdTurno', 'FechaDisp', 'HorarioDisp', 'TipoConsu', 'Dni', 'IdMedico', 'PrecioConsulta'],
    });
    res.json(turnos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los turnos' });
  }
};

// Mostrar un turno por su ID
export const getTurno = async (req, res) => {
  const turnoId = req.params.id;
  try {
    const turno = await TurnosModel.findByPk(turnoId);
    if (!turno) {
      res.status(404).json({ message: 'Turno no encontrado' });
      return;
    }
    res.json(turno);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el turno' });
  }
};


// Crear un nuevo turno
export const createTurno = async (req, res) => {
  try {
    const { FechaDisp, HorarioDisp, TipoConsu, PrecioConsulta, Dni, NombreCompleto, Celular } = req.body;

    // Busca al paciente con el DNI en la base de datos
    let pacienteExistente = await PacienteModel.findOne({ where: { DNI: Dni } });

    // Si el paciente no existe, crea un nuevo paciente con NombreCompleto y Celular
    if (!pacienteExistente) {
      console.log('Paciente no encontrado en la base de datos. Creando uno nuevo...');

      // Asegúrate de que se proporcionen NombreCompleto y Celular antes de crear un nuevo paciente
      if (!NombreCompleto || !Celular) {
        return res.status(400).json({ error: 'NombreCompleto y Celular son campos requeridos para crear un nuevo paciente.' });
      }

      // Crea un nuevo paciente con NombreCompleto y Celular
      pacienteExistente = await PacienteModel.create({
        DNI: Dni,
        NombreCompleto: NombreCompleto,
        Celular: Celular,
        // Otros campos del paciente...
      });
    }

    // IdMedico predefinido (en este caso, establecido en 2)
    const IdMedicoPredefinido = 2;

    // Crea el turno en la base de datos con el Id del paciente existente o recién creado
    console.log('Creando turno en la base de datos...');
    const turno = await TurnosModel.create({
      FechaDisp,
      HorarioDisp,
      TipoConsu,
      PrecioConsulta,
      Dni: pacienteExistente.Id // Usa el Id del paciente existente o recién creado
    });

    console.log('Turno creado con éxito:', turno);

    res.status(201).json(turno);
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  }
};






// Actualizar un turno por su ID
export const updateTurno = async (req, res) => {
  const turnoId = req.params.id;
  const datosActualizados = req.body;
  try {
    const turno = await TurnosModel.findByPk(turnoId);
    if (!turno) {
      res.status(404).json({ message: 'Turno no encontrado' });
      return;
    }
    await turno.update(datosActualizados);
    res.json(turno);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el turno' });
  }
};

// Eliminar un turno por su ID
export const deleteTurno = async (req, res) => {
  const turnoId = req.params.id;
  try {
    const turno = await TurnosModel.findByPk(turnoId);
    if (!turno) {
      res.status(404).json({ message: 'Turno no encontrado' });
      return;
    }
    await turno.destroy();
    res.json({ message: 'Turno eliminado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el turno' });
  }
};


//CRUD DE CONSULTAS

// Mostrar todas las consultas
export const getAllConsultas = async (req, res) => {
  try {
    const consultas = await ConsultasModel.findAll();
    res.json(consultas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las consultas' });
  }
};

// Mostrar una consulta por su ID
export const getConsulta = async (req, res) => {
  const consultaId = req.params.id;
  try {
    const consulta = await ConsultasModel.findByPk(consultaId);
    if (!consulta) {
      res.status(404).json({ message: 'Consulta no encontrada' });
      return;
    }
    res.json(consulta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la consulta' });
  }
};

// Crear una nueva consulta
export const createConsulta = async (req, res) => {
  const nuevaConsulta = req.body;
  try {
    const consultaCreada = await ConsultasModel.create(nuevaConsulta);
    res.json(consultaCreada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la consulta' });
  }
};

// Actualizar una consulta por su ID
export const updateConsulta = async (req, res) => {
  const consultaId = req.params.id;
  const datosActualizados = req.body;
  try {
    const consulta = await ConsultasModel.findByPk(consultaId);
    if (!consulta) {
      res.status(404).json({ message: 'Consulta no encontrada' });
      return;
    }
    await consulta.update(datosActualizados);
    res.json(consulta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la consulta' });
  }
};

// Eliminar una consulta por su ID
export const deleteConsulta = async (req, res) => {
  const consultaId = req.params.id;
  try {
    const consulta = await ConsultasModel.findByPk(consultaId);
    if (!consulta) {
      res.status(404).json({ message: 'Consulta no encontrada' });
      return;
    }
    await consulta.destroy();
    res.json({ message: 'Consulta eliminada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la consulta' });
  }
};


//CRUD SERVICIOS

// Mostrar todos los servicios
export const getAllServicios = async (req, res) => {
  try {
    const servicios = await ServiciosModel.findAll();
    res.json(servicios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los servicios' });
  }
};

// Mostrar un servicio por su ID
export const getServicio = async (req, res) => {
  const servicioId = req.params.id;
  try {
    const servicio = await ServiciosModel.findByPk(servicioId);
    if (!servicio) {
      res.status(404).json({ message: 'Servicio no encontrado' });
      return;
    }
    res.json(servicio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el servicio' });
  }
};

// Crear un nuevo servicio
export const createServicio = async (req, res) => {
  const nuevoServicio = req.body;
  const { IdMedico } = nuevoServicio;

  // Asegúrate de que IdMedico esté presente antes de continuar
  if (!IdMedico) {
    return res.status(400).json({ error: 'IdMedico no proporcionado' });
  }

  try {
    // Realiza las operaciones necesarias usando IdMedico
    const servicioCreado = await ServiciosModel.create({
      ...nuevoServicio,
      // Puedes agregar más campos aquí según sea necesario
    });
    res.json(servicioCreado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el servicio' });
  }
};

// Actualizar un servicio por su ID
export const updateServicio = async (req, res) => {
  const servicioId = req.params.id;
  const datosActualizados = req.body;
  try {
    const servicio = await ServiciosModel.findByPk(servicioId);
    if (!servicio) {
      res.status(404).json({ message: 'Servicio no encontrado' });
      return;
    }
    await servicio.update(datosActualizados);
    res.json(servicio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el servicio' });
  }
};

// Eliminar un servicio por su ID
export const deleteServicio = async (req, res) => {
  const servicioId = req.params.id;
  try {
    const servicio = await ServiciosModel.findByPk(servicioId);
    if (!servicio) {
      res.status(404).json({ message: 'Servicio no encontrado' });
      return;
    }
    await servicio.destroy();
    res.json({ message: 'Servicio eliminado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el servicio' });
  }
};



//CRUD DE REGISTROS

// Mostrar todos los registros
export const getAllRegistros = async (req, res) => {
  try {
    const registros = await RegistrosModel.findAll();
    res.json(registros);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los registros' });
  }
};

// Mostrar un registro por su ID
export const getRegistro = async (req, res) => {
  const registroId = req.params.id;
  try {
    const registro = await RegistrosModel.findByPk(registroId);
    if (!registro) {
      res.status(404).json({ message: 'Registro no encontrado' });
      return;
    }
    res.json(registro);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el registro' });
  }
};

// Crear un nuevo registro
export const createRegistro = async (req, res) => {
  const nuevoRegistro = req.body;
  try {
    const registroCreado = await RegistrosModel.create(nuevoRegistro);
    res.json(registroCreado);
  } catch (error) {
    console.error('Error al crear el registro:', error); // Registra el error en la consola del servidor
    res.status(500).json({ error: 'Error interno del servidor al crear el registro' });
  }
};


// Actualizar un registro por su ID
export const updateRegistro = async (req, res) => {
  const registroId = req.params.id;
  const datosActualizados = req.body;
  try {
    const registro = await RegistrosModel.findByPk(registroId);
    if (!registro) {
      res.status(404).json({ message: 'Registro no encontrado' });
      return;
    }
    await registro.update(datosActualizados);
    res.json(registro);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el registro' });
  }
};

// Eliminar un registro por su ID
export const deleteRegistro = async (req, res) => {
  const registroId = req.params.id;
  try {
    const registro = await RegistrosModel.findByPk(registroId);
    if (!registro) {
      res.status(404).json({ message: 'Registro no encontrado' });
      return;
    }
    await registro.destroy();
    res.json({ message: 'Registro eliminado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el registro' });
  }
};