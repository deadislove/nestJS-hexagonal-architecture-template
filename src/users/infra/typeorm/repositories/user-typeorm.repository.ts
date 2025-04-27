import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "@users/domain/entities/user.entity";
import { IUserRepositoryPort } from "@users/domain/interfaces/user.repository";
import { DeleteResult, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { Result } from "@shared/core/result";
import { emptyArray } from "@shared/utils/utils.function";
import UserTypeOrmEntity from "../entities/user.typeorm.entity";

@Injectable()
export class UserTypeOrmRepository implements IUserRepositoryPort {

    constructor(
        @InjectRepository(UserTypeOrmEntity)
        private readonly repo: Repository<UserTypeOrmEntity>
    ) { }

    async findByEmail(email: string): Promise<Result<UserEntity | null>> {

        try {
            const data: UserTypeOrmEntity | null = await this.repo.findOne({
                where: {
                    email: email
                }
            })

            if (data) {
                const result: UserEntity = plainToInstance(UserEntity, data)
                return Result.ok(result)
            }
            else {
                return Result.ok(null)
            }
        } catch (error) {
            return Result.fail<UserEntity | null>(error.message || 'Failed to fetch user by email')
        }
    }

    async findOne(id: number): Promise<Result<UserEntity | null>> {
        try {
            const data: UserTypeOrmEntity | null = await this.repo.findOne({
                where: {
                    id
                }
            })

            if (!data) return Result.ok(null)

            const result: UserEntity = plainToInstance(UserEntity, data)
            return Result.ok(result)
        } catch (error) {
            return Result.fail<UserEntity | null>(error.message || 'Failed to fetch user by id')
        }
    }

    async findAll(): Promise<Result<UserEntity[]>> {

        try {
            const data: UserTypeOrmEntity[] = await this.repo.find()

            if (data.length === 0) return Result.ok(emptyArray<UserEntity>())

            return Result.ok(plainToInstance(UserEntity, data, { excludeExtraneousValues: true }))
        } catch (error) {
            return Result.fail<UserEntity[]>(error.message || 'Failed to fetch users')
        }
    }

    async create(entity: Partial<UserEntity>): Promise<Result<UserEntity>> {

        try {
            let preparedData: UserTypeOrmEntity = new UserTypeOrmEntity()
            Object.assign(preparedData, entity)

            const result: UserTypeOrmEntity = await this.repo.save(preparedData)

            return Result.ok(plainToInstance(UserEntity, result, { excludeExtraneousValues: true }))
        } catch (error) {
            return Result.fail<UserEntity>(error.message || 'Failed to create user')
        }
    }

    async update(id: number, entity: Partial<UserEntity>): Promise<Result<UserEntity>> {

        try {
            const existingData: UserTypeOrmEntity | null = await this.repo.findOne({
                where: {
                    id
                }
            })

            if (existingData) {
                Object.assign(existingData, entity)
                const saved: UserTypeOrmEntity = await this.repo.save(existingData)
                return Result.ok(plainToInstance(UserEntity, saved, { excludeExtraneousValues: true }))
            }
            else {
                return Result.fail<UserEntity>('Doesn\'t find out the data to upadte.')
            }
        } catch (error) {
            return Result.fail<UserEntity>(error.message || 'Failed to update user by id')
        }
    }

    async delete(id: number): Promise<Result<boolean>> {
        try {
            const result: DeleteResult = await this.repo.delete(id)
            return Result.ok(result.affected !== 0)
        }
        catch(error){
            return Result.fail<boolean>(error.message || 'Failed to delete user by id')
        }
    }

}