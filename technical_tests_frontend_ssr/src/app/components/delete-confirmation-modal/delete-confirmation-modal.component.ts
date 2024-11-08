import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation-modal',
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrls: ['./delete-confirmation-modal.component.scss']
})
export class DeleteConfirmationModalComponent {
  visible: boolean = false;
  message: string = '';
  success: boolean = false;

  @Input() userToDelete: { id: number; usuario: string } | null = null;
  @Output() confirmDelete = new EventEmitter<number>();

  open(user: { id: number; usuario: string }) {
    this.userToDelete = user;
    this.visible = true;
    this.message = ''; 
  }

  close() {
    this.visible = false;
  }

  confirmDeleteAction() {
    if (this.userToDelete) {
      this.confirmDelete.emit(this.userToDelete.id);
      this.message = `El usuario"${this.userToDelete.usuario}" fue eliminado exitosamente.`;
      this.success = true;
      setTimeout(() => this.close(), 2000);
    } else {
      this.message = 'Error deleting user.';
      this.success = false;
    }
  }
}
