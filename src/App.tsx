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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { FC } from "react"
import { getRandomNumber } from "./lib/utils"

const DummyTable:FC = () => {

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
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
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

const tabs = ['report1', 'report2', 'report3', 'report4']

function App() {

  return (
    <Tabs defaultValue="report1" className="p-[32px] w-[100%]">
      <TabsList className="grid w-full grid-cols-4">
        {tabs.map((v,i) => <TabsTrigger key={v} value={v}>{`Report ${i + 1}`}</TabsTrigger>)}
      </TabsList>
        {tabs.map((v,i) => (
          <TabsContent key={v} value={v}>
            <DummyTable />
          </TabsContent>
        ))}
    </Tabs>
    
  )
}

export default App
