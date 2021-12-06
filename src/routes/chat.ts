import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import {carritoController} from '../controllers/carrito'
import {isAuth} from '../middleware/isAuth'

const router = Router();

router.get('/', isAuth ,asyncHandler(carritoController.getCarrito) );

export default router