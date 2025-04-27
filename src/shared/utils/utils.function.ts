import { HttpException, HttpStatus } from "@nestjs/common";
import { Result } from "@shared/core/result";
import { plainToInstance } from "class-transformer";

export function emptyArray<T>(): T[] {
    return []
}

export function handleFailure(result: Result<any>, status: HttpStatus = HttpStatus.BAD_REQUEST): never {
    throw new HttpException(result.error ?? 'Unknown error', status);
}