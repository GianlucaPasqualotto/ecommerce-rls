import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const options = {
    FileSystem: {
        pathProducts: 'productos.json',
        pathCarts: 'carritos.json',
    },

    sqliteDB:{
        client:"sqlite3",
        connection: {
            filename:path.join(__dirname, "../DB/ecommerce.sqlite")
        },
        useNullAsDefault:true
    },
    firebase:{
        serviceKey:{},
        databaseUrl:""
    },
    mongoDB:{
        url: "mongodb+srv://GianlucaPasqualotto:riverplate1096@ecommerce-backend.bvtacrv.mongodb.net/ecommerce?retryWrites=true&w=majority"
    }
}