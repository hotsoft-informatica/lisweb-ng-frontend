import { BackendIpService } from './backend-ip.service';
import { BaseService } from './base.service';
import { ExameAmostra } from '../model/exame-amostra.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Injectable, Inject, Injector } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExameAmostraService extends BaseService {
  storage: Storage = window.localStorage;
  baseUrl = '/amostras_paciente';

  constructor(
    @Inject(Injector) public injector: Injector,
    private backendIpService: BackendIpService,
    public http: HttpClient) {
    super(injector, http);
    this.endpoint = 'exame_amostras'
    this.baseUrl = this.backendIpService.getUrl() + this.baseUrl;
  }

  readByAmostraId(amostraId: number | undefined,
    exameId: number | undefined): Observable<any> {
    let params = new HttpParams()


    if (amostraId as number > 0) {
      params = params.append('queryItem[amostra_id]', amostraId as number);
    }
    if (exameId as number > 0) {
      params = params.append('queryItem[exame_id]', exameId as number);
    }

    return this.http.get<ExameAmostra[]>(this.baseUrl, {
      params: params,
    });
  }
}
