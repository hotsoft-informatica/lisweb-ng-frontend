import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class NotaService extends BaseService{
  endpoint = '/notas';
}
