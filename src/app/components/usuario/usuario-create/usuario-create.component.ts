import { ActivatedRoute, Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips'
import { MatAutocompleteSelectedEvent, MatAutocompleteModule } from '@angular/material/autocomplete';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from './../../model/usuario.model';
import { UsuarioService } from './../../service/usuario.service';
import { Observable } from 'rxjs';
import Validation from '../../../utils/validation';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-usuario-create',
    templateUrl: './usuario-create.component.html',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgIf, MatButtonModule, MatIconModule, NgFor, MatChipsModule, MatAutocompleteModule, MatOptionModule, MatCardModule, MatDialogModule, AsyncPipe]
})

export class UsuarioCreateComponent implements OnInit {
  hide = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  grupoCtrl = new UntypedFormControl();
  filteredGrupos: Observable<string[]>;
  grupos: string[] = [];
  allGrupos: string[] = ['Responsavel Técnico', 'Digitação', 'Recepção', 'Suporte'];
  auxSenhas = 0;
  usuario: Usuario;
  id: number;
  userForm!: UntypedFormGroup;
  submitted = false;

  @ViewChild('grupoInput') grupoInput: ElementRef<HTMLInputElement> = {} as ElementRef;


  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder
  ) {
    this.usuario = new Usuario({}); // criando usuario

    this.id = this.route.snapshot.paramMap.get('id') as unknown as number;
    if (this.id > 0) {
      this.load(this.id); // id > 0 carrega o usuario
    }
    this.filteredGrupos = this.grupoCtrl.valueChanges.pipe(
      startWith(null),
      map((grupo: string | null) => (grupo ? this._filter(grupo) : this.allGrupos.slice())),
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add
    if ((this.allGrupos.indexOf(value) >= 0) && (this.grupos.indexOf(value) < 0)) {
      this.grupos.push(value);
    }
    else {
      // Apresentar erro
    }

    // Clear
    event.chipInput?.clear();

    this.grupoCtrl.setValue(null);
  }

  remove(grupo: string): void {
    const index = this.grupos.indexOf(grupo);

    if (index >= 0) {
      this.grupos.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (this.grupos.indexOf(event.option.viewValue) < 0) {
      this.grupos.push(event.option.viewValue);
    }
    this.grupoInput.nativeElement.value = '';
    this.grupoCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allGrupos.filter(grupo => grupo.toLowerCase().includes(filterValue));
  }

  load(id: number): void {
    this.usuarioService
      .readById(id)

      .subscribe((usuario) => {
        this.usuario = usuario;
      });
  }
  update(): void {
    this.usuarioService.update(this.usuario).subscribe(() => {
    });
    this.router.navigate(['/usuarios/read/']);
  }
  createUsuario(): void {
    if (this.senhasDiferentes()) {
      return;
    }
    if (this.id > 0) {
      this.update();
    }
    else {
      console.table(this.usuario);
      this.usuarioService.create(this.usuario).subscribe(() => {
      });
    }
  }

  senhasDiferentes(): boolean {
    if (this.usuario.senha !== this.usuario.confirmaSenha) {
      this.usuarioService.showMessage('Senhas não conferem.');
      return true;
    }
    else {
      return false;
    }
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group(
      {
        nome: ['', Validators.required],
        login: ['', Validators.required],
        cargo: [''],
        grupos: [''],
        senha: ['', Validators.required],
        confirmaSenha: ['', Validators.required],
      },
      {
        validators: [Validation.match('senha', 'confirmaSenha')]
      }
    );
  }
}
