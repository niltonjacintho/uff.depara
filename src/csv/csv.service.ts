import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { DeParaDto, RespostaDto } from './../services/base_dados/base.dto';
import { resolve } from 'path';
import { rejects } from 'assert';


@Injectable()
export class CsvService {


  async processarCsv(caminhoArquivo: string): Promise<DeParaDto[]> {
    return new Promise(async (resolve, reject) => {
      const dados: DeParaDto[] = [];
      const csvOptions = {
        separator: ';',
        quote: '"',
        escape: '\\',
        headers: false,
      };

      await fs.createReadStream(caminhoArquivo)
        .pipe(csv(csvOptions))
        .on('data', (linha: string[]) => {
          var dp: DeParaDto = new DeParaDto();
          dp.variaveis = linha[0];
          dp.Perguntas = linha[1];
          dp.Respostas = [];
          for (const key in linha) {
            if (linha.hasOwnProperty(key)) {
              // Pular se a chave for '0' ou '1'
              if (key !== '0' && key !== '1') {
                if (linha[key] != '') {
                  var r: RespostaDto = new RespostaDto();
                  r.texto = linha[key];
                  r.valor = Number(key) - 1;
                  dp.Respostas.push(r);
                }
              }
              //   console.log(`Chave: ${key}, Valor: ${linha[key]}`);
            }
          }
          dados.push(dp);
          dp = new DeParaDto();
          //     return dados;
        })
        .on('end', () => {
          console.log('CSV lido com sucesso!');
          resolve(dados);
        })
        .on('error', (err) => {
          console.error('Erro ao ler CSV:', err);
          throw err;
        });
      return dados;
    });
  }
}

