import { Expose } from "class-transformer";

export class FindUserRequestModel {
    @Expose()
    email:string | null
}