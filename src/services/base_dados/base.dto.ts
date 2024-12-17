export class RespostaDto {
  valor: number;
  texto: string;
}

export class DeParaDto {
  variaveis: string;
  Perguntas: string;
  Respostas: RespostaDto[];
}
