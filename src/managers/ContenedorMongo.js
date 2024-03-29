import mongoose from "mongoose";
import { logger } from "../loggers/logger.js";
import { options } from "../config/databaseConfig.js";

mongoose.set('strictQuery', false);
mongoose.connect(options.mongoDB.url,(err)=>{
    if(err) return logger.fatal(`Hubo un error al conectar la base de datos ${err}`);
    logger.info("Base de datos conectada")
});

class ContenedorMongo{
    constructor(model){
        this.model = model;
    }

    async getById(id){
        try {
            const object = await this.model.findById(id);
            if(!object){
                return {message: `Error al buscar: no se encontró el id ${id}`, error:true};
            } else {
                return {message: object, error:false};
            }
        } catch (error) {
            return {message:`Hubo un error ${error}`, error:true};
        }
    }

    async getAll(){
        try{
            const objects = await this.model.find();
            return objects;
        } catch (error) {
            return [];
        }
    }

    async save(product){
        try {
            const object = await this.model.create(product);
            return `new document saved with id ${object._id}`
        } catch (error) {
            return {message:`Error al guardar: ${error}`};
        }
    }

    async updateById(body, id){
        try {
            await this.model.findByIdAndUpdate(id, body,{new:true});
            return {message:"Update successfully"}
        } catch (error) {
            return {message:`Error al actualizar: no se encontró el id ${id}`};
        }
    }

    async deleteById(id){
        try {
            await this.model.findByIdAndDelete(id);
            return {message:"delete successfully"};
        } catch (error) {
            return {message:`Error al borrar: no se encontró el id ${id}`};
        }
    }

    async deleteAll(){
        try {
            await this.model.delete({});
            return {message:"delete successfully"}
        } catch (error) {
            return {message:`Error al borrar todo: ${error}`};
        }
    }
}

export {ContenedorMongo};