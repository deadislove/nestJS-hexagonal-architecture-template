import { Result } from "@shared/core/result";

export interface IRepository<T> {
    findOne(id: number): Promise<Result<T | null>>;
    findAll(): Promise<Result<T[]>>;
    create(entity: Partial<T>): Promise<Result<T>>;
    update(id: number, entity: Partial<T>): Promise<Result<T>>;
    delete(id: number): Promise<Result<boolean>>;
}