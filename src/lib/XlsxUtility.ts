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
            console.log(data[i])
            try {
                const headers: string[] = Object.keys(data[i][0] as InvoiceType)
                const worksheet = XLSX.utils.json_to_sheet(data[i]);
                worksheet["!cols"] = [ { wch: 10 } ];
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

    return { exportToExcel };
}