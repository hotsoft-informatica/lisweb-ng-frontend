import { UsuarioService } from './../../service/usuario.service';
import { Usuario } from './../../model/usuario.model';
import { Component, OnInit } from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-usuario-update',
  templateUrl: './usuario-update.component.html',
  styleUrls: ['./usuario-update.component.css']
})
export class UsuarioUpdateComponent implements OnInit {

  hide = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  grupoCtrl = new FormControl();
  filteredGrupos: Observable<string[]>;
  grupos: string[] = [];
  allGrupos: string[] = ['Responsavel Técnico', 'Digitação', 'Recepção', 'Suporte'];

  usuario: Usuario;
  id: number;

  @ViewChild('grupoInput') grupoInput: ElementRef<HTMLInputElement> = {} as ElementRef;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute
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
    if (this.id > 0){
      this.update();
    }
    else{
      console.table(this.usuario);
      this.usuarioService.create(this.usuario).subscribe(() => {
        this.router.navigate(['/usuarios/read']);
      });
    }
  }
  cancel(): void {
    this.router.navigate(['/usuarios/read']); // retorna /pacientes
   }

  ngOnInit(): void {
  }
}
