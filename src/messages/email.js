import {createTransport} from "nodemailer";

// Credenciales del administrador
export const emailAdmin = "egianlucapasqualotto@gmail.com";
const passAdmin = "vxmrwzpaybplrnzn";

// Configuración nodemailer
export const transporterEmail = createTransport({
    host:"smtp.gmail.com",
    port:587,
    auth:{
        user:emailAdmin,
        pass:passAdmin
    },
    secure:false,
    tls:{
        rejectUnauthorized:false
    }
});

