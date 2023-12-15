import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDataSourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthRoutes {

    /*
        Si no se va a aplicar Dependency Injection, los metodos se pueden
        dejar estaticos para evitar crear instancias de nuestras clases y solo llamar
        los metodos.
    */
    static get routes(): Router {
        const router = Router();

        const database = new AuthDataSourceImpl();
        const authRepository = new AuthRepositoryImpl(database);
        const controller = new AuthController(authRepository);

        // Definir todos los controladores
        router.post('/login', controller.loginUser);

        router.post('/register', controller.registerUser);

        router.get('/all', AuthMiddleware.validateJWT, controller.getUsers);

        return router;
    }

}