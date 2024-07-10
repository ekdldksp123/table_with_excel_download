import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const getRandomNumber = (): number => {
  // 0부터 1000까지의 랜덤 숫자 생성
  return Math.random() * 1000;
}