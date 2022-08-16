// TODO: Model de movimento conta
// import { LaboratoryDomain } from '../../model/laboratory-domain.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
// TODO: Service de movimento conta
//import { LaboratoryDomainService } from '../../service/laboratory-domain.service';
@Component({
  selector: 'app-movimento-conta-create',
  templateUrl: './movimento-conta-create.component.html',
  styleUrls: ['./movimento-conta-create.component.css'],
})
export class MovimentoContaCreateComponent implements OnInit {
  // TODO: Variavel local de movimento conta
  // laboratoryDomain: LaboratoryDomain;

  constructor(
    private router: Router,
    //private laboratoryDomainService: LaboratoryDomainService
  ) {
    //this.laboratoryDomain = new LaboratoryDomain({});
  }

  ngOnInit(): void { }

  /* createLaboratoryDomain(): void {
    this.laboratoryDomainService.create(this.laboratoryDomain).subscribe(() => {
      this.laboratoryDomainService.showMessage('Domínio criado com sucesso!');
      this.router.navigate(['/laboratorydomains']).then(() => {
        window.location.reload();
      });
    });
  }*/

  cancel(): void {
    // this.router.navigate(['/laboratorydomains']);
  }
}

