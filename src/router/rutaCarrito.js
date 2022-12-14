const express = require("express")
const rutaCarrito = express.Router()

const Contenedor = require("../clases/Contenedor.js")
const data = new Contenedor("./data/pedidos.txt")

// lista productos del carrito
rutaCarrito.get("/:id/productos",async (req,res)=>{
    const {id} = req.params
    const carrito = await data.getById(id)
    if(carrito){
        return res.send(carrito)
    } else {
        res.status(404).send({message: "Error el carrito no existe"})
    }
})

// crear carrito
rutaCarrito.post('/', async(req,res)=>{
    const newId = await data.newId()
    res.send(newId)
})

// eliminar carrito
rutaCarrito.delete("/:id", async(req,res)=>{
    const {id} = req.params
    const existe = await data.getById(id)
    if(!existe){
        return res.status(404).send({message: "Error el carrito no existe"})
    } else {
        const carrito = await data.deleteById(id)
        return res.send(carrito)
    }
})

// agregar producto al carrito
rutaCarrito.post("/:id/productos", async(req,res)=>{
    const {id} = req.params
    const modificacion = req.body
    const existe = await data.getById(id)
    if(!existe){
        return res.status(404).send({message: "Error el carrito no existe"})
    } else {
        const carrito = await data.moreProd(id, modificacion)
        res.send(carrito)
    }
})

// eliminar producto del carrito
rutaCarrito.delete("/:id/productos/:id_prod", async(req,res)=>{
    const {id, id_prod} = req.params
    const existe = await data.getById(id)
    if(!existe){
        return res.status(404).send({message: "Error el carrito no existe"})
    } else {
        const carrito = await data.deleteOneProd(id, id_prod)
        res.send(carrito)
    }
})
module.exports = rutaCarrito