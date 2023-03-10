import { Amostra } from '../model/amostra.model';
import { BackendIpService } from './backend-ip.service';
import { ConsultaAmostra } from '../model/consulta-amostra.model';
import { Exame } from '../model/exame.model';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MaterialBiologico } from '../model/material-biologico.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Paciente } from '../model/paciente.model';
import { Query } from './../model/query.model';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class ConsultaAmostraService {
  amostraUrl = '/amostras';
  baseUrl = '';
  coletorUrl = '/coletores_paciente';
  exameAmostrasUrl = '/exames_amostra';
  exameUrl = '/exames_paciente';
  materialBiologicoUrl = '/materiais_biologicos_paciente';
  pacienteAmostraUrl = '/paciente_amostra';
  pacienteUrl = '/amostras_paciente';
  storage: Storage = window.localStorage;

  query: Query[] = [];

  constructor(
    private snackbar: MatSnackBar,
    private http: HttpClient,
    private backendIpService: BackendIpService
  ) {
    this.amostraUrl = backendIpService.getUrl() + this.amostraUrl;
    this.baseUrl = this.backendIpService.getUrl() + this.baseUrl;
    this.coletorUrl = backendIpService.getUrl() + this.coletorUrl;
    this.exameAmostrasUrl = backendIpService.getUrl() + this.exameAmostrasUrl;
    this.exameUrl = backendIpService.getUrl() + this.exameUrl;
    this.materialBiologicoUrl = backendIpService.getUrl() + this.materialBiologicoUrl;
    this.pacienteAmostraUrl = backendIpService.getUrl() + this.pacienteAmostraUrl;
    this.pacienteUrl = backendIpService.getUrl() + this.pacienteUrl;
  }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  findConsultaAmostra(query: Query[] | null): Observable<ConsultaAmostra[]> {

    let params = new HttpParams();

    query?.forEach((queryItem) => {
      if (queryItem) {
        const key = `queryItem[${queryItem.key}]`;
        params = params.append(key, queryItem.value);
      }
    });

    return this.http.get<ConsultaAmostra[]>(this.exameAmostrasUrl, {
      params: params,
    });
  }

  findAmostraId(id: string | undefined): Observable<Amostra> {


    // TODO: Implementar busca por num_amostra e nao ID!
    const url = `${this.amostraUrl}/${id}`;
    return this.http.get<Amostra>(url);
  }

  findAmostra(query: Query[] | null): Observable<Amostra> {
    let params = new HttpParams();

    query?.forEach((queryItem) => {
      if (queryItem) {
        const key = `queryItem[${queryItem.key}]`;
        params = params.append(key, queryItem.value);
      }
    });

    return this.http.get<Amostra>(this.pacienteAmostraUrl, {
      params: params,
    });
  }

  findPaciente(query: Query[] | null): Observable<Paciente> {

    let params = new HttpParams();

    query?.forEach((queryItem) => {
      if (queryItem) {
        const key = `queryItem[${queryItem.key}]`;
        params = params.append(key, queryItem.value);
      }
    });

    return this.http.get<Paciente>(this.pacienteUrl, {
      params: params,
    });
  }

  findExame(query: Query[] | null): Observable<Exame> {
    let params = new HttpParams();


    query?.forEach((queryItem) => {
      if (queryItem) {
        const key = `queryItem[${queryItem.key}]`;
        params = params.append(key, queryItem.value);
      }
    });

    return this.http.get<Exame>(this.exameUrl, {
      params: params,
    });
  }

  findMaterialBiologico(query: Query[] | null): Observable<MaterialBiologico> {
    let params = new HttpParams();


    query?.forEach((queryItem) => {
      if (queryItem) {
        const key = `queryItem[${queryItem.key}]`;
        params = params.append(key, queryItem.value);
      }
    });

    return this.http.get<MaterialBiologico>(this.materialBiologicoUrl, {
      params: params,
    });
  }

  findColetor(query: Query[] | null): Observable<Usuario> {

    let params = new HttpParams();

    query?.forEach((queryItem) => {
      if (queryItem) {
        const key = `queryItem[${queryItem.key}]`;
        params = params.append(key, queryItem.value);
      }
    });

    return this.http.get<Usuario>(this.coletorUrl, {
      params: params,
    });
  }
}
