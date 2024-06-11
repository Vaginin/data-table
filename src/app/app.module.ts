import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from "@angular/router";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DataTableComponent } from "./data-table/data-table.component";
import { AddDataPopupComponent } from './data-table/modal-windows/add-data-popup/add-data-popup.component';
import { DeleteDataPopupComponent } from './data-table/modal-windows/delete-data-popup/delete-data-popup.component';
import { EditDataPopupComponent } from './data-table/modal-windows/edit-data-popup/edit-data-popup.component';


@NgModule({
    declarations: [
        AppComponent,
        DataTableComponent,
        AddDataPopupComponent,
        DeleteDataPopupComponent,
        EditDataPopupComponent
    ],
    imports: [
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatIconModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatCheckboxModule,
        MatTableModule,
        HttpClientModule,
        NoopAnimationsModule,
        MatButtonModule,
        AppRoutingModule,
        RouterModule.forRoot(routes, { useHash: true }),     
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }