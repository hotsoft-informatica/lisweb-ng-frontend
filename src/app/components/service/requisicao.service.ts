import { Medicos } from './../model/medicos.model';
import { LocalDeAtendimento } from 'src/app/components/model/local-de-atendimento.model';
import { Requisicao } from './../model/requisicao.model';
import { Query } from './../model/query.model';
import { BackendIpService } from './backend-ip.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Exame } from '../model/exame.model';
import { Paciente } from '../model/paciente.model';
import { Convenios } from '../model/convenios.model';

@Injectable({
  providedIn: 'root',
})
export class RequisicaoService {
  baseUrl = '/requisicoes/';

  query: Query[] = [];

  constructor(
    private snackbar: MatSnackBar,
    private http: HttpClient,
    private backendIpService: BackendIpService
  ) {
    this.baseUrl = this.backendIpService.getUrl() + this.baseUrl;
  }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
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

  searchMedico(requisicaoId: number): Observable<Medicos> {
    return this.http.get<Medicos>(this.baseUrl + requisicaoId + '/medico');
  }

  searchConvenio(requisicaoId: number): Observable<Convenios> {
    return this.http.get<Convenios>(this.baseUrl + requisicaoId + '/convenio');
  }

  create(requisicao: Requisicao): Observable<Requisicao> {
    return this.http.post<Requisicao>(this.baseUrl, requisicao);
  }

  read(): Observable<Requisicao[]> {
    return this.http.get<Requisicao[]>(this.baseUrl);
  }

  readById(id: number): Observable<Requisicao> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Requisicao>(url);
  }

  update(requisicao: Requisicao): Observable<Requisicao> {
    const url = `${this.baseUrl}/${requisicao.id}`;
    return this.http.put<Requisicao>(url, requisicao);
  }

  delete(id: number): Observable<Requisicao> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Requisicao>(url);
  }

  findRequisicoes(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<Requisicao[]> {
    let params = new HttpParams()
      .set('active', active)
      .set('sortOrder', sortOrder)
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    query?.forEach((queryItem) => {
      if (queryItem) {
        const key = `queryItem[${queryItem.key}]`;
        params = params.append(key, queryItem.value);
      }
    });

    return this.http.get<Requisicao[]>(this.baseUrl, {
      params,
    });
  }

  countRequisicoes(): Observable<number> {
    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
    });
  }
}
