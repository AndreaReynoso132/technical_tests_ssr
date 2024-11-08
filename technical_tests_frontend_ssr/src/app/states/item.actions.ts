import { createAction, props } from '@ngrx/store';
import { Item } from './item.model';

export const loadItems = createAction('[Item List] Load Items');
export const loadItemsSuccess = createAction('[Item List] Load Items Success', props<{ items: Item[] }>());
export const loadItemsFailure = createAction('[Item List] Load Items Failure', props<{ error: any }>());

export const addItem = createAction('[Item List] Add Item', props<{ item: Item }>());
export const addItemSuccess = createAction('[Item List] Add Item Success', props<{ item: Item }>());
export const addItemFailure = createAction('[Item List] Add Item Failure', props<{ error: any }>());

export const updateItem = createAction('[Item List] Update Item', props<{ item: Item }>());
export const updateItemSuccess = createAction('[Item List] Update Item Success', props<{ item: Item }>());
export const updateItemFailure = createAction('[Item List] Update Item Failure', props<{ error: any }>());

export const deleteItem = createAction('[Item List] Delete Item', props<{ id: number }>());
export const deleteItemSuccess = createAction('[Item List] Delete Item Success', props<{ id: number }>());
export const deleteItemFailure = createAction('[Item List] Delete Item Failure', props<{ error: any }>());
