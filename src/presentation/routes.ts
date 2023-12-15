import { Router } from "express";
import { AuthRoutes } from "./auth/routes";

export class AppRoutes {

    /*
        Si no se va a aplicar Dependency Injection, los metodos se pueden
        dejar estaticos para evitar crear instancias de nuestras clases y solo llamar
        los metodos.
    */
    static get routes(): Router {
        const router = Router();

        // Definir todas las rutas principales
        router.use('/api/auth', AuthRoutes.routes);

        return router;
    }

}