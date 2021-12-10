import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LaboratoryDomain } from './laboratory-domain.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class LaboratoryDomainService {
  baseUrl = 'http://127.0.0.1:3010/laboratory_domains';

  constructor(private snackbar: MatSnackBar, private http: HttpClient) { }

  handleError(error: HttpErrorResponse): Observable<LaboratoryDomain[]> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

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
    return this.http
      .get<LaboratoryDomain[]>(this.baseUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  readById(id: number): Observable<LaboratoryDomain> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<LaboratoryDomain>(url);
  }

  update(laboratoryDomain: LaboratoryDomain): Observable<LaboratoryDomain> {
    const url = `${this.baseUrl}/${laboratoryDomain.id}`;
    return this.http.put<LaboratoryDomain>(url, laboratoryDomain);
  }

  delete(id: number): Observable<LaboratoryDomain> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<LaboratoryDomain>(url);
  }
}
