import { 
    Table, 
    TableBody, 
    TableCaption, 
    TableCell, 
    TableFooter, 
    TableHead, 
    TableHeader, 
    TableRow 
  } from "@/components/ui/table"
import { headers } from "@/constants"
import { InvoiceType } from "@/types"
import { FC } from "react"


interface DummyTableProps {
  invoices: InvoiceType[]
}

export const DummyTable:FC<DummyTableProps> = ({invoices}) => {
  
  const total = invoices.reduce((acc, cur) => acc + cur.totalAmount,0)
  
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          {headers.map((v, i) => {
              const className = i === 0 ? "w-[20%]" : i === headers.length - 1 ? "text-right" : undefined;
              return <TableHead key={v} className={className}>{v}</TableHead>
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => {
          return (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell>{invoice.transactionId}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell className="text-right">{`$${invoice.totalAmount.toFixed(2)}`}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
      {invoices.length && (
        <TableFooter>
          <TableRow>
            <TableCell colSpan={Object.keys(invoices[0]).length-1}>Total</TableCell>
            <TableCell className="text-right">{`$${total.toFixed(2)}`}</TableCell>
          </TableRow>
        </TableFooter>
      )}
      
    </Table>
  )
}