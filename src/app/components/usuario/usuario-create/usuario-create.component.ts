import { Usuario } from './../../model/usuario.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from './../../service/usuario.service';
import { Component, OnInit } from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import Validation from '../../../utils/validation';

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.css']
})

export class UsuarioCreateComponent implements OnInit {
  hide = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  grupoCtrl = new FormControl();
  filteredGrupos: Observable<string[]>;
  grupos: string[] = [];
  allGrupos: string[] = ['Responsavel Técnico', 'Digitação', 'Recepção', 'Suporte'];
  auxSenhas = 0;
  usuario: Usuario;
  id: number;
  userForm!: FormGroup;
  submitted = false;

  @ViewChild('grupoInput') grupoInput: ElementRef<HTMLInputElement> = {} as ElementRef;


  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
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
    if ((this.allGrupos.indexOf(value) >= 0)  && (this.grupos.indexOf(value) < 0)) {
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
    if (this.senhasDiferentes()){
      return;
    }
    if (this.id > 0){
      this.update();
    }
    else{
      console.table(this.usuario);
      this.usuarioService.create(this.usuario).subscribe(() => {
      console.log('criado');
      });
    }
    console.log('salvooooooou');
  }

  senhasDiferentes(): boolean {
    if (this.usuario.senha !== this.usuario.confirmaSenha) {
      console.log(this.usuario.senha);
      console.log(this.usuario.confirmaSenha);
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


