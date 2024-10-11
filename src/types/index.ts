export type InvoiceType = {
  invoice: string;
  transactionId: string;
  paymentStatus: string;
  paymentMethod: string;
  totalAmount: number;
};

export type ItemValueType = string | string[] | number | boolean | null | undefined;

export interface ILineItem {
  id?: number;
  [key: string]: ItemValueType;
  base: string;
}

export type GridGroup = {
  title: string;
  key: string;
  index?: number;
  children?: GridGroup[];
  items?: ILineItem[];
};

export type GridData = {
  division?: ItemValueType;
  [key: string]: ItemValueType;
};
