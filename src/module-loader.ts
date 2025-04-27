import { DatabaseModule } from "@infra/typeorm/database/database.module";
import { DynamicModule } from "@nestjs/common";
import { ProductModule } from "@products/product.module";
import { UserModule } from "@users/user.module";

export class ModuleLoader {
    static load(): DynamicModule[] {
        return [
            DatabaseModule.register(),
            UserModule.register(),
            ProductModule.register(),
        ]
    }
}