import { MensajesAtlasDAO } from './DAOs/mongo';
import  logger  from '../../config/logger';

export enum TipoPersistencia {
    LocalMongo = 'LOCAL-MONGO',
    MongoAtlas = 'MONGO-ATLAS',

}

export class NoticiasFactoryDAO {
    static get(tipo: TipoPersistencia) {
      switch (tipo) {
     
  
        case TipoPersistencia.MongoAtlas:
          logger.info('Retornando Instancia Products Mongo Atlas');
          return new MensajesAtlasDAO();
  
        case TipoPersistencia.LocalMongo:
          logger.info('Retornando Instancia Products Mongo Local');
          return new MensajesAtlasDAO(true);
  
        default:
          logger.info('Retornando Instancia Products Default');
          return new MensajesAtlasDAO();
      }
    }
  }