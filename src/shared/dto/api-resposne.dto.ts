export class ApiResponse<T> {
    code: number = 200
    data?: T
    errors: string[] = []

    constructor(partial?: Partial<ApiResponse<T>>) {
        if(partial) {
            Object.assign(this, partial)
        }
    }

    static success<T>(data: T, code:number =200): ApiResponse<T> {
        return new ApiResponse<T>({code, data})
    }

    static fail<T>(errors: string[], code: number = 400): ApiResponse<T> {
        return new ApiResponse<T>({ code, errors })
    }
}