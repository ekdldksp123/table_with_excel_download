import { InvoiceType } from "@/types"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { v4 as uuid } from 'uuid';
 
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const getRandomNumber = (): number => {
  // 0부터 1000까지의 랜덤 숫자 생성
  return Math.random() * 1000;
}

export const getRandomInvoices = (): InvoiceType[] => {
  return [
    {
      invoice: "INV001",
      transactionId: uuid(),
      paymentStatus: "Paid",
      paymentMethod: "Credit Card",
      totalAmount: getRandomNumber()
    },
    {
      invoice: "INV002",
      transactionId: uuid(),
      paymentStatus: "Pending",
      paymentMethod: "PayPal",
      totalAmount: getRandomNumber()
    },
    {
      invoice: "INV003",
      transactionId: uuid(),
      paymentStatus: "Unpaid",
      paymentMethod: "Bank Transfer",
      totalAmount: getRandomNumber()
    },
    {
      invoice: "INV004",
      transactionId: uuid(),
      paymentStatus: "Paid",
      paymentMethod: "Credit Card",
      totalAmount: getRandomNumber()
    },
    {
      invoice: "INV005",
      transactionId: uuid(),
      paymentStatus: "Paid",
      paymentMethod: "PayPal",
      totalAmount: getRandomNumber()
    },
    {
      invoice: "INV006",
      transactionId: uuid(),
      paymentStatus: "Pending",
      paymentMethod: "Bank Transfer",
      totalAmount: getRandomNumber()
    },
    {
      invoice: "INV007",
      transactionId: uuid(),
      paymentStatus: "Unpaid",
      paymentMethod: "Credit Card",
      totalAmount: getRandomNumber()
    },
  ]
}