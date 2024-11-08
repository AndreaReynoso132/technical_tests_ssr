import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../../states/item.model';

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.scss']
})
export class CreateUserModalComponent implements OnInit {
  @Output() userCreated = new EventEmitter<Item>();
  @Input() users: Item[] = []; // Recibe la lista de usuarios desde el componente padre
  createUserForm!: FormGroup;
  isOpen = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createUserForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: [
        '',
        [Validators.required, Validators.pattern(/^\d{8}$/)],
        [this.dniExistsValidator()] // Usa el validador asíncrono
      ],
      rol: ['', Validators.required],
      usuario: ['', Validators.required],
      contrasenia: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/)
        ]
      ]
    });
  }

  dniExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const dniExists = this.users.some(user => user.dni === control.value);
      return of(dniExists ? { dniExists: true } : null);
    };
  }

  onSubmit(): void {
    if (this.createUserForm.valid) {
      const newItem: Item = this.createUserForm.value;
      this.userCreated.emit(newItem);
      this.close(); // Cierra el modal después de crear el usuario
      this.createUserForm.reset(); // Limpia el formulario
    } else {
      if (this.createUserForm.get('dni')?.errors?.['dniExists']) {
        this.showDniExistsError(); // Muestra el popup de error si el DNI ya existe
      }
      this.createUserForm.markAllAsTouched(); // Muestra todos los errores
    }
  }

  showDniExistsError(): void {
    this.snackBar.open('Ya existe un usuario con este DNI.', 'Cerrar', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }

  open(): void {
    this.isOpen = true;
    this.createUserForm.reset();
  }

  close(): void {
    this.isOpen = false;
    this.createUserForm.reset();
  }
}
