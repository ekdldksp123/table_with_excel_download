import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { FC, useCallback, useEffect, useState } from "react"
import { 
  IgrExcelModule, 
  Workbook, 
  WorkbookFormat 
} from 'igniteui-react-excel';
import { DummyTable } from "@/components/DummyTable";
import { headers } from "@/constants";
import { getRandomInvoices } from "@/lib/utils";
import { useExcelUtility } from "@/lib/ExcelUtility";
import { useXlsxUtility } from "./lib/XlsxUtility";

IgrExcelModule.register();

const tabs = ['report1', 'report2', 'report3', 'report4', 'report5']

const App:FC = () => {

  const reports = Array.from({length:tabs.length}, () => getRandomInvoices())
  const {save} = useExcelUtility()
  const {exportToExcel} = useXlsxUtility()

  const [workbook, setWorkBook] = useState<Workbook>()
  const [canSave, setCanSave] = useState<boolean>(false)

  useEffect(() => {
    loadWorkBook()
  },[])

  const loadWorkBook = () => {
    const wb = new Workbook(WorkbookFormat.Excel2007);
    for(let tabIndex = 0; tabIndex < tabs.length; tabIndex++) {
      // 시트 추가
      const sheet = wb.worksheets().add(tabs[tabIndex]);
      // 테이블 col 추가
      const header = sheet.rows(0); 

      for (let col = 0; col < headers.length; col++) {
        sheet.columns(col).width = 5000;
        header.setCellValue(col, headers[col]);
      }

      // 테이블 row 추가
      let total:number = 0;
      for (let i = 0; i < reports[tabIndex].length; i++) {
        const wr = sheet.rows(i+1);
        const values = Object.values(reports[tabIndex][i])

        for (let j = 0; j < values.length; j++) {
          if(typeof values[j] === 'number') {
            total += values[j] as number
          }

          wr.setCellValue(j, typeof values[j] === 'number' ? (values[j] as number).toFixed(2) : values[j]);
        }
      }

      // Total row 추가
      if(reports.length && reports[0].length) {
        const keys = Object.keys(reports[0][0])
        const wr = sheet.rows(8)
        wr.setCellValue(0, 'Total')
        wr.setCellValue(keys.length-1, total.toFixed(2));
      }

    }
    setWorkBook(wb)
    setCanSave(wb !== null)
  }

  const workbookSave = useCallback((): void => {
    if (canSave && workbook) {
        save(workbook, "Simple Reports").then((f: any) => {
            console.log("Saved:" + f);
        }, (e: any) => {
            console.error("ExcelUtility.Save Error:" + e);
        });
    } else {
      alert('Error :: cannot save excel file')
    }
  },[canSave, workbook])

  return (
    <main className="grid w-full grid-cols-2">
      <section className="grid gap-5 p-[32px] w-[100%]">
        <span className="text-[48px]">igniteui-react-excel</span>
        <Button onClick={workbookSave}>Download Excel</Button>
        <Tabs defaultValue="report1">
          <TabsList className="grid w-full grid-cols-5">
            {tabs.map((v,i) => <TabsTrigger key={v} value={v}>{`Report ${i + 1}`}</TabsTrigger>)}
          </TabsList>
            {tabs.map((v, i) => (
              <TabsContent key={v} value={v}>
                <DummyTable invoices={reports[i]}/>
              </TabsContent>
            ))}
        </Tabs>
      </section>
      <section className="grid gap-5 p-[32px] w-[100%]">
      <span className="text-[48px]">xlsx</span>
        <Button onClick={() => exportToExcel({fileName: 'Export by Xlsx TEST', data: reports})}>Download Excel</Button>
        <Tabs defaultValue="report1">
          <TabsList className="grid w-full grid-cols-5">
            {tabs.map((v,i) => <TabsTrigger key={v} value={v}>{`Report ${i + 1}`}</TabsTrigger>)}
          </TabsList>
            {tabs.map((v, i) => (
              <TabsContent key={v} value={v}>
                <DummyTable invoices={reports[i]}/>
              </TabsContent>
            ))}
        </Tabs>
      </section>
    </main>
    
    
  )
}

export default App
