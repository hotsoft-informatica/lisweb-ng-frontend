import { Cep } from '../model/cep.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CepService {
  resultado: Cep |null = null;
  cep = new Cep();
  constructor(private http: HttpClient) { }

  public consultar(cep: string): Observable<Cep>{ // consultar Cep
    return this.http.get<Cep>(`https://viacep.com.br/ws/${cep}/json/`);
    // http orientado ao site de consulta
  }
}
