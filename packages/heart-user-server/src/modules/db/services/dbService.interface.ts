export interface IDbService{
    getRandomTest(): Promise<any>;
    getAuthUser(data: any): Promise<any>;
}