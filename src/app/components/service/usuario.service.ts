import { Usuario } from './../model/usuario.model';
import { Query } from './../model/query.model';
import { BackendIpService } from './backend-ip.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  associationUrl = '/usuarios_dominio';
  baseUrl = '/usuarios';
  storage: Storage = window.localStorage;

  query: Query[] = [];

  constructor(
    private snackbar: MatSnackBar,
    private http: HttpClient,
    private backendIpService: BackendIpService
  ) {
    this.baseUrl = backendIpService.getUrl() + this.baseUrl;
    this.associationUrl = backendIpService.getUrl() + this.associationUrl;
  }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseUrl, usuario);
  }

  read(
    sortActive: string = 'id',
    sortDirection: string = 'desc',
    pageNumber = 0,
    pageSize = 3,
    queries: Query[]): Observable<Usuario[]> { // criando parametros e puxando dados do backend
    let params = new HttpParams(); // cria paramaetros para leitura do backend

    queries.forEach(busca => {
      params = params.append(busca.key, busca.value); // comunicação com backend key=busca value=valor do item
    });
    params = params.append('sortActive', sortActive); // Qual coluna sera ordenada
    params = params.append('sortDirection', sortDirection); // Ordem desc ou asc
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    queries?.forEach((queryItem) => {
      if (queryItem) {
        const key = `queryItem[${queryItem.key}]`;
        params = params.append(key, queryItem.value);
      }
    });

    return this.http.get<Usuario[]>(this.baseUrl, { params }); // Passa qual operação sera realizada pelo backend
  }

  getAssocLmUsuariosId(id: number): Observable<Usuario[]> {
    const url = `${this.associationUrl}/${id}`;
    console.log(url);
    return this.http.get<Usuario[]>(url);
  }

  readById(id: number): Observable<Usuario> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Usuario>(url);
  }

  update(usuario: Usuario): Observable<Usuario> {
    const url = `${this.baseUrl}/${usuario.id}`;
    return this.http.put<Usuario>(url, usuario);
  }

  delete(id: number): Observable<Usuario> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Usuario>(url);
  }

  readByEmail(email: String): Observable<Usuario> {
    const url = `${this.baseUrl}/email/${email}`;
    return this.http.get<Usuario>(url);
  }

  readByUsuario(usuario: String): Observable<Usuario> {
    const url = `${this.baseUrl}/usuario/${usuario}`;
    return this.http.get<Usuario>(url);
  }

  findUsuarios(
    active: string = '',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 3,
    query: Query[] | null
  ): Observable<Usuario[]> {

    let auth: string = this.storage.getItem('Authorization') as string;
    let headers = new HttpHeaders()
      .set('Authorization', auth);

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

    return this.http.get<Usuario[]>(this.baseUrl, {
      params: params,
      headers: headers
    });


  }

  countUsuarios(): Observable<number> {
    let auth: string = this.storage.getItem('Authorization') as string;
    let headers = new HttpHeaders().set('Authorization', auth);

    return this.http.get<number>(this.baseUrl, {
      params: new HttpParams().set('totalCount', 'true'),
      headers: headers
    });
  }
}
