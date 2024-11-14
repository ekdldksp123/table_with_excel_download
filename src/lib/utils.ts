import { GridGroup, InvoiceType } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { v4 as uuid } from 'uuid';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getRandomNumber = (): number => {
  // 0부터 1000까지의 랜덤 숫자 생성
  return Math.random() * 1000;
};

export const getRandomInvoices = (): InvoiceType[] => {
  return [
    {
      invoice: 'INV001',
      transactionId: uuid(),
      paymentStatus: 'Paid',
      paymentMethod: 'Credit Card',
      totalAmount: getRandomNumber(),
    },
    {
      invoice: 'INV002',
      transactionId: uuid(),
      paymentStatus: 'Pending',
      paymentMethod: 'PayPal',
      totalAmount: getRandomNumber(),
    },
    {
      invoice: 'INV003',
      transactionId: uuid(),
      paymentStatus: 'Unpaid',
      paymentMethod: 'Bank Transfer',
      totalAmount: getRandomNumber(),
    },
    {
      invoice: 'INV004',
      transactionId: uuid(),
      paymentStatus: 'Paid',
      paymentMethod: 'Credit Card',
      totalAmount: getRandomNumber(),
    },
    {
      invoice: 'INV005',
      transactionId: uuid(),
      paymentStatus: 'Paid',
      paymentMethod: 'PayPal',
      totalAmount: getRandomNumber(),
    },
    {
      invoice: 'INV006',
      transactionId: uuid(),
      paymentStatus: 'Pending',
      paymentMethod: 'Bank Transfer',
      totalAmount: getRandomNumber(),
    },
    {
      invoice: 'INV007',
      transactionId: uuid(),
      paymentStatus: 'Unpaid',
      paymentMethod: 'Credit Card',
      totalAmount: getRandomNumber(),
    },
  ];
};

export const getColMaxDepth = (columns: GridGroup[]): number => {
  return columns.reduce((depth, column) => {
    if (column.children) {
      return Math.max(depth, getColMaxDepth(column.children) + 1);
    }
    return depth;
  }, 0);
};

export const getRowMaxDepth = (rows: GridGroup[], currentDepth = 1): number => {
  return rows.reduce((maxDepth, row) => {
    const childDepth = row.children ? getRowMaxDepth(row.children, currentDepth + 1) : currentDepth;
    return Math.max(maxDepth, childDepth);
  }, 0);
};

export const getRowSpan = (row: GridGroup): number => {
  if (!row.children || !row.children.length) {
    return 1;
  }

  return row.children.reduce((total, child) => total + getRowSpan(child), 0);
};

export const getColSpan = (column: GridGroup, idx: number, depth: number, rowMaxDepth: number): number => {
  if (!column.children) {
    if (depth === 0 && idx === 0 && rowMaxDepth > 1) {
      return rowMaxDepth;
    }
    return 1;
  }

  return column.children.reduce((span, child, index) => span + getColSpan(child, index, depth + 1, rowMaxDepth), 0);
};

export const getMaxDepth = (groups: GridGroup[], currentDepth = 1): number => {
  return groups.reduce((maxDepth, group) => {
    const childDepth = group.children ? getMaxDepth(group.children, currentDepth + 1) : currentDepth;
    return Math.max(maxDepth, childDepth);
  }, 0);
};

export const amountToLocaleString = (amount: number) => {
  return amount === 0 ? '-' : amount.toLocaleString(undefined, { maximumFractionDigits: 2 });
};
