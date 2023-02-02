import express from "express";
import MongoStore from "connect-mongo";
import passport from "passport";
import {cartsRouter} from "./routes/carritos.js";
import {productsRouter} from "./routes/products.js";
import { authRouter } from "./routes/auth.js";
import { logger } from "./loggers/logger.js";
import { options } from "./config/databaseConfig.js"
import session from "express-session";

// Instancia servidor con express
const app = express();

// Configuración servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configuracion de la sesion
app.use(session({
    //donde se guardan las sesiones
    store: MongoStore.create({
        mongoUrl:options.mongoDB.url
    }),
    secret:"claveSecreta",
    resave:false,
    saveUninitialized:false
}));

// Configuración passport
app.use(passport.initialize());
app.use(passport.session());

// Router carrito y productos
app.use('/api/auth', authRouter);
app.use('/api/productos', productsRouter);
app.use('/api/carritos', cartsRouter);

// Ejecución del servidor
const PORT = 8080;
const server = app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`);
})
server.on('error', error => logger.fatal(`Error in server ${error}`));