import { HttpStatus } from "@nestjs/common";
import { Result } from "./result";
import { handleFailure } from "@shared/utils/utils.function";
import { plainToInstance } from "class-transformer";

export function handleResult<T, R>(result: Result<T>, model: new() => R, statusCode: HttpStatus = HttpStatus.BAD_REQUEST):R {
    if(result.isFailure) {
        handleFailure(result, statusCode)
    }
    return plainToInstance(model, result.getValue())
}

export function handleResultWithoutMapping<T>(result: Result<T>, statusCode: HttpStatus = HttpStatus.BAD_REQUEST) {
    if(result.isFailure) {
        handleFailure(result, statusCode)
    }

    return result.getValue()
}