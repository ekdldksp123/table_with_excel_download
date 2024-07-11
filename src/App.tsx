import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { FC } from "react"
import { 
  IgrExcelModule, 
  Workbook, 
  Worksheet, 
  WorkbookFormat 
} from 'igniteui-react-excel';
import { DummyTable, headers } from "./components/DummyTable";

IgrExcelModule.register();

const tabs = ['report1', 'report2', 'report3', 'report4']

const App:FC = () => {

  const onClickDownload = () => {
    const wb = new Workbook(WorkbookFormat.Excel2007);
    for(const tab of tabs) {
      const sheet = wb.worksheets().add(tab);
      const header = sheet.rows(0);

      for (let col = 0; col < headers.length; col++) {
        sheet.columns(col).width = 5000;
        header.setCellValue(col, headers[col]);
      }
      
    }
  }

  return (
    <main className="grid gap-5 p-[32px] w-[100%]">
      <Button onClick={onClickDownload}>Download Excel</Button>
      <Tabs defaultValue="report1">
        <TabsList className="grid w-full grid-cols-4">
          {tabs.map((v,i) => <TabsTrigger key={v} value={v}>{`Report ${i + 1}`}</TabsTrigger>)}
        </TabsList>
          {tabs.map((v) => (
            <TabsContent key={v} value={v}>
              <DummyTable />
            </TabsContent>
          ))}
      </Tabs>
    </main>
    
    
  )
}

export default App
