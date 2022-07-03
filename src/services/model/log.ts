export class Log {
    tipo: TipoLog;
    mensagem: string;

    constructor(tipo: TipoLog, mensagem: string){
        this.tipo = tipo;
        this.mensagem = mensagem;
    }
}

export enum TipoLog {
    info,
    erro,
}