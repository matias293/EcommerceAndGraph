import mongoose, {Schema, model} from 'mongoose'

import {ProductI} from '../products.interfaces'
import Config from '../../../config/index'
import {MyMongoClient} from '../../../services/dbMongo'
import {newProductI,ProductQuery, Error,ProductBaseClass,newProductU} from '../products.interfaces'


const productsSchema = new mongoose.Schema<ProductI>({
    nombre: {
      type: String,
      required: true
    },
    precio: {
      type: Number,
      required: true
    },
    descripcion:{
      type: String,
      required: true
    },
    codigo:{
      type: String,
      required: true
    },
    foto:{
      type: String
      
    },
    stock:{
      type: Number,
      required: true
    }
  })

  productsSchema.methods.toJSON = function() {
    const { __v,  ...data  } = this.toObject();
    return data;
}

export const ProductModel =  mongoose.model('Productos', productsSchema);

export class ProductosAtlasDAO implements ProductBaseClass {
  client: MyMongoClient;
  productos: typeof ProductModel;
 

  constructor(local?:boolean) {
    // 
    this.client = new MyMongoClient();
    this.client.connect(local);
    this.productos = ProductModel;
  }

  async get(id?: string): Promise<ProductI[]> {
    let output: ProductI[] = [];
    
      if (id) {
        const idValid = this.client.isValidId(id)
        if(!idValid){
          const error:Error = new Error('El id no es valido');
              error.statusCode = 404;
              throw error;
        }
          const product : ProductI = await this.productos.findById(id);
            if(!product){
              const error:Error = new Error('Product not found');
              error.statusCode = 404;
              throw error;
            }   
            output.push(product)
            
       
      } else {
        const products  = await this.productos.find();
        if(products.length === 0){
          const error:Error = new Error('Not products avaibles');
          error.statusCode = 404;
          throw error;

        }
        output = products as unknown  as ProductI[];
      }
   
      return output
    
  }

  async add(data: newProductI): Promise<ProductI> {


    const newProduct = new this.productos(data);
    await newProduct.save();

    return newProduct;
  }

  async update(id: string, newProductData: newProductU): Promise<ProductI> {
    const updateProduct = await  this.productos.findByIdAndUpdate(id, newProductData,{new:true});
    return updateProduct
  }

  async delete(id: string) {
    await this.productos.findByIdAndDelete(id);
  }

  async query(query: ProductQuery): Promise<ProductI[]> {

    return this.productos.find(query);
  }
}
