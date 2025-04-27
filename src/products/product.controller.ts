import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ProductService } from "./application/product.service";
import { CoreRequest } from "@shared/dto/core-request.dto";
import { CreateProductRequestModel, UpdateProductRequestModel, UserWithProductRequestModel } from "./application/dto/requests";
import { ProductResponseModel } from "./application/dto/responses";

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    async getProducts() {
        return await this.productService.findAll()
    }

    @Get(':id')
    async getProduct(
        @Param('id', ParseIntPipe) id: number
    ) {
        if (id === 0) {
            throw new HttpException('id can not equal to 0.', HttpStatus.BAD_REQUEST)
        }

        const responseData = await this.productService.findAll(id)
        return responseData
    }

    @Post()
    async create(
        @Body() requestModel: CoreRequest<CreateProductRequestModel>
    ){
        const inputRequest:CreateProductRequestModel = requestModel.payload
        const responseData:ProductResponseModel = await this.productService.createProduct(inputRequest)
        return responseData
    }

    @Put(':id')
    async updateProduct(
        @Param('id', ParseIntPipe) id:number,
        @Body() requestModel: CoreRequest<UpdateProductRequestModel>
    ){
        if(id !== requestModel.payload.id) {
            throw new HttpException('Parameter ID must equal to request model info.', HttpStatus.BAD_REQUEST)
        }

        const responseData:ProductResponseModel = await this.productService.updateProduct(requestModel.payload)
        return responseData
    }

    @Delete(':id')
    async deleteProduct(
        @Param('id', ParseIntPipe) id:number
    ) {
        if(id === 0) {
            throw new HttpException('Parameter ID can\'t equal to 0', HttpStatus.BAD_REQUEST)
        }

        const responseData: boolean = await this.productService.deletedProduct(id)
        return responseData
    }

    @Post('/userwithproduct/:userId')
    async getProductWithUser(
        @Param('userId', ParseIntPipe) id: number,
        @Body() requestModel: CoreRequest<UserWithProductRequestModel>
    ){
        if(id !== requestModel.payload.id) {
            throw new HttpException('Parameter ID must equal to request model info.', HttpStatus.BAD_REQUEST)
        }

        const responseData = await this.productService.userWithProudct(requestModel.payload)

        return responseData
    }
}