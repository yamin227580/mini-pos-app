export interface CreateDataPayload {
  name: string;
  price: number;
}

export interface CreateExpensePayload {
  name: string;
  price: number;
}

export interface UpdateDataPayload {
  name: string;
  price: number;
}

export interface UpdateExpensePayload {
  name: string;
  price: number;
}

export interface ItemCategoryType {
  [name: string]: number;
}

export interface IconCategoryType {
  [nameForIcon: string]: string;
}

export interface CreateDate {
  date: string;
}
