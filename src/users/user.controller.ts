import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { UserService } from "./application/user.service";
import { CoreRequest } from "@shared/dto/core-request.dto";
import { CreateUserRequestModel, UpdateUserRequestModel } from "./application/dto/requests";
import { UserResponseModel } from "./application/dto/responses";

@Controller('user') 
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getUsers() {
        return await this.userService.findAll()
    }

    @Get(':id')
    async getUserById(
        @Param('id', ParseIntPipe) id:number
    ) {

        if(id === 0) {
            throw new HttpException('id can not equal to 0.', HttpStatus.BAD_REQUEST)
        }

        const responseData: UserResponseModel | UserResponseModel[] = await this.userService.findAll(id)
        return responseData
    }

    @Post()
    async create(
        @Body() requestModel: CoreRequest<CreateUserRequestModel>
    ) {
        const inputRequest:CreateUserRequestModel = requestModel.payload
        const responseData:UserResponseModel = await this.userService.createUser(inputRequest)
        return responseData
    }

    @Put(':id')
    async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() requestModel: CoreRequest<UpdateUserRequestModel>
    ) {
        if(id !== requestModel.payload.id) {
            throw new HttpException('Parameter ID must equal to request model info.', HttpStatus.BAD_REQUEST)
        }

        const responseData:UserResponseModel = await this.userService.updateUser(requestModel.payload)
        return responseData
    }

    @Delete(':id')
    async deleteUser(
        @Param('id', ParseIntPipe) id:number
    ){
        if(id === 0) {
            throw new HttpException('Parameter ID can\'t equal to 0', HttpStatus.BAD_REQUEST)
        }

        const responseData:boolean = await this.userService.deletedUser(id)
        return responseData
    }
}