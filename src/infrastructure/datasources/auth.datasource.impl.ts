import { AuthDataSource, CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { UserMapper } from "../mappers/user.mapper";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashedPassword: string) => boolean;


export class AuthDataSourceImpl implements AuthDataSource {

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare
    ) { }


    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const { email, password } = loginUserDto;

        try {

            const user = await UserModel.findOne({ email });

            if (!user) throw CustomError.badRequest(`The user with the email ${email} do not exists`);

            const isValidPassword = this.comparePassword(password, user.password);

            if (!isValidPassword) throw CustomError.badRequest('Invalid password');

            return UserMapper.userEntityFromObject(user);

        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internalServerError();
        }
    }

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const { name, email, password } = registerUserDto;

        try {
            // 1. Verificar si el correo existe
            const emailExist = await UserModel.findOne({ email });

            if (emailExist) throw CustomError.badRequest('User already exists');

            const user = await UserModel.create({
                name,
                email,
                password: this.hashPassword(password)
            });

            // 2. Hacer un hash de la contraseña

            await user.save();

            // 3. Mappear la respuesta a nuestra entidad
            // TODO: Falta un mapper
            return UserMapper.userEntityFromObject(user);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            throw CustomError.internalServerError();
        }
    }

}