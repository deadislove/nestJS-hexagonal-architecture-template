import { Expose } from "class-transformer";

export class UserWithProductRequestModel {
    @Expose()
    public id:number
}