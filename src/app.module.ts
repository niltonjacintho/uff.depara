import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseDadosService } from './services/base_dados/base_dados.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, BaseDadosService],
})
export class AppModule {}
