import mongoose, {Schema, model} from 'mongoose'
import moment from 'moment'

import Config from '../../../config/index'
import {Mensaje,newMensaje} from '../mensajes.intefaces'

const msgCollectionName = 'message';

const messageSchema  = new Schema(
	{
		author: {
			email:    { type: String, required: true, max: 100 },
			nombre:   { type: String, required: true, max: 100 },
			apellido: { type: String, required: true, max: 100 },
			edad:     { type: Number, required: true },
			alias:    { type: String, required: true, max: 100 },
			avatar:   { type: String, required: true, max: 100 },
			fecha:    { type :String ,default:moment().format('DD/MM/YYYY HH:mm:ss') },
			
		},
		mensaje: { type: String, required: true, max: 1000 },
	}
);

messageSchema.methods.toJSON = function() {
    const { __v,  ...data  } = this.toObject();
    return data;
}


export class MensajesAtlasDAO {
    private srv: string;
    private mensajes:any;

    constructor(local: boolean = false) {
        if (local)
          this.srv = `mongodb://localhost:27017/${Config.MONGOLOCAL_INGRESS}`;
        
        else this.srv = Config.MONGO_INGRESS;
        mongoose.connect(this.srv);
        this.mensajes = model('Mensaje', messageSchema);
      }

      async get(): Promise <Mensaje[]> {
          let mensajes : Mensaje[] = []
          try {
            mensajes = await this.mensajes.find()
            return mensajes 
          } catch (error) {
              return mensajes
          }
      }

      async add(messageData : newMensaje):Promise<void>  {
        try {
          const nuevoMensaje = new this.mensajes(messageData)
          return await nuevoMensaje.save()
            
          } catch (error : any) {
              return error
          }
      }
}


