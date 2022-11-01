const express = require('express')
const handlebars = require('express-handlebars')
const { Server: HttpServer } = require("http");
const { Server: Socket } = require("socket.io");

//export rutas
const rutaCarrito = require ("./router/rutaCarrito.js")
const rutaProductos = require ("./router/rutaProductos.js")

const app = express()
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

// configuracion JSON
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// configuracion puerto
const PORT = process.env.PORT || 8080

const server = httpServer.listen(PORT, ()=>console.log(`Servidor ${PORT}`))

app.use(express.static("views"))

// motor plantilla
app.engine("handlebars", handlebars.engine())

// directorio
app.set("views", "./views")

//motor express
app.set("view engine", "handlebars")

//definicion rutas
app.use("/api/carrito", rutaCarrito)
app.use("/api/productos", rutaProductos)

io.on("connection",(socket)=>{
    console.log(socket.id);
})