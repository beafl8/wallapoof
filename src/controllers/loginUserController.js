import generateErrorUtil from '../utils/generateErrorUtil.js';
import getPool from '../db/getPool.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
//estas dos lineas son iguales (funcion y flecha)(funciones lambda en java)
//function loginUserController (req, res, next){}
const loginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            generateErrorUtil('faltan campos', 400);
        }
        const pool = await getPool();
        const [users] = await pool.query(
            `SELECT email, password, id FROM users WHERE email=?`,
            [email],
        );
        if (users.length === 0) {
            generateErrorUtil(`No existe ningún usuario con ese email`, 404);
        }
        let compare = bcrypt.compare(password, users[0].password);
        console.log(compare);
        if (!(await bcrypt.compare(password, users[0].password))) {
            generateErrorUtil('la contraseña no es correcta', 401);
        }
        const tokenInfo = { id: users[0].id, email };
        const token = jwt.sign(tokenInfo, process.env.SECRET, {
            expiresIn: '15d',
        });

        res.status(201).send({
            status: 'ok',
            message: 'login realizado con éxito',
            data: { token },
        });
    } catch (err) {
        next(err);
    }
};

export { loginUserController };
