import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class LancamentoService extends BaseService {
  endpoint = '/lancamentos';
}
