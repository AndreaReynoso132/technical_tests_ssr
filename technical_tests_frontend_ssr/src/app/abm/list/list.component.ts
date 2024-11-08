import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Item } from '../../states/item.model';
import { AppState } from '../../states/app.state';
import * as ItemActions from '../../states/item.actions';
import { CreateUserModalComponent } from '../../components/create-user-modal/create-user-modal.component';
import { EditUserModalComponent } from '../../components/edit-user-modal/edit-user-modal.component';
import { DeleteConfirmationModalComponent } from '../../components/delete-confirmation-modal/delete-confirmation-modal.component';
import { AuthService } from '../../states/auth.service'; 
import * as FileSaver from 'file-saver';


interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  items$: Observable<Item[]>;
  items: Item[] = [];
  columns: Column[] = [];
  hasError: boolean = false;
  sortField: keyof Item | null = null;
  sortOrder: 'asc' | 'desc' = 'asc';
  users: Item[] = [];
  userName: string | undefined;

  private subscription: Subscription = new Subscription();

  @ViewChild(CreateUserModalComponent) createModal!: CreateUserModalComponent;
  @ViewChild(EditUserModalComponent) editModal!: EditUserModalComponent;
  @ViewChild(DeleteConfirmationModalComponent) deleteModal!: DeleteConfirmationModalComponent;

  constructor(private store: Store<AppState>, private authService: AuthService) {
    this.items$ = this.store.select(state => state.items.items);
    this.userName = authService.getUserName();
  }

  applyFilter(event: Event, field: string, table: any): void {
    const inputElement = event.target as HTMLInputElement;
    table.filter(inputElement.value, field, 'contains');
  }

  ngOnInit(): void {
    this.store.dispatch(ItemActions.loadItems());

    this.subscription = this.items$.subscribe(
      items => {
        this.items = items || [];
        this.users = items || [];
        this.hasError = false;

        if (items && items.length > 0) {
          this.columns = Object.keys(items[0]).map(key => ({
            field: key,
            header: this.capitalizeFirstLetter(key)
          }));
        }
      },
      error => {
        this.hasError = true;
        this.items = [];
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  downloadCSV() {
    const csvContent = this.generateCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    FileSaver.saveAs(blob, 'usuarios.csv');
  }

  generateCSV(): string {
    const headers = ['usuario', 'nombre', 'apellido', 'dni', 'rol'];
    const rows = this.items.map(item => 
      headers.map(header => item[header]).join(',')
    );
    return [headers.join(','), ...rows].join('\n');
  }
  
  sortBy(field: keyof Item): void {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }

    this.items = [...this.items].sort((a, b) => {
      const aValue = a[field]?.toString().toLowerCase();
      const bValue = b[field]?.toString().toLowerCase();

      if (aValue < bValue) return this.sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }

  openCreateModal(): void {
    this.createModal.open();
  }

  openEditModal(item: Item): void {
    if (item.id !== undefined) {
      this.editModal.open(item);
    } else {
      console.error("Intento de editar un item sin id", item);
    }
  }

  openDeleteModal(item: Item): void {
    this.deleteModal.open(item);
  }

  onUserCreated(user: Item): void {
    this.store.dispatch(ItemActions.addItem({ item: user }));
  }

  onUserUpdated(updatedUser: Item): void {
    this.items = this.items.map(item => 
      item.id === updatedUser.id ? updatedUser : item
    );
  }
  

  onUserDeleted(userId: number): void {
    this.store.dispatch(ItemActions.deleteItem({ id: userId }));
  }

  capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  logout() {
    this.authService.logout();
  }
}
