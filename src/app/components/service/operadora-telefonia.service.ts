import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OperadoraTelefoniaService extends BaseService {
  baseUrl = '/operadoras_telefonia';

  constructor(
    @Inject(Injector) public injector: Injector,
    public http: HttpClient) {
    super(injector, http);
    this.endpoint = 'operadoras_telefonia'
  }
}
