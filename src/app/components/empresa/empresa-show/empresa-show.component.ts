import { Component, OnInit } from '@angular/core';
import { Empresa } from './../../model/empresa.model';
import { EmpresaService } from '../../service/empresa.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-empresa-show',
  templateUrl: './empresa-show.component.html',
  styleUrls: ['./empresa-show.component.css'],
})
export class EmpresaShowComponent implements OnInit {
  empresa!: Empresa;
  id: any;

  constructor(
    private empresaService: EmpresaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.load(this.id);
  }

  ngOnInit(): void { }

  load(id: number): void {
    this.empresaService
      .readById(id as unknown as number)
      .subscribe((empresa) => {
        this.empresa = empresa;
      });
  }

  cancel(): void {
    this.router.navigate(['/empresas']);
  }
}
