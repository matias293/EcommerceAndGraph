

export enum TipoPersistencia {
    LocalMongo = 'LOCAL-MONGO',
    MongoAtlas = 'MONGO-ATLAS',
    Memory     = 'Memory'
}

export class TypeModel{
    static get(tipo:string){
        switch(tipo){
            case 'development':
            return TipoPersistencia.Memory
          
            case 'production':
            return TipoPersistencia.MongoAtlas

            default:
            return TipoPersistencia.MongoAtlas
        }
    }
}