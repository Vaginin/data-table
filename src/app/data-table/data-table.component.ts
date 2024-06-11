import { Component, OnInit } from '@angular/core';
import { DataTableService } from './data-table.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDataPopupComponent } from './modal-windows/add-data-popup/add-data-popup.component';
import { EditDataPopupComponent } from './modal-windows/edit-data-popup/edit-data-popup.component';
import { DeleteDataPopupComponent } from './modal-windows/delete-data-popup/delete-data-popup.component';
import { ThemePalette } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  dataList: any[] = [];
  displayedColumns: string[] = ['checkbox', 'name', 'surname', 'email', 'phone'];
  dataSource = new MatTableDataSource(this.dataList);

  allComplete: boolean = false;

  constructor(
    private _dataService: DataTableService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getData();
  }

  addDataPopup() {
    const dialogRef = this.dialog.open(AddDataPopupComponent, {
      minHeight: '593px',
      width: '448px',
    });

    dialogRef.afterClosed().subscribe((newData: any) => {
      if (newData) {
        this.dataList.push(newData);
        this.saveData();
        this.updateAllComplete();
        this.dataSource.data = this.dataList;
      }
    });
  }

  openEditDataPopup(row: any) {
    const dialogRef = this.dialog.open(EditDataPopupComponent, {
      minHeight: '593px',
      width: '448px',
      data: { element: row }
    });

    dialogRef.afterClosed().subscribe((updatedData: any) => {
      if (updatedData) {
        const index = this.dataList.findIndex(item => item === row);
        if (index !== -1) {
          this.dataList[index] = { ...row, ...updatedData };
          this.saveData();
          this.updateAllComplete();
          this.dataSource.data = this.dataList;
        }
      }
    });
  }

  getData() {
    const storedData = localStorage.getItem('dataList');
    if (storedData) {
      this.dataList = JSON.parse(storedData);
    } else {
      this._dataService.getDataTableList().subscribe((data: any) => {
        this.dataList = data.users;
        this.saveData();
        this.updateAllComplete();
      });
    }
    this.dataSource.data = this.dataList;
    this.updateAllComplete();
  }

  updateAllComplete() {
    this.allComplete = this.dataList != null && this.dataList.every((t: any) => t.completed);
  }

  someComplete(): boolean {
    if (this.dataList == null) {
      return false;
    }
    return this.dataList.filter((t: any) => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.dataList == null) {
      return;
    }
    this.dataList.forEach((t: any) => t.completed = completed);
    this.saveData();
  }

  toggleCompletion(element: any) {
    element.completed = !element.completed;
    this.updateAllComplete();
    this.saveData();
  }

  deleteSelected() {
    const selectedCount = this.dataList.filter((item: any) => item.completed).length;
    const dialogRef = this.dialog.open(DeleteDataPopupComponent, {
      width: '448px',
      minHeight: '300px',
      data: { count: selectedCount }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        this.dataList = this.dataList.filter((item: any) => !item.completed);
        this.saveData();
        this.updateAllComplete();
        this.dataSource.data = this.dataList;
      }
    });
  }

  isAnyRowSelected(): boolean {
    return this.dataList.some((item: any) => item.completed);
  }
  
applyFilter(event: any) {
  const value = (event.target as HTMLInputElement).value;
  const filterValue = value.trim().toLowerCase();
  this.dataSource.filter = filterValue;
}
  
  saveData() {
    localStorage.setItem('dataList', JSON.stringify(this.dataList));
  }
}
