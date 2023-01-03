import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, Injector } from '@angular/core';
import { ExameAmostra } from '../model/exame-amostra.model';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ExameAmostraService extends BaseService {
  constructor(
    @Inject(Injector) public injector: Injector,
    public http: HttpClient) {
    super(injector, http);
    this.endpoint = 'exame_amostras'
  }

  readByAmostraId(amostraId: number | undefined,
     exameId: number | undefined): Observable<ExameAmostra[]> {
    let params = new HttpParams()

    if (amostraId as number > 0) {
      params = params.append('queryItem[amostra_id]', amostraId as number);
    }
    if (exameId as number > 0) {
      params = params.append('queryItem[exame_id]', exameId as number);
    }

    return this.http.get<ExameAmostra[]>(this.baseUrl, {
      params,
    });
  }
}
