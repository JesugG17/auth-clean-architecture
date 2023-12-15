import { JwtAdapter } from "../../../config";
import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";

interface IRegisterUserUseCase {
    execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
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

export class RegisterUserUseCase implements IRegisterUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignFunction = JwtAdapter.generateToken
    ) { }

    async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
        const user = await this.authRepository.register(registerUserDto);

        const token = await this.signToken({ id: user.id }, '2h');

        if (!token) throw CustomError.internalServerError('Error generating token');

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        };
    }

} 