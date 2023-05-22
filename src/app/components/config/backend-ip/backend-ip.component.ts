import { Component, OnInit, AfterViewInit, } from '@angular/core';
import { BackendIp } from '../../model/backend-ip.model';
import { BackendIpService } from '../../service/backend-ip.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-backend-ip',
    templateUrl: './backend-ip.component.html',
    standalone: true,
    imports: [MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class BackendIpComponent implements OnInit {
  backendIp!: BackendIp;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private backendIpService: BackendIpService,
  ) {
    this.backendIp = this.backendIpService.getIp();
  }

  ngOnInit(): void { }

  setIp(): void {
    this.backendIp = this.backendIpService.setIp(this.backendIp.ip as string);
    this.backendIpService.showMessage('Ip inserido com sucesso!');
    window.location.reload();
  }

  cancel(): void {
    this.router.navigate(['']);
  }

}
