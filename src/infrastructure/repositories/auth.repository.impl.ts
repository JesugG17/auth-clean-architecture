import { AuthDataSource, AuthRepository, RegisterUserDto, UserEntity } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";

export class AuthRepositoryImpl implements AuthRepository {

    constructor(
        private readonly dataSource: AuthDataSource
    ) { }

    login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.dataSource.login(loginUserDto);
    }

    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.dataSource.register(registerUserDto);
    }

}