import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as ItemActions from './item.actions';
import { ItemService } from './item.service';
import { Item } from './item.model';

@Injectable()
export class ItemEffects {
  constructor(
    private actions$: Actions,
    private itemService: ItemService
  ) {}

  // Efecto para cargar items
  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.loadItems),
      mergeMap(() =>
        this.itemService.getItems().pipe(
          map((items: Item[]) => ItemActions.loadItemsSuccess({ items })),
          catchError(error => of(ItemActions.loadItemsFailure({ error })))
        )
      )
    )
  );

  // Efecto para agregar un nuevo item
  addItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.addItem),
      mergeMap(action =>
        this.itemService.createItem(action.item).pipe(
          map((item: Item) => ItemActions.addItemSuccess({ item })),
          catchError(error => of(ItemActions.addItemFailure({ error })))
        )
      )
    )
  );

  // Efecto para actualizar un item
  updateItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.updateItem),
      mergeMap(action =>
        this.itemService.updateItem(action.item).pipe(
          map((item: Item) => ItemActions.updateItemSuccess({ item })),
          catchError(error => of(ItemActions.updateItemFailure({ error })))
        )
      )
    )
  );

  // Efecto para eliminar un item
  deleteItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.deleteItem),
      mergeMap(action =>
        this.itemService.deleteItem(action.id).pipe(
          map(() => ItemActions.deleteItemSuccess({ id: action.id })),
          catchError(error => of(ItemActions.deleteItemFailure({ error })))
        )
      )
    )
  );
}
