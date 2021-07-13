import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LaboratoryDomain } from './laboratory-domain.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class LaboratoryDomainService {
  baseUrl = 'http://127.0.0.1:3010/laboratory_domains';

  constructor(private snackbar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  create(laboratoryDomain: LaboratoryDomain): Observable<LaboratoryDomain> {
    return this.http.post<LaboratoryDomain>(this.baseUrl, laboratoryDomain);
  }

  read(): Observable<LaboratoryDomain[]> {
    return this.http.get<LaboratoryDomain[]>(this.baseUrl);
  }

}
