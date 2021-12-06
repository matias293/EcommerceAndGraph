import { CartFactoryDAO } from '../models/carrito/carrito.factory';
import { TipoPersistencia } from '../models/carrito/carrito.factory';
import { CartI,Error } from '../models/carrito/carrito.interfaces';
import { UserAPI } from './users';
import {TypeModel} from './TipoPersistencia'
import Config from '../config/index'
import { productsAPI } from './products';
/**
 * Con esta variable elegimos el tipo de persistencia
 */

const tipo = TypeModel.get(Config.ENVIROMENT)

class Cart {
  private carts;

  constructor() {
    this.carts = CartFactoryDAO.get(tipo);
  }

  async getCart(userId: string): Promise<CartI> {
    return this.carts.get(userId);
  }

  async createCart(userId: string): Promise<CartI> {
    const user = await UserAPI.getUsers(userId);

    if (!user){
      const error:Error = new Error('User does not exist. Error creating cart');
        error.statusCode = 404;
        throw error;
    }   
      

    const newCart = await this.carts.createCart(userId);
    return newCart;
  }

  async addProduct(
    cartId: string,
    productId: string,
    amount: number
  ): Promise<CartI> {
    
      const product = await productsAPI.getProducts(productId);    
      const producto = product[0]
      
      const updatedCart = await this.carts.addProduct(cartId, producto, amount);
      return updatedCart;

  }

  async deleteProduct(cartId: string, productId: string, amount: number) {
   
    const product = await productsAPI.getProducts(productId);
    const producto = product[0]
    const updatedCart = await this.carts.deleteProduct(cartId, producto, amount);
    return updatedCart;
  }

  async clearCart(cartId:string){
    await this.carts.clearCart(cartId)
  }
}

export const CartAPI = new Cart();