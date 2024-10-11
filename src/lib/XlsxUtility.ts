import { GridData, GridGroup, InvoiceType } from '@/types';
import * as XLSX from 'xlsx-js-style';
import { getColMaxDepth, getRowMaxDepth } from './utils';

type ExportToExcelProps = {
  reports: Record<string, { rows: GridGroup[]; columns: GridGroup[]; data: GridData[] }>;
  fileName: string;
};

const ALPHABET_LIST = Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 65));

export const useXlsxUtility = () => {
  const addColumns = (gridData: any[][], columns: GridGroup[], colMaxDepth: number) => {
    const processColumn = (col: GridGroup, depth: number) => {
      if (!gridData[depth]) {
        gridData[depth] = [];
      }
      const currentIndex = gridData[depth].length;
      gridData[depth].push(col.title);

      if (col.children && col.children.length > 0) {
        col.children.forEach((child) => processColumn(child, depth + 1));
      } else {
        for (let i = depth + 1; i < colMaxDepth; i++) {
          if (!gridData[i]) {
            gridData[i] = [];
          }
          gridData[i].push(null); // 병합된 경우 아래 셀은 비워둡니다.
        }
      }
    };

    columns.forEach((col) => processColumn(col, 0));
  };

  const addRows = (gridData: any[][], rows: GridGroup[], rowMaxDepth: number, data: GridData[]) => {
    const processRow = (row: GridGroup, depth: number, rowIndex: number) => {
      if (!gridData[rowIndex]) {
        gridData[rowIndex] = [];
      }

      gridData[rowIndex][depth] = row.title;

      if (row.children && row.children.length > 0) {
        row.children.forEach((child) => processRow(child, depth + 1, rowIndex));
      } else {
        for (let i = depth + 1; i < rowMaxDepth; i++) {
          gridData[rowIndex][i] = null; // 병합된 경우 오른쪽 셀은 비워둡니다.
        }
      }

      // 데이터 추가
      data.forEach((rowData, i) => {
        const rowDataIndex = rowIndex + i;
        if (!gridData[rowDataIndex]) {
          gridData[rowDataIndex] = [];
        }
        gridData[rowDataIndex][depth] = rowData[row.key];
      });
    };

    rows.forEach((row, index) => processRow(row, 0, index));
  };

  const exportToExcel = ({ reports, fileName }: ExportToExcelProps) => {
    const workbook = XLSX.utils.book_new();
    for (const sheetName in reports) {
      try {
        // const headers: string[] = Object.keys(data[i][0] as InvoiceType);
        const { columns, rows, data } = reports[sheetName];

        const colMaxDepth = getColMaxDepth(columns);
        const rowMaxDepth = getRowMaxDepth(rows);

        //TODO
        const gridData: any[][] = [];

        // 컬럼 헤더 병합 처리
        addColumns(gridData, columns, colMaxDepth);

        // 행 헤더 병합 처리
        addRows(gridData, rows, rowMaxDepth, data);

        const worksheet = XLSX.utils.aoa_to_sheet(gridData);
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

        const mergeList = [];
        if (columns.length > 1 && rowMaxDepth > 1) {
          mergeList.push(`${ALPHABET_LIST[0]}1:${ALPHABET_LIST[rowMaxDepth - 1]}1`);
        }

        if (rows.length > 1 && colMaxDepth > 1) {
          mergeList.push(`A1:A${colMaxDepth}`);
        }
        const merges = mergeList.map((range) => XLSX.utils.decode_range(range));

        if (!worksheet['!merges']) {
          worksheet['!merges'] = [];
        }

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

    const headers = [
      { 'Courier: 24': 'Courier: 24' },
      { 'bold & color': 'bold & color' },
      { 'fill: color': 'fill: color' },
      { 'line\nbreak': 'line\nbreak' },
    ];

    // STEP 2: Create data rows and styles
    let row = [
      { v: 'Courier: 24', t: 's', s: { font: { name: 'Courier', sz: 24 } } },
      { v: 'bold & color', t: 's', s: { font: { bold: true, color: { rgb: 'FF0000' } } } },
      { v: 'fill: color', t: 's', s: { fill: { fgColor: { rgb: 'E9E9E9' } } } },
      { v: 'line\nbreak', t: 's', s: { alignment: { wrapText: true } } },
    ];

    // STEP 3: Create worksheet with rows; Add worksheet to workbook
    const ws = XLSX.utils.aoa_to_sheet([row]);

    ws['!cols'] = autoFitColumns(headers);
    XLSX.utils.book_append_sheet(wb, ws, 'readme demo');

    const merges = ['A1:B1', 'C1:D1'].map((range) => XLSX.utils.decode_range(range));

    if (!ws['!merges']) ws['!merges'] = [];

    for (const merge of merges) {
      ws['!merges'].forEach(function (range) {
        if (merge.e.r < range.s.r) return;
        if (range.e.r < merge.s.r) return;
        if (merge.e.c < range.s.c) return;
        if (range.e.c < merge.s.c) return;
        throw new Error(XLSX.utils.encode_range(merge) + ' overlaps ' + XLSX.utils.encode_range(range));
      });
      ws['!merges'].push(merge);
    }

    console.log({ merges: ws['!merges'] });

    // STEP 4: Write Excel file to browser
    // XLSX.writeFile(wb, 'xlsx-js-style-demo.xlsx');
  };
  return { exportToExcel, excelStyleTest };
};
