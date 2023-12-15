import { JwtAdapter } from "../../../config";
import { LoginUserDto } from "../../dtos/auth/login-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";

interface ILoginUserUseCase {
    execute(loginUserDto: LoginUserDto): Promise<UserToken>
}

interface UserToken {
    token: string;
    user: {
        id: string,
        name: string,
        email: string
    }
}

type SignFunction = (payload: Object, duration?: string) => Promise<string | null>;

export class LoginUserUseCase implements ILoginUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignFunction = JwtAdapter.generateToken
    ) { }

    async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
        const user = await this.authRepository.login(loginUserDto);

        const token = await this.signToken({ id: user.id });

        if (!token) throw CustomError.internalServerError();

        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            }
        };
    }
}