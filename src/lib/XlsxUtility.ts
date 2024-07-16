import { InvoiceType } from '@/types';
import * as XLSX from 'xlsx';

type ExportToExcelProps = {
    data: unknown[][];
    fileName: string;
}

export const useXlsxUtility = () => {
    const exportToExcel = ({ data, fileName }:ExportToExcelProps) => {

        const workbook = XLSX.utils.book_new();
        for(let i=0; i< data.length; i++) {
            try {
                const headers: string[] = Object.keys(data[i][0] as InvoiceType)
                const worksheet = XLSX.utils.json_to_sheet(data[i]);

                worksheet["!cols"] = autoFitColumns(data[i])
            
                // TODO 스타일링은 xlsx pro(유료)에서 됨 
                
                XLSX.utils.sheet_add_aoa(worksheet, [[...headers]], { origin: "A1" });
                XLSX.utils.book_append_sheet(workbook, worksheet, `Report ${i + 1}`);
 
            } catch (error) {
                console.error(error)
            }
        }

        try {
            XLSX.writeFile(workbook, `${fileName}.xlsx`, { compression: true });
        } catch (error) {
            console.error(error)
        }
    };

    // 열 너비를 자동으로 맞추기 위한 함수
    const autoFitColumns = (data: any[]) => {
        const columns = Object.keys(data[0])
        const columnWidths = columns.map((col: any) => {
          return {
            wch: Math.max(
                col.length + 5,
                ...data.map(row => {
                    const cellValue = row[col] ? String(row[col]) : '';
                    return cellValue.length;
                })
            )
          };
        });
        return columnWidths;
      };

    return { exportToExcel };
}