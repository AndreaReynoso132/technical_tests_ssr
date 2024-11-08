import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 


import { CreateUserModalComponent } from '../components/create-user-modal/create-user-modal.component';
import { EditUserModalComponent } from '../components/edit-user-modal/edit-user-modal.component';
import { DeleteConfirmationModalComponent } from '../components/delete-confirmation-modal/delete-confirmation-modal.component';

@NgModule({
  declarations: [
    ListComponent,
    CreateUserModalComponent,
    EditUserModalComponent,
    DeleteConfirmationModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    InputTextModule,
    DialogModule,
    ButtonModule,
    BrowserAnimationsModule,
    MatSnackBarModule 
  ],
  exports: [
    ListComponent,
    CreateUserModalComponent,
    EditUserModalComponent,
    DeleteConfirmationModalComponent,
  ]
})
export class AbmModule { }
