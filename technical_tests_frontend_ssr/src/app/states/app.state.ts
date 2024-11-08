import { Item } from './item.model';

export interface AppState {
  items: ItemState;
}

export interface ItemState {
  items: Item[];
  loading: boolean;
  error: any;
}
