import { ApiResponse } from "@shared/dto/api-resposne.dto";

export class ResponseUtil {
    static success<T>(data: T, code:number = 200): ApiResponse<T> {
        return ApiResponse.success(data, code)
    }

    static fail<T>(errors: string[], code:number = 400): ApiResponse<T> {
        return ApiResponse.fail(errors, code)
    }
}