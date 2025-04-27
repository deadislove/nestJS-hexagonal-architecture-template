import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { IProductRepositoryPort } from "@products/domain/interfaces/product.repository";
import { plainToInstance } from "class-transformer";
import { ProductEntity } from "@products/domain/entities/product.entity";
import { Result } from "@shared/core/result";
import { handleResult, handleResultWithoutMapping } from "@shared/core/result-helper";
import { CreateProductRequestModel, UpdateProductRequestModel, UserWithProductRequestModel } from "./dto/requests";
import { ProductResponseModel, UserWithProductResponseModel } from "./dto/responses";
import { UserService } from "@users/application/user.service";
import { UserResponseModel } from "@users/application/dto/responses";
import { LoggerService } from "@shared/logger/logger.service";

@Injectable()
export class ProductService {
    constructor(
        private readonly logger: LoggerService,
        @Inject('IProductRepositoryPort')
        private readonly productRepo: IProductRepositoryPort,
        private readonly userService: UserService
    ){}

    async createProduct(requestModel: CreateProductRequestModel): Promise<ProductEntity> {
        let createProductEntity =plainToInstance(ProductEntity, requestModel)
        let savedResult:Result<ProductEntity> = await this.productRepo.create(createProductEntity)

        return handleResult(savedResult, ProductResponseModel)
    }

    async findAll(id: number = 0) {
        if(id === 0) {
            const queriedData: Result<ProductEntity[]> = await this.productRepo.findAll()

            return handleResult(queriedData, ProductResponseModel)
        }
        else {
            const queriedSingleData: Result<ProductEntity| null> = await this.productRepo.findOne(id)
            
            return handleResult(queriedSingleData, ProductResponseModel)
        }
    }

    async updateProduct(requestModel: UpdateProductRequestModel) {
        const inputRequestModel: UpdateProductRequestModel = plainToInstance(UpdateProductRequestModel, requestModel).withDefaults()
        const inputEntity: ProductEntity = plainToInstance(ProductEntity, inputRequestModel)
        const updatedData: Result<ProductEntity> = await this.productRepo.update(inputEntity.id, inputEntity)

        return handleResult(updatedData, ProductResponseModel, HttpStatus.CONFLICT)
    }

    async deletedProduct(id: number) {
        const deletedData = await this.productRepo.delete(id)

        return handleResultWithoutMapping(deletedData)
    }

    async userWithProudct(requestModel: UserWithProductRequestModel) {
        this.logger.log(`User with product function input: ${requestModel.id}`)
        const userData: UserResponseModel | UserResponseModel[] = await this.userService.findAll(requestModel.id)
        const productData: ProductResponseModel = await this.findAll()

        const responseData: UserWithProductResponseModel = new UserWithProductResponseModel()
        responseData.user = userData
        responseData.products = productData

        return handleResultWithoutMapping(Result.ok(responseData))
    }
}