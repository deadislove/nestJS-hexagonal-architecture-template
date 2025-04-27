export class CoreRequest<T> {
    constructor(
      public readonly payload: T,
      public readonly meta?: {
        requestId?: string;
        clientIp?: string;
        [key: string]: any; // for future meta info
      }
    ) {}
  }
  