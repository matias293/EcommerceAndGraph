import { Request, Response, NextFunction } from 'express';

import {productsAPI} from '../apis/products'
import { schemaAddProduct,schemaUpdateProduct } from "../helpers/validators";
import {newProductU} from '../models/productos/products.interfaces'


  export const createPost = async (input:any , req: Request) => {
     const {productData } = input
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
        }

        export const posts  =  async (input :any , req : Request) => {
         
         const products = await productsAPI.getProducts()
         
         return products
    }

    export const deleteProduct = async (input : any, req : Request) => {
      const {id} = input
       await productsAPI.getProducts(id)
       await productsAPI.deleteProduct(id);
      
      return 'Producto borrado' 
    }

    export const updateProducts = async (input : any, req : Request) => {
      const {id} = input
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
    }
 

    export const post  =  async (input : any, req : Request) => {
       const {id} = input
      const products = await productsAPI.getProducts(id as string)
         
      return products[0]
    }


