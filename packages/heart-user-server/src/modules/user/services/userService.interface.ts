export type UserApp = {
    complete_name: string,
    email: string,
    password: string,
    cpf: string,
    birthday: Date,
    role: 'Admin' | 'Evaluator' | 'Patient'
}

export interface IUserService{
    getRandomTest(): Promise<any>;
    registerUser(data: UserApp): Promise<any>;
    AuthUser(data: {email: string, password: string}): Promise<any>;
    deleteUser(data: {cpf: string}): Promise<any>;
    updateUser(cpf: string, data: Partial<UserApp>): Promise<boolean>;
}