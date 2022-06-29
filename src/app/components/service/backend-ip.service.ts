import { Injectable } from '@angular/core';
import { BackendIp } from '../model/backend-ip.model';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { combineLatest } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class BackendIpService {
  [x: string]: any;
  backendIp: BackendIp;

  baseIp = '127.0.0.1';

  public ipUrl = `http://${this.baseIp}:3010`;

  constructor() {
    this.backendIp = new BackendIp({ ip: this.baseIp })
  }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  public setIp(ip: string | undefined): BackendIp {
    console.warn(ip);
    this.baseIp = ip ? ip as unknown as string : this.baseIp;
    localStorage.setItem('ip', this.baseIp);
    this.backendIp = new BackendIp({ ip: this.baseIp });
    return this.backendIp;
  }

  public getIp(): BackendIp {
    return this.setIp('');
  }

}
