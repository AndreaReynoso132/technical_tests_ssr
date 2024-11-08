import { createReducer, on } from '@ngrx/store';
import { ItemState } from './app.state';
import * as ItemActions from './item.actions';

export const initialState: ItemState = {
  items: [],
  loading: false,
  error: null
};

export const itemReducer = createReducer(
  initialState,

  // Cargar 
  on(ItemActions.loadItems, state => ({ ...state, loading: true })),
  on(ItemActions.loadItemsSuccess, (state, { items }) => ({ ...state, items, loading: false })),
  on(ItemActions.loadItemsFailure, (state, { error }) => ({ ...state, error, loading: false })),

  // Agregar
  on(ItemActions.addItem, state => ({ ...state, loading: true })),
  on(ItemActions.addItemSuccess, (state, { item }) => ({
    ...state,
    items: [...state.items, item],
    loading: false
  })),
  on(ItemActions.addItemFailure, (state, { error }) => ({ ...state, error, loading: false })),

 //Actualizar
  on(ItemActions.updateItem, state => ({ ...state, loading: true })),
  on(ItemActions.updateItemSuccess, (state, { item }) => ({
    ...state,
    items: state.items.map(existingItem =>
      existingItem.id === item.id ? { ...existingItem, ...item } : existingItem
    ),
    loading: false
  })),
  on(ItemActions.updateItemFailure, (state, { error }) => ({ ...state, error, loading: false })),

  //Eliminar
  on(ItemActions.deleteItem, state => ({ ...state, loading: true })),
  on(ItemActions.deleteItemSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter(i => i.id !== id),
    loading: false
  })),
  on(ItemActions.deleteItemFailure, (state, { error }) => ({ ...state, error, loading: false })) 
)
