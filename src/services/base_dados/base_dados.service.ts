import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'csv-parser';
import { CsvService } from 'src/csv/csv.service';
// import { DeParaDto, RespostaDto } from './../base.dto';

@Injectable()
export class BaseDadosService {
    private data: any[];
    private data2: any[];
    constructor(private readonly csvService: CsvService) {
        this.initialize();
    }

    private async initialize() {
        const filePath = path.join(__dirname, '../../../src/assets/depara.csv');
        await this.csvService.processarCsv(filePath).then((data) => {
            console.log('voltou', data);
            this.data = data;
            console.log('Data carregada:', data.length, data[0]);
            for (let i = 0; i < data.length; i++) {
                console.log(data[i]);
                for (let j = 0; j < data[i].Respostas.length; j++) {
                    console.log(data[i].Respostas[j]);
                }
            }
        })
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
            pergunta: item.Perguntas,
            resposta: resposta.texto,
        };
    }

    findQuestionByValue(valor: string) {
        const resposta = this.data.find((r) => { console.log(r); return r.variaveis == valor });
        if (resposta) {
            return resposta.Perguntas;
        } else {
            return { error: 'Valor não encontrado para a variável' };
        }
    }
}
