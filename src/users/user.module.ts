import { DynamicModule, Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./application/user.service";
import { UserTypeOrmRepository } from "./infra/typeorm/repositories/user-typeorm.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import UserTypeOrmEntity from "./infra/typeorm/entities/user.typeorm.entity";

@Module({})
export class UserModule {
    static register( { useMock = false }: { useMock?: boolean } = {}) : DynamicModule {
        return {
            module: UserModule,
            controllers: [ UserController ],
            providers: [
                UserService,
                {
                    provide: 'IUserRepositoryPort',
                    useClass: UserTypeOrmRepository,
                },
            ],
            imports: [
                TypeOrmModule.forFeature([
                    UserTypeOrmEntity
                ])
            ],
            exports: [
                UserService
            ]
        }
    }
}