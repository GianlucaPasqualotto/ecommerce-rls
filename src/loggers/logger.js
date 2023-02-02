import log4js from "log4js";

// configuración de esta librería - Definimos donde vamos a guardar los mensajes y con que nivel los vamos a mostrar
log4js.configure({
    // Definimos la salidad de datos: como se almacena y se muestran los mensajes
    appenders:{
        consola:{type:"console"},//muestra mensajes por consola
        errorFile:{type:"file",filename:"./src/logs/errores.log"},
        //definir una salida con un nivel en especifico
        consolaDebug:{type:'logLevelFilter',appender:'consola', level:'debug'},
        consolaErrores:{type:'logLevelFilter',appender:'consola', level:'error'},
        archivoErrores:{type:'logLevelFilter', appender:'errorFile', level:'error'}
    },
    categories:{
        default:{appenders:['consolaDebug','archivoErrores'],level:'all'},
        // prodCategory:{appenders:['archivoErrores'],level:'all'},
    }
});

export const logger = log4js.getLogger();//categoria default.