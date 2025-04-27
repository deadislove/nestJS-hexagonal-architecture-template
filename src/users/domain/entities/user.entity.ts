import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UserEntity {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    email: string;
}
