import { UserResponseModel } from "@users/application/dto/responses";
import { ProductResponseModel } from "./product-response.dto";

export class UserWithProductResponseModel {
    user: UserResponseModel | UserResponseModel[]
    products: ProductResponseModel | ProductResponseModel[]
}