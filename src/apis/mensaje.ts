import {TipoPersistencia, NoticiasFactoryDAO} from '../models/mensajes/mensajes.factory'
import {newMensaje} from '../models/mensajes/mensajes.intefaces'
const tipo = TipoPersistencia.MongoAtlas;

export class mensAPI{
    private mensajes;
    
    constructor(){
        this.mensajes = NoticiasFactoryDAO.get(tipo)
    }

    async getMensajes(){
        return await  this.mensajes.get()
    }

    async addMensajes(messageData:newMensaje){
        return await this.mensajes.add(messageData)
    }
}

export const mensajeAPI = new mensAPI()