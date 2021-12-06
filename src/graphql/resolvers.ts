import { Request, Response, NextFunction } from 'express';

import {productsAPI} from '../apis/products'
import { schemaAddProduct,schemaUpdateProduct } from "../helpers/validators";
import {newProductU} from '../models/productos/products.interfaces'
import logger from '../config/logger';


  export const createPost = async (input:any , req: Request,next:NextFunction) => {
     const {productData } = input
     try {
      const result = await schemaAddProduct.validateAsync(productData as newProductU)
      const newProduct = {
         nombre: result.nombre,
         precio: result.precio,
         descripcion:result.descripcion,
         codigo:result.codigo, 
         foto:'foto', 
         stock:result.stock
      }
        
      const product =  await  productsAPI.addProduct(newProduct)
        
      return  product
     } catch (err: any) {
      if (err.isJoi === true) err.status = 422 
      logger.error(err)
      next(err)
     }

   }


        export const posts  =  async (input :any , req : Request,next:NextFunction) => {
         try {
            const products = await productsAPI.getProducts()
         
         return products
         } catch (err) {
            logger.error(err)
            next(err)
            
         }
         
    }

    export const deleteProduct = async (input : any, req : Request,next:NextFunction) => {
      const {id} = input
      try {
         await productsAPI.getProducts(id)
       await productsAPI.deleteProduct(id);
      } catch (err : any) {
         
         logger.error(err)
         
      }
       
      
      return 'Producto borrado' 
    }

    export const updateProducts = async (input : any, req : Request,next:NextFunction) => {
      const {id} = input
      try {
          const product = await productsAPI.getProducts(id)
         const producto = product[0]
         const result = await schemaUpdateProduct.validateAsync(producto)
         let updateProduct : newProductU = {}

         if(result.nombre)      updateProduct.nombre = result.nombre
         if(result.precio)      updateProduct.precio = result.precio
         if(result.descripcion) updateProduct.descripcion = result.descripcion
         if(result.codigo)      updateProduct.codigo = result.codigo
         if(result.stock)       updateProduct.stock = result.stock
         
      const updatedItem = await productsAPI.updateProduct(id,updateProduct);
      return updatedItem
      } catch (err : any) {
         if (err.isJoi === true) err.status = 422
         logger.error(err)
         next(err)
      }   
    }
 

    export const post  =  async (input : any, req : Request ,next:NextFunction) => {
       const {id} = input
       try {
          const products = await productsAPI.getProducts(id as string)
             
          return products[0]
          
       } catch (err : any) {
         logger.error(err)
         next(err)
       }
    }


