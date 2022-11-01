const express = require("express")
const rutaProductos = express.Router()

const Contenedor = require ("../clases/Contenedor.js")
const data = new Contenedor ("/data/productos.txt")

// verificacion rol
let rol = "admin"

const verificarRol = (req,res,next) =>{
    if(rol === "admin"){
        next()
    } else {
        res.send("No tienes accesos a esta ruta")
    }
}

rutaProductos.get("/", async(req,res)=>{
    const listado = await data.getAll()
    if(!listado) return res.status(404).send({message: "Error"});
    res.send(listado)
})

//mostrar producto por id
rutaProductos.get("/:id", async (req,res)=>{
    const {id} = req.params
    const prod = await data.getById(id)
    if(prod){
        res.send(prod)
    } else {
        return res.json({
            message:"El producto no existe"
        })
    }
})

rutaProductos.post("/",verificarRol, async(req,res)=>{
    const newProd = (req.body)
    await data.save(newProd)
    if(rol === "admin"){
        res.send(data)
    } else {
        message: "No tienes acceso a esta ruta"
    }
})

rutaProductos.put("/:id",verificarRol,async(req,res)=>{
    const {id} = req.params
    const modificacion = req.body
    if(rol === "admin"){
        const existe = await data.getById(id)
        if(!existe){
            return res.status(404).send({message: "Error el producto no existe"})
        } else {
            const prod = await data.putById(Number(id),modificacion)
            return res.send(prod)
        }
    } else {
        return res.json({
            message: "No tienes acceso a esta ruta"
        })
    }
})

rutaProductos.delete("/:id",verificarRol,async(req,res)=>{
    const {id} = req.params
    if(rol === "admin"){
        const existe = await data.getById(id)
        
        if(!existe){
            return res.status(404).send({message: "Error el producto no existe"})
        } else {
            const prod = data.deleteById(id)
            res.send(prod)
        }
    } else {
        return res.json({
            message: "No tienes acceso a esta ruta"
        })
    }
})

module.exports = rutaProductos