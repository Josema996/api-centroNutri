// Importamos la conexión a la base de datos
import db from "../db/db.js";
// Importamos Sequelize
import { DataTypes } from "sequelize";

// Definimos el modelo para la tabla Pacientes
 const PacienteModel = db.define('Pacientes', {
        Id: { // Cambia 'IdPaciente' por 'Id'
            type: DataTypes.INTEGER,
            primaryKey: true, // Indicar que es clave primaria
            autoIncrement: true,
        },
        NombreCompleto: { type: DataTypes.STRING },
        DNI: { type: DataTypes.STRING },
        Altura: { type: DataTypes.STRING },
        PesoAct: { type: DataTypes.INTEGER },
        AnalisisMedico: { type: DataTypes.STRING },
        Celular: { type: DataTypes.STRING },
        Correo: { type: DataTypes.STRING },
        Medicacion: { type: DataTypes.STRING },
        Alimentacion: { type: DataTypes.STRING },
        Comentarios: { type: DataTypes.STRING },
        Fumar: { type: DataTypes.BOOLEAN },
        ActividadFisica: { type: DataTypes.BOOLEAN },
        Alcohol: { type: DataTypes.STRING },
        Alergias: { type: DataTypes.STRING }
    }, {
        timestamps: false // Esto evita que las columnas createdAt y updatedAt se incluyan en las consultas
    });

// Definimos el modelo para la tabla Medico
const MedicoModel = db.define('Medico', {
    IdMedico: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Medico',
            key: 'IdMedico',
          },
        primaryKey: true,
        autoIncrement: true,
    },
    NombreMedico: { type: DataTypes.STRING },
    Matricula: { type: DataTypes.INTEGER },
    HorarioDisponible: { type: DataTypes.DATE }, // 'HorarioDisponible' en lugar de 'createdAt'
}, {
    tableName: 'Medico',
    timestamps: false, // Deshabilita las marcas de tiempo (createdAt y updatedAt)
});

// Definimos el modelo para la tabla Perfil
const PerfilModel = db.define('Perfil', {
    IdPerfil: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    NombreApellido: { type: DataTypes.STRING },
    Direccion: { type: DataTypes.STRING },
    Dni: { type: DataTypes.STRING },
    Contraseña: { type: DataTypes.STRING },
    FotoPerfil: { type: DataTypes.STRING },
    IdMedico: { type: DataTypes.INTEGER },
    Id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Pacientes',
            key: 'Id', // La columna de referencia en la tabla Pacientes
        },
        onDelete: 'CASCADE', // Esto configura la eliminación en cascada
    }
}, {
    tableName: 'Perfil',
    timestamps: false,
});

// Definimos el modelo para la tabla Turnos
const TurnosModel = db.define('Turnos', {
    IdTurno: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    FechaDisp: { type: DataTypes.DATE },
    HorarioDisp: { type: DataTypes.TIME },
    TipoConsu: { type: DataTypes.STRING },
    Dni: { type: DataTypes.STRING },
    IdMedico: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Medico',
            key: 'IdMedico',
        },
    },
    PrecioConsulta: { type: DataTypes.DECIMAL(10, 2) },
}, {
    timestamps: false // Esto evita que las columnas createdAt y updatedAt se incluyan en las consultas
});

// Definimos el modelo para la tabla Servicio
const ServiciosModel = db.define('Servicio', {
    IdServicios: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    NombreServicio: { type: DataTypes.STRING },
    Precio: { type: DataTypes.INTEGER},
    TipoServicio: { type: DataTypes.STRING }
},{
        timestamps: false,
    }
);

// Modifica el modelo para la tabla Consultas
const ConsultasModel = db.define('Consultas', {
    IdConsulta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    IdTurno: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Turnos',
            key: 'IdTurno',
        },
    },
    IdServicios: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Servicio',
            key: 'IdServicio',
        },
    },
    TipoConsulta: { type: DataTypes.STRING },
    FechaConsulta: { type: DataTypes.DATE },
    HoraConsulta: { type: DataTypes.TIME },
    Presencial: { type: DataTypes.BOOLEAN },
    Precio: { type: DataTypes.DECIMAL(10, 2) },
}, {
    timestamps: false
});

// Definimos el modelo para la tabla Ingresos
const IngresoModel = db.define('Ingresos', {
    IdIngreso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    IdMedico: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Medico',
            key: 'IdMedico',
        },
    },
    Id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Pacientes',
            key: 'Id',
        },
    },
    Dni: { // Agrega esta línea
        type: DataTypes.STRING,
    },
    Contraseña: { // Modifica esta línea para que coincida con el nombre de tu columna
        type: DataTypes.STRING,
    },
}, {
    timestamps: false,
});

const RegistrosModel = db.define('Registros', {
    IdRegistro: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Correo: { type: DataTypes.STRING, unique: true },
    DNI: { type: DataTypes.STRING, unique: true },
    Contraseña: { type: DataTypes.STRING },
    NombreCompleto: { type: DataTypes.STRING },
}, {
    timestamps: false,
});

// Establecemos las relaciones entre las tablas utilizando las claves foráneas (FOREIGN KEY)
TurnosModel.hasOne(ConsultasModel, { foreignKey: 'IdTurno' });
ConsultasModel.belongsTo(TurnosModel, { foreignKey: 'IdTurno' });

ConsultasModel.belongsTo(ServiciosModel, { foreignKey: 'IdServicios' });


TurnosModel.belongsTo(MedicoModel, { foreignKey: 'IdMedico' });
MedicoModel.hasMany(TurnosModel, { foreignKey: 'IdMedico' });

ServiciosModel.belongsTo(MedicoModel, { foreignKey: 'IdMedico' });

PerfilModel.belongsTo(PacienteModel, { foreignKey: 'Id' });

IngresoModel.belongsTo(PacienteModel, { foreignKey: 'Id' });
IngresoModel.belongsTo(MedicoModel, { foreignKey: 'IdMedico', onDelete: 'CASCADE' });
IngresoModel.belongsTo(PerfilModel, { foreignKey: 'Id', targetKey: 'Id' });

PacienteModel.hasOne(PerfilModel, { foreignKey: 'Id' });
PerfilModel.belongsTo(PacienteModel, { foreignKey: 'Id' });



// Exportamos los modelos
export { PacienteModel, MedicoModel, PerfilModel, TurnosModel, ServiciosModel, IngresoModel, ConsultasModel, RegistrosModel };