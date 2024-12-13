import { Controller, Get, Query } from '@nestjs/common';
import { BaseDadosService } from './services/base_dados/base_dados.service';

@Controller()
export class AppController {
  constructor(private readonly bdService: BaseDadosService) { }

  @Get('get-text')
  getText(
    @Query('variavel') variavel: string,
    @Query('valor') valor: string,
  ) {
    const valorNumber = parseInt(valor, 10);
    if (isNaN(valorNumber)) {
      return { error: 'O valor deve ser um número' };
    }

    return this.bdService.findResponse(variavel, valorNumber);
  }
}
