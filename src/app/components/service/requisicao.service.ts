import { BaseService } from './base.service';
import { Convenios } from '../model/convenios.model';
import { Exame } from '../model/exame.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, Injector } from '@angular/core';
import { LocalDeAtendimento } from 'src/app/components/model/local-de-atendimento.model';
import { Medico } from '../model/medico.model';
import { Observable } from 'rxjs';
import { Paciente } from '../model/paciente.model';

@Injectable({
  providedIn: 'root',
})
export class RequisicaoService extends BaseService {
  constructor(
    @Inject(Injector) public injector: Injector,
    public http: HttpClient) {
    super(injector, http);
    this.endpoint = 'requisicoes'
  }

  searchExames(requisicaoId: number): Observable<Exame[]> {
    return this.http.get<Exame[]>(this.baseUrl + requisicaoId + '/exames');
  }

  searchPaciente(requisicaoId: number): Observable<Paciente> {
    return this.http.get<Paciente>(this.baseUrl + requisicaoId + '/paciente');
  }

  searchLocalDeAtendimento(requisicaoId: number): Observable<LocalDeAtendimento> {
    return this.http.get<LocalDeAtendimento>(this.baseUrl + requisicaoId + '/locais_atendimento');
  }

  searchMedico(requisicaoId: number): Observable<Medico> {
    return this.http.get<Medico>(this.baseUrl + requisicaoId + '/medico');
  }

  searchConvenio(requisicaoId: number): Observable<Convenios> {
    return this.http.get<Convenios>(this.baseUrl + requisicaoId + '/convenio');
  }
}
