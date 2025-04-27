import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Result } from "@shared/core/result";
import { UserEntity } from "@users/domain/entities/user.entity";
import { IUserRepositoryPort } from "@users/domain/interfaces/user.repository";
import { plainToInstance } from "class-transformer";
import { CreateUserRequestModel, FindUserRequestModel, UpdateUserRequestModel } from "./dto/requests";
import { UserResponseModel } from "./dto/responses";
import { handleResult, handleResultWithoutMapping } from "@shared/core/result-helper";

@Injectable()
export class UserService {
    constructor(
        @Inject('IUserRepositoryPort')
        private readonly userRepo: IUserRepositoryPort
    ){}

    async createUser(requestModel: CreateUserRequestModel): Promise<UserResponseModel> {
        let createUserEntity: UserEntity = plainToInstance(UserEntity, requestModel)
        let savedResult:Result<UserEntity> = await this.userRepo.create(createUserEntity)

        return handleResult(savedResult, UserResponseModel)
    }

    async findAll(id: number = 0):Promise<UserResponseModel | UserResponseModel[]> {
        if(id === 0) {
            const queriedData: Result<UserEntity[]> = await this.userRepo.findAll()

            return handleResult(queriedData, UserResponseModel)
        } else {
            const queriedSingleData:Result<UserEntity | null> = await this.userRepo.findOne(id)

            return handleResult(queriedSingleData, UserResponseModel)
        }
    }

    async findUserByEmail(requestModel: FindUserRequestModel): Promise<UserResponseModel> {

        if(requestModel.email) {
            const findDataByEmail:Result<UserEntity | null> = await this.userRepo.findByEmail(requestModel.email)

            return handleResult(findDataByEmail, UserResponseModel)

        } else {
            throw new HttpException('Email property must have a value.', HttpStatus.BAD_REQUEST)
        }
        
    }

    async updateUser(requestModel: UpdateUserRequestModel): Promise<UserResponseModel> {
        const inputEntity:UserEntity = plainToInstance(UserEntity, requestModel)
        const updatedData:Result<UserEntity> = await this.userRepo.update(inputEntity.id, inputEntity)

        return handleResult(updatedData, UserResponseModel, HttpStatus.CONFLICT)
    }

    async deletedUser(id: number):Promise<boolean> {
        const deletedData = await this.userRepo.delete(id)

        return handleResultWithoutMapping(deletedData)
    }
}