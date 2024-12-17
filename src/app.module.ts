import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseDadosService } from './services/base_dados/base_dados.service';
import { CsvService } from './csv/csv.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, BaseDadosService, CsvService],
})
export class AppModule {}
