import express, { Router } from 'express';

interface Options {
    port?: number;
    routes: Router;
}

export class Server {

    private readonly app;
    private readonly routes: Router;
    private readonly port: number;

    constructor(options: Options) {
        const { port = 3100, routes } = options;
        this.app = express();
        this.port = port;
        this.routes = routes;

    }

    async start() {

        // Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

        // Usar las rutas definidas
        this.app.use(this.routes);

        this.app.listen(this.port, () => {
            console.log(`Server running in the port ${this.port}`);
        });
    }
}