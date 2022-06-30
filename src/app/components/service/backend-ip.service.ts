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
  backendIp: BackendIp;
  baseIp = '127.0.0.1';
  ipUrl: string = '';


  constructor(private snackbar: MatSnackBar) {
    this.backendIp = new BackendIp({ ip: this.baseIp })
  }

  showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  getUrl(): string {
    console.log("Passou pelo getUrl")
    this.ipUrl = `http://${this.getIp().ip}:3010`;
    console.warn(this.ipUrl);
    return this.ipUrl;
  }

  public setIp(ip: string | undefined): BackendIp {
    console.warn("ip: " + ip);
    this.baseIp = ip ? ip as unknown as string : this.baseIp;
    localStorage.setItem('ip', this.baseIp);
    this.backendIp = new BackendIp({ ip: this.baseIp });

    return this.backendIp;
  }

  public getIp(): BackendIp {
    let ip = localStorage.getItem('ip');
    this.backendIp.ip = ip as string;
    return this.setIp(this.backendIp.ip);
  }

}
