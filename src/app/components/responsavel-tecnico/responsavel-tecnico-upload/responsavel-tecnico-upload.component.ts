import { UploadFileComponent } from './../../upload-file/upload-file.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Event } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ResponsavelTecnico } from '../../model/responsavel-tecnico.model';
import { ResponsavelTecnicoService } from '../../service/responsavel-tecnico.service';

@Component({
  selector: 'app-responsavel-tecnico-upload',
  templateUrl: './responsavel-tecnico-upload.component.html',
  styleUrls: ['./responsavel-tecnico-upload.component.css']
})
export class ResponsavelTecnicoUploadComponent implements OnInit {
  responsavel_tecnico: ResponsavelTecnico;
  selectedFile!: File;
  fileName: string = '';
  formData!: FormData;

  constructor(
    private responsavelTecnicoService: ResponsavelTecnicoService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.responsavel_tecnico = new ResponsavelTecnico({});
    console.table(this.responsavel_tecnico);
    this.formData = new FormData();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.table(id);
    if (id as unknown as number > 0) {
      this.responsavelTecnicoService
        .readById(id as unknown as number)
        .subscribe((responsavel_tecnico) => {
          console.table(responsavel_tecnico);
          this.responsavel_tecnico = responsavel_tecnico;
        });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    if (this.selectedFile) {
      console.log(this.selectedFile);
      this.formData.append("selectedFile", this.selectedFile);
    }
  }

  onUpload() {
    this.responsavelTecnicoService
      .upload(this.formData, this.responsavel_tecnico)
      .subscribe((retorno: any) => {
        console.table(retorno);
      });
    this.router.navigate(['/responsavel_tecnicos']).then(() => {
      window.location.reload();
    });
  }

  cancel(): void {
    this.router.navigate(['/responsavel_tecnicos']);
  }
}
