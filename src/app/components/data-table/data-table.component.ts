import {
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CustomColumnDirective } from 'src/app/directives/custom-column.directive';
import { TableColumn, TableColumns } from './data-table.interface';

@Component({
  selector: 'app-data-table[rows][columns]',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements AfterViewInit, OnInit {
  private _rows?: any[];
  dataSource = new MatTableDataSource<any>();
  @Input() set rows(value: any) {
    this._rows = value;
    if (value) this.dataSource.data = value;
  }
  @Input() columns!: TableColumns;
  @Output() refresh = new EventEmitter<void>();
  displayedColumns!: string[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ContentChildren(CustomColumnDirective)
  customColumns!: QueryList<CustomColumnDirective>;
  @Input() rowClass?: (item: any) => string;
  @Input() showPagination = true;
  @Input() class: string = '';
  @Input() showSearcher = true;

  get rows() {
    return this._rows;
  }

  ngOnInit(): void {
    this.displayedColumns = this.columns.map((column) => column.field);
    if (!this._rows) this.dataSource.data = Array(5).fill(0);
  }

  ngAfterViewInit() {
    if (this.showPagination) this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRefresh() {
    this.refresh.emit();
  }

  getValue(column: TableColumn, row: any) {
    return column.valueFormatter
      ? column.valueFormatter(row)
      : row[column.field];
  }

  getTemplateRef(column: TableColumn) {
    const customColumn = this.customColumns.find(
      (item) => item.field == column.field
    );
    return customColumn?.templateRef;
  }
}
