import { Amostra } from '../model/amostra.model';
import { Paciente } from '../model/paciente.model';
import { Exame } from '../model/exame.model';
import { MaterialBiologico } from '../model/material-biologico.model';
import { Coletor } from '../model/coletor.model';
import { Usuario } from '../model/usuario.model';
import { ConsultaAmostra } from '../model/consulta-amostra.model';
import { Query } from './../model/query.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ConsultaAmostraService {
  baseUrl = 'http://127.0.0.1:3010';
  amostraUrl = 'http://127.0.0.1:3010/paciente_amostra';
  exameUrl = 'http://127.0.0.1:3010/exames_paciente';
  exameAmostrasUrl = 'http://127.0.0.1:3010/exames_amostra';
  materialBiologicoUrl = 'http://127.0.0.1:3010/materiais_biologicos_paciente';
  coletorUrl = 'http://127.0.0.1:3010/coletores_paciente';
  pacienteUrl = 'http://127.0.0.1:3010/amostras_paciente';

  query: Query[] = [];

  constructor(private snackbar: MatSnackBar, private http: HttpClient) { }

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
