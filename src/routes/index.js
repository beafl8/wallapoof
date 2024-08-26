// Importamos las dependencias.
import express from 'express';

// Importamos las funciones controladoras.
import {
    newUserController,
    newProductController,
    listProductsController,
    getProductByIdController,
    loginUserController,
    updateAvatarController,
} from '../controllers/index.js';

import { authUserController } from '../middleware/authUserController.js';

// Creamos un router.
const router = express.Router();

// Middleware que permite registrar un usuario.
router.post('/users/register', newUserController);

// Middleware que permite registrar un producto.
router.post('/products', newProductController);

// Middleware que retorna el listado de productos.
router.get('/products', listProductsController);

// Middleware que retorna un producto concreto por ID.
router.get('/products/:productId', getProductByIdController);

//Creamos  ruta login
router.get('/users/login', loginUserController);

//Middleware para crear Avatar //borramos el set avatar
router.put('/users/avatar', authUserController, updateAvatarController);

export default router;
