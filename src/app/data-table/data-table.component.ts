import { Component } from '@angular/core';
import { DataTableService } from './data-table.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  imports: [HttpClientModule],
  standalone: true,
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent {

constructor (
  private _dataService: DataTableService
) {}

dataList: any = []

getData() {
  this._dataService.getDataTableList().subscribe((data: any) => {})
}

ngOnInit() {
this.getData()
}

}
