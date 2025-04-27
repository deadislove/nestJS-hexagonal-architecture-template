import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModuleLoader } from './module-loader';
import { ConfigModule } from '@config/config.module';
import { LoggerModule } from '@shared/logger/logger.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    ...ModuleLoader.load()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
