import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { Item } from '../../states/item.model';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})
export class EditUserModalComponent {

  visible: boolean = false;
  editForm: FormGroup;
  passwordVisible: boolean = false; 

  @Input() itemToEdit!: Item;
  @Input() users: Item[] = []; 
  @Output() userUpdated = new EventEmitter<Item>();

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) { 
    this.editForm = this.fb.group({
      id: ['', Validators.required],
      usuario: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: [
        '',
        [Validators.required, Validators.pattern(/^\d{8}$/)],
        [this.dniExistsValidator()]
      ],
      rol: ['', Validators.required],
      contrasenia: [
        '',
        [Validators.minLength(8)] 
      ]
    });
  }

  dniExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const dni = control.value;
      const dniExists = this.users.some(user => user.dni === dni && user.id !== this.itemToEdit.id);
      return of(dniExists ? { dniExists: true } : null);
    };
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  open(item: Item): void {
    this.itemToEdit = item; 
    this.editForm.patchValue({
      id: item.id,
      usuario: item.usuario,
      nombre: item.nombre,
      apellido: item.apellido,
      dni: item.dni,
      rol: item.rol,
      contrasenia: ''  
    });
    this.visible = true;
  }

  close() {
    this.visible = false;
  }

  onSubmit() {
    if (this.editForm.valid) {
      const updatedItem = { ...this.itemToEdit, ...this.editForm.value };
      this.userUpdated.emit(updatedItem);
      this.snackBar.open('Usuario modificado con éxito', 'Cerrar', {
        duration: 3000,
        panelClass: ['custom-snack-bar', 'custom-snack-bar-container'] 
      });
      this.close();
    } else {
      this.editForm.markAllAsTouched();
    }
  }
  
}
