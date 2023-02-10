import { Inject, Injector } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Query } from '../model/query.model';
import { BaseService } from 'src/app/components/service/base.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
})
export class BaseComponent implements OnInit {
  model: string = '/laboratorios'
  query: Query[] = [];
  totalCount!: number;
  dataSource: any[] = [];

  constructor(@Inject(Injector) public injector: Injector) { }

  private get baseService() {
    return this.injector.get(BaseService);
  }

  load(endpoint:string): void {
    this.model = (endpoint.length > 0) ? endpoint : this.model;
    this.baseService.read(
      'id',
      'desc',
      1,
      500,
      this.query,
      this.model
    ).subscribe((records: any) => {
      this.dataSource = records;
    });
  }

  search(key: string, value: string, isNumeric: boolean = false): void {
    const query = new Query({ key, value, isNumeric });
    this.query = this.query.filter((q) => q.key !== key);
    this.query.push(query);
    this.load(this.model);
  }

  ngOnInit(): void {
    this.load(this.model);
  }
}
