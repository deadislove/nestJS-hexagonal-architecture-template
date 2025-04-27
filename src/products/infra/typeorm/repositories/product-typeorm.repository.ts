import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Result } from "@shared/core/result";
import ProductTypeOrmEntity from "../entities/product.typeorm.entity";
import { DeleteResult, Repository } from "typeorm";
import { plainToInstance } from "class-transformer";
import { emptyArray } from "@shared/utils/utils.function";
import { ProductEntity } from "@products/domain/entities/product.entity";
import { IProductRepositoryPort } from "@products/domain/interfaces/product.repository";

@Injectable()
export class ProductTypeOrmRepository implements IProductRepositoryPort {

    constructor(
        @InjectRepository(ProductTypeOrmEntity)
        private readonly repo: Repository<ProductTypeOrmEntity>
    ){}

    async findOne(id: number): Promise<Result<ProductEntity | null>> {
        try {
            const data: ProductTypeOrmEntity | null = await this.repo.findOne({
                where: {
                    id
                }
            })

            if(!data) return Result.ok(null)

            const result: ProductEntity = plainToInstance(ProductEntity, data)
            return Result.ok(result)
        }
        catch(error) {
            return Result.fail<ProductEntity | null>(error.message || 'Failed to fetch product by id')
        }
    }
    async findAll(): Promise<Result<ProductEntity[]>> {
        try {
            const data: ProductTypeOrmEntity[] = await this.repo.find()

            if(data.length === 0) return Result.ok(emptyArray<ProductEntity>())
            
            return Result.ok(plainToInstance(ProductEntity, data, { excludeExtraneousValues: true}))
        }
        catch(error) {
            return Result.fail<ProductEntity[]>(error.message || 'Failed to fetch products')
        }
    }

    async create(entity: Partial<ProductEntity>): Promise<Result<ProductEntity>> {
        try {
            let preparedData: ProductTypeOrmEntity = new ProductTypeOrmEntity()
            Object.assign(preparedData, entity)

            const result: ProductTypeOrmEntity = await this.repo.save(preparedData)

            return Result.ok(plainToInstance(ProductEntity, result, { excludeExtraneousValues: true}))
        }
        catch(error) {
            return Result.fail<ProductEntity>(error.message || 'Failed to create product')
        }
    }

    async update(id: number, entity: Partial<ProductEntity>): Promise<Result<ProductEntity>> {
        try {
            const existingData: ProductTypeOrmEntity | null = await this.repo.findOne({
                where: {
                    id
                }
            })

            if(existingData) {
                Object.assign(existingData, entity)
                const saved: ProductTypeOrmEntity = await this.repo.save(existingData)
                return Result.ok(plainToInstance(ProductEntity, saved, { excludeExtraneousValues: true}))
            }
            else {
                return Result.fail<ProductEntity>('Doesn\'t find out the data to update.')
            }
        }
        catch(error) {
            return Result.fail<ProductEntity>(error.message || 'Failed to update product by id')
        }
    }

    async delete(id: number): Promise<Result<boolean>> {
        try {
            const result: DeleteResult = await this.repo.delete(id)
            return Result.ok(result.affected !== 0)
        }
        catch(error) {
            return Result.fail<boolean>(error.message || 'Failed to delete product by id.')
        }
    }
}