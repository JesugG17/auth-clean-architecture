import { LoginUserDto } from "../dtos/auth/login-user.dto";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthRepository {

    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;

    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}