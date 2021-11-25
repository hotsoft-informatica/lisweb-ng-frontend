import { Paciente } from '../model/paciente.model';
import { Exame } from '../model/exame.model';
import { MaterialBiologico } from '../model/material-biologico.model';
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
  amostraUrl = 'http://127.0.0.1:3010/amostras';
  exameUrl = 'http://127.0.0.1:3010/exames_paciente';
  materialBiologicoUrl = 'http://127.0.0.1:3010/materiais_biologicos_paciente';
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

    return this.http.get<ConsultaAmostra[]>(this.amostraUrl, {
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
}
