import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map } from 'rxjs/operators'
import { Observable } from "rxjs";
import { ResponseUtil } from "@shared/utils/response.util";

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data) => {
                return ResponseUtil.success(data)
            })
        )
    }
}