import { DynamicModule, Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./application/product.service";
import { ProductTypeOrmRepository } from "./infra/typeorm/repositories/product-typeorm.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import ProductTypeOrmEntity from "./infra/typeorm/entities/product.typeorm.entity";
import { UserService } from "@users/application/user.service";
import { UserModule } from "@users/user.module";
import { UserTypeOrmRepository } from "@users/infra/typeorm/repositories/user-typeorm.repository";
import { LoggerModule } from "@shared/logger/logger.module";

@Module({})
export class ProductModule {
    static register( {useMock = false}: {useMock?: boolean} = {}):DynamicModule {
        return {
            module: ProductModule,
            controllers: [
                ProductController
            ],
            providers: [
                ProductService,
                {
                    provide: 'IProductRepositoryPort',
                    useClass: ProductTypeOrmRepository
                },
            ],
            imports: [
                TypeOrmModule.forFeature([
                    ProductTypeOrmEntity
                ]),
                UserModule.register(),
                LoggerModule,
            ],
            exports: [
                ProductService
            ]
        }
    }
}