import { IRepository } from "@shared/interfaces/repository.interface";
import { ProductEntity } from "../entities/product.entity";

export interface IProductRepositoryPort extends IRepository<ProductEntity> {}