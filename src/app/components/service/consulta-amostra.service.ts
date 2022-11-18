import { Amostra } from '../model/amostra.model';
import { Paciente } from '../model/paciente.model';
import { Exame } from '../model/exame.model';
import { MaterialBiologico } from '../model/material-biologico.model';
import { Coletor } from '../model/coletor.model';
import { Usuario } from '../model/usuario.model';
import { ConsultaAmostra } from '../model/consulta-amostra.model';
import { Query } from './../model/query.model';
import { BackendIpService } from './backend-ip.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ConsultaAmostraService {
  baseUrl = '';
  amostraUrl = '/paciente_amostra';
  exameUrl = '/exames_paciente';
  exameAmostrasUrl = '/exames_amostra';
  materialBiologicoUrl = '/materiais_biologicos_paciente';
  coletorUrl = '/coletores_paciente';
  pacienteUrl = '/amostras_paciente';

  query: Query[] = [];

  constructor(
    private snackbar: MatSnackBar,
    private http: HttpClient,
    private backendIpService: BackendIpService
  ) {
    this.baseUrl = this.backendIpService.getUrl() + this.baseUrl;
    this.amostraUrl = backendIpService.getUrl() + this.amostraUrl;
    this.exameUrl = backendIpService.getUrl() + this.exameUrl;
    this.exameAmostrasUrl = backendIpService.getUrl() + this.exameAmostrasUrl;
    this.materialBiologicoUrl = backendIpService.getUrl() + this.materialBiologicoUrl;
    this.coletorUrl = backendIpService.getUrl() + this.coletorUrl;
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
      params,
    });
  }

  findAmostra(query: Query[] | null): Observable<Amostra> {
    let params = new HttpParams();
    query?.forEach((queryItem) => {
      if (queryItem) {
        const key = `queryItem[${queryItem.key}]`;
        params = params.append(key, queryItem.value);
      }
    });

    return this.http.get<Amostra>(this.amostraUrl, {
      params,
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
      params,
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
      params,
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
      params,
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
      params,
    });
  }
}
