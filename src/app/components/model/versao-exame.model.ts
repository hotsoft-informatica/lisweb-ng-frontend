import { Base } from './base.model';
import { Marcacao } from './marcacao.model';
import { MetodoExame } from './metodo-exame.model';
import { ParametroVersaoExame } from './parametro-versao-exame.model';
import { TipoExame } from './tipo-exame.model';
import { TipoInstrumento } from 'src/app/components/model/tipo-instrumento.model';

export class VersaoExame extends Base{
  public laboratorio_id?: number;
  public versao?: number;
  public agrupamento?: number;
  public volume?: number;
  public diluicao?: number;
  public metodo_exame_id?: number;
  public tipo_exame_id?: number;
  public tipo_instrumento_id?: number;
  public material_biologico_id?: number;
  public laboratorio_apoio_id?: number;
  public marcacao_id?: number;
  public custo_laboratorio?: number;
  public dias_entrega_laboratorio?: number;
  public versao_exame_original_id?: number;
  public agrupamento_historico?: number;

  public tipo_propriedade?: string;
  public descricao?: string;
  public descritivo?: string;
  public analito?: string;
  public escala?: string;
  public status?: string;
  public aprovado?: string;
  public aspecto_temporal?: string;
  public cod_exame_laboratorio?: string;
  public recebe_material?: string;
  public amostra_exclusiva?: string;
  public permite_caracteres?: string;
  public unidade_resultado?: string;
  public mascara_edicao_resultado?: string;
  public cod_resultado_apoio?: string;
  public instrucao_compatibilizacao?: string;
  public versao_compatibilizacao_apoio?: string;
  public instrucao_compatibilizacao_obs?: string;
  public titulo_laudo?: string;
  public valor_referencia_texto?: string;
  public valor_referencia_apoio?: string;
  public usar_valor_referencia_texto?: string;

  public tipoInstrumento?: TipoInstrumento = new TipoInstrumento({});
  public data_hora_criacao?: Date = new Date();
  public laudagem_externa?: string;
  public laudagem_externa_coleta?: string;
  public agrupamento_amostra?: string;
  public laudo_banda_imagem?: BinaryType;
  public formula?: string;
  public tempo_repouso?: number;
  public tipoExame?: TipoExame = new TipoExame({});
  public metodoExame?: MetodoExame;
  public marcacao?: Marcacao;
  public parametrosVersaoExame?: ParametroVersaoExame[];

  constructor(values: VersaoExame) {
    super(values);
    Object.assign(this, values);
  }
}
