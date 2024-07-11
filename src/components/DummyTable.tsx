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
import { getRandomNumber } from "@/lib/utils"
import { FC } from "react"

export const headers = ['Invoice', 'Status', 'Method', 'Amount']

export const DummyTable:FC = () => {

    const invoices = [
      {
        invoice: "INV001",
        paymentStatus: "Paid",
        paymentMethod: "Credit Card",
        totalAmount: getRandomNumber()
      },
      {
        invoice: "INV002",
        paymentStatus: "Pending",
        paymentMethod: "PayPal",
        totalAmount: getRandomNumber()
      },
      {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        paymentMethod: "Bank Transfer",
        totalAmount: getRandomNumber()
      },
      {
        invoice: "INV004",
        paymentStatus: "Paid",
        paymentMethod: "Credit Card",
        totalAmount: getRandomNumber()
      },
      {
        invoice: "INV005",
        paymentStatus: "Paid",
        paymentMethod: "PayPal",
        totalAmount: getRandomNumber()
      },
      {
        invoice: "INV006",
        paymentStatus: "Pending",
        paymentMethod: "Bank Transfer",
        totalAmount: getRandomNumber()
      },
      {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        paymentMethod: "Credit Card",
        totalAmount: getRandomNumber()
      },
    ]
    
    const total = invoices.reduce((acc, cur) => acc + cur.totalAmount,0)
  
    return (
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((v, i) => {
                const className = i === 0 ? "w-[100%]" : i === headers.length - 1 ? "text-right" : undefined;
                return <TableHead key={v} className={className}>{v}</TableHead>
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => {
            return (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="text-right">{`$${invoice.totalAmount.toFixed(2)}`}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">{`$${total.toFixed(2)}`}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
}