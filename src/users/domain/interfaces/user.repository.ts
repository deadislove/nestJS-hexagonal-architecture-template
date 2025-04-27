import { IRepository } from "@shared/interfaces/repository.interface";
import { UserEntity } from "../entities/user.entity";
import { Result } from "@shared/core/result";

export interface IUserRepositoryPort extends IRepository<UserEntity>  {
    findByEmail(email: string) : Promise<Result<UserEntity | null>>
}