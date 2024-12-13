import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class BaseDadosService {
    private readonly data: any[];
    constructor() {
        // Carregar o arquivo JSON na inicialização
        const filePath = path.join(__dirname, '../../../src/assets/depara.json');
        this.data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    findResponse(variavel: string, valor: number) {
        const item = this.data.find((d) => d.variaveis === variavel);
        if (!item) {
            return { error: 'Variável não encontrada' };
        }

        const resposta = item.Respostas.find((r) => r.valor === valor);
        if (!resposta) {
            return { error: 'Valor não encontrado para a variável' };
        }

        return {
            Pergunta: item.Perguntas,
            Resposta: resposta.texto,
        };
    }
}
