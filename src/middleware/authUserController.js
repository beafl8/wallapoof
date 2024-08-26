import generateErrorUtil from '../utils/generateErrorUtil.js';
import jwt from 'jsonwebtoken';

const authUserController = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) generateErrorUtil('Falta autorización', 401);
        try {
            const tokenInfo = jwt.verify(authorization, process.env.SECRET);
            req.user = tokenInfo;
            next();
        } catch (err) {
            console.error(err);
            generateErrorUtil('Token inválido', 401);
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};
export { authUserController };
