

/*
    Como se va a regir la informacion en mi aplicacion
*/
export class UserEntity {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public password: string,
        public roles: string[],
        public img?: string
    ) { }
}