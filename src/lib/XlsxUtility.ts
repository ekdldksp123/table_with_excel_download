import { InvoiceType } from '@/types';
import * as XLSX from 'xlsx-js-style';

type ExportToExcelProps = {
  data: unknown[][];
  fileName: string;
};

export const useXlsxUtility = () => {
  const exportToExcel = ({ data, fileName }: ExportToExcelProps) => {
    const workbook = XLSX.utils.book_new();
    for (let i = 0; i < data.length; i++) {
      try {
        const headers: string[] = Object.keys(data[i][0] as InvoiceType);
        const worksheet = XLSX.utils.json_to_sheet(data[i]);

        worksheet['!cols'] = autoFitColumns(data[i]);

        // TODO 스타일링은 xlsx pro(유료)에서 됨

        // STEP 3: Create worksheet with rows; Add worksheet to workbook

        XLSX.utils.sheet_add_aoa(worksheet, [[...headers]], { origin: 'A1' });
        XLSX.utils.book_append_sheet(workbook, worksheet, `Report ${i + 1}`);

        const merges = ['A1:B1', 'C1:D1'].map((range) => XLSX.utils.decode_range(range));

        if (!worksheet['!merges']) worksheet['!merges'] = [];

        for (const merge of merges) {
          worksheet['!merges'].forEach(function (range) {
            if (merge.e.r < range.s.r) return;
            if (range.e.r < merge.s.r) return;
            if (merge.e.c < range.s.c) return;
            if (range.e.c < merge.s.c) return;
            throw new Error(XLSX.utils.encode_range(merge) + ' overlaps ' + XLSX.utils.encode_range(range));
          });
          worksheet['!merges'].push(merge);
        }
      } catch (error) {
        console.error(error);
      }
    }

    try {
      XLSX.writeFile(workbook, `${fileName}.xlsx`, { compression: true });
    } catch (error) {
      console.error(error);
    }
  };

  // 열 너비를 자동으로 맞추기 위한 함수
  const autoFitColumns = (data: any[]) => {
    const columns = Object.keys(data[0]);
    const columnWidths = columns.map((col: any) => {
      return {
        wch: Math.max(
          col.length + 5,
          ...data.map((row) => {
            const cellValue = row[col] ? String(row[col]) : '';
            return cellValue.length;
          }),
        ),
      };
    });
    return columnWidths;
  };

  const excelStyleTest = () => {
    const wb = XLSX.utils.book_new();

    // STEP 2: Create data rows and styles
    let row = [
      { v: 'Courier: 24', t: 's', s: { font: { name: 'Courier', sz: 24 } } },
      { v: 'bold & color', t: 's', s: { font: { bold: true, color: { rgb: 'FF0000' } } } },
      { v: 'fill: color', t: 's', s: { fill: { fgColor: { rgb: 'E9E9E9' } } } },
      { v: 'line\nbreak', t: 's', s: { alignment: { wrapText: true } } },
    ];

    // STEP 3: Create worksheet with rows; Add worksheet to workbook
    const ws = XLSX.utils.aoa_to_sheet([row]);
    XLSX.utils.book_append_sheet(wb, ws, 'readme demo');

    // STEP 4: Write Excel file to browser
    XLSX.writeFile(wb, 'xlsx-js-style-demo.xlsx');
  };
  return { exportToExcel, excelStyleTest };
};
