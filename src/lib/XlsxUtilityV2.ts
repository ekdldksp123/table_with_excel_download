import { GridData, GridGroup } from '@/types';
import { amountToLocaleString, getColSpan, getMaxDepth, getRowSpan } from './utils';
import * as XLSX from 'xlsx-js-style';
import { v4 as uuid4 } from 'uuid';
interface IExportToExcel {
  reports: Record<string, { rows: GridGroup[]; columns: GridGroup[]; data: GridData[] }>;
  fileName: string;
}

type StyledCellType = {
  key: string;
  v: string;
  t?: string;
  s?: {
    alignment?: { horizontal?: string; vertical?: string };
    font: {
      bold: boolean;
      color: {
        rgb: string;
      };
    };
    fill: { fgColor: { rgb: string } };
    border?: {
      top?: {
        style: string;
        color: { rgb: string };
      };
      bottom?: {
        style: string;
        color: { rgb: string };
      };
      left?: {
        style: string;
        color: { rgb: string };
      };
      right?: {
        style: string;
        color: { rgb: string };
      };
      diagonal?: {
        style: string;
        color: { rgb: string };
        diagonalUp?: boolean;
        diagonalDown?: boolean;
      };
    };
  };
};

const BORDER_STYLE = {
  top: { style: 'thin', color: { rgb: 'FFFFFF' } },
  bottom: { style: 'thin', color: { rgb: 'FFFFFF' } },
  left: { style: 'thin', color: { rgb: 'FFFFFF' } },
  right: { style: 'thin', color: { rgb: 'FFFFFF' } },
};

const ROWSPAN_BORDER_STYLE = {
  left: { style: 'thin', color: { rgb: 'FFFFFF' } },
  right: { style: 'thin', color: { rgb: 'FFFFFF' } },
};

const COLSPAN_BORDER_STYLE = {
  top: { style: 'thin', color: { rgb: 'FFFFFF' } },
  bottom: { style: 'thin', color: { rgb: 'FFFFFF' } },
};

const COLGROUP_BORDER_STYLE = {
  top: { style: 'thin', color: { rgb: 'FFFFFF' } },
  bottom: { style: 'thin', color: { rgb: 'FFFFFF' } },
  left: { style: 'thin', color: { rgb: 'FFFFFF' } },
};

const ALPHABET_LIST = Array.from({ length: 26 }, (v, i) => String.fromCharCode(i + 65));

export const useXlsxUtilityV2 = () => {
  const autoFitColumns = (
    colGroup: StyledCellType[][],
    rowGroup: StyledCellType[][],
    data: GridData[],
    rowMaxDepth: number,
  ) => {
    const columns = colGroup[colGroup.length - 1];
    const rows = rowMaxDepth <= 1 ? rowGroup : rowGroup.map((row) => row.slice(0, rowMaxDepth));

    const rowGroupLengthList =
      rowMaxDepth <= 1 ? [0] : rows.map((row) => row.reduce((sum, { v }) => sum + v.length + 5, 0));

    const columnsWidths = columns.map((col) => ({
      wch: Math.max(
        col.v.length + 15,
        ...rowGroupLengthList,
        ...data.map((row) => {
          const cellValue = row[col.key] ? String(row[col.key]) : '';
          return cellValue.length;
        }),
      ),
    }));
    return columnsWidths;
  };

  const addRows = (gridData: StyledCellType[][], rows: GridGroup[], rowMaxDepth: number) => {
    let nextRowIndex = 0;
    const processRow = (row: GridGroup, depth: number, rowIndex: number) => {
      if (!gridData[rowIndex]) {
        gridData[rowIndex] = [];
      }

      const rowSpan = getRowSpan(row);
      gridData[rowIndex][depth] = {
        key: row.key,
        v: row.title,
        t: 's',
        s: {
          font: { bold: true, color: { rgb: '000000' } },
          fill: {
            fgColor: {
              rgb:
                row.title === '총계' || row.title === '합계' || row.title === '소계' || row.key.includes('subtotal')
                  ? 'C1C4CF'
                  : 'DCE2F7',
            },
          },
          border: rowSpan > 1 ? ROWSPAN_BORDER_STYLE : BORDER_STYLE,
          alignment: { horizontal: 'center', vertical: 'center' },
        },
      };

      if (row.title === '총계' || row.title === '합계') {
        for (let i = depth + 1; i < rowMaxDepth; i++) {
          gridData[rowIndex][i] = {
            key: row.key,
            v: '',
            t: 's',
            s: {
              font: { bold: true, color: { rgb: '000000' } },
              fill: { fgColor: { rgb: 'C1C4CF' } },
              border: BORDER_STYLE,
              alignment: { horizontal: 'center', vertical: 'center' },
            },
          };
        }
      }

      //행 병합이 필요한 경우 = 자식의 개수가 2부터
      if (rowSpan > 1) {
        for (let i = 1; i < rowSpan; i++) {
          if (!gridData[rowIndex + i]) {
            gridData[rowIndex + i] = [];
          }
          gridData[rowIndex + i][depth] = {
            key: row.key,
            v: '',
            t: 's',
            s: {
              font: { bold: true, color: { rgb: '000000' } },
              fill: {
                fgColor: {
                  rgb:
                    row.title === '총계' || row.title === '합계' || row.title === '소계' || row.key.includes('subtotal')
                      ? 'C1C4CF'
                      : 'DCE2F7',
                },
              },
              border:
                i === rowSpan - 1
                  ? { ...ROWSPAN_BORDER_STYLE, bottom: { style: 'thin', color: { rgb: 'FFFFFF' } } }
                  : ROWSPAN_BORDER_STYLE,
              alignment: { horizontal: 'center', vertical: 'center' },
            },
          };
        }
      }

      //자식이 있을 경우, 자식들을 재귀적으로 처리
      if (row.children?.length) {
        nextRowIndex = rowIndex;
        for (const child of row.children) {
          nextRowIndex = processRow(child, depth + 1, nextRowIndex);
        }
      }
      return nextRowIndex + 1;
    };

    for (const row of rows) {
      nextRowIndex = processRow(row, 0, nextRowIndex);
    }
    return gridData.filter((v) => !!v).map((v) => v.filter(Boolean));
  };

  const addColumns = (gridData: StyledCellType[][], columns: GridGroup[], colMaxDepth: number, rowMaxDepth: number) => {
    if (rowMaxDepth > 1) {
      for (let i = 0; i < rowMaxDepth - 1; i++) {
        columns.splice(1, 0, { key: '', title: '' });
      }
    }

    let nextColIndex = 0;

    const processColumn = (col: GridGroup, depth: number, colIndex: number) => {
      if (!gridData[colIndex]) {
        gridData[colIndex] = [];
      }

      const colSpan = getColSpan(col, colIndex, rowMaxDepth);
      const bgColor = depth === 0 ? 'DCE2F7' : 'B0BDEA';
      gridData[depth][colIndex] = {
        key: col.key,
        v: col.title,
        t: 's',
        s: {
          font: { bold: true, color: { rgb: '000000' } },
          fill: { fgColor: { rgb: bgColor } },
          border: colSpan > 1 ? COLGROUP_BORDER_STYLE : BORDER_STYLE,
          alignment: { horizontal: 'center', vertical: 'center' },
        },
      };

      //열 병합이 필요한 경우 = 자식의 개수가 2개부터
      if (colSpan > 1) {
        for (let i = 1; i < colSpan; i++) {
          gridData[depth][colIndex + i] = {
            key: col.key,
            v: '',
            t: 's',
            s: {
              font: { bold: true, color: { rgb: '000000' } },
              fill: { fgColor: { rgb: bgColor } },
              border: COLSPAN_BORDER_STYLE,
              alignment: { horizontal: 'center', vertical: 'center' },
            },
          };
        }
      }

      if (col.title === '총계' || col.title === '합계') {
        for (let i = depth + 1; i < colMaxDepth; i++) {
          gridData[i][colIndex] = {
            key: col.key,
            v: '',
            t: 's',
            s: {
              font: { bold: true, color: { rgb: '000000' } },
              fill: { fgColor: { rgb: 'C1C4CF' } },
              border: BORDER_STYLE,
              alignment: { horizontal: 'center', vertical: 'center' },
            },
          };
        }
      }

      //자식이 있을 경우, 자식들을 재귀적으로 처리
      if (col.children?.length) {
        nextColIndex = colIndex;
        for (const child of col.children) {
          nextColIndex = processColumn(child, depth + 1, nextColIndex);
        }
      }
      return (col.children?.length ?? 0) > 1 ? nextColIndex : nextColIndex + 1;
    };

    for (const col of columns) {
      nextColIndex = processColumn(col, 0, nextColIndex);
    }
    const filteredGridData = gridData.filter((v) => !!v.length).map((v) => v.filter(Boolean));

    if (rowMaxDepth > 1 && colMaxDepth > 1) {
      for (let i = 1; i < colMaxDepth; i++) {
        for (let j = 0; j < rowMaxDepth; j++) {
          filteredGridData[i].unshift({
            key: uuid4(),
            v: '',
            t: 's',
            s: {
              font: { bold: true, color: { rgb: '000000' } },
              fill: { fgColor: { rgb: 'DCE2F7' } },
              border: COLSPAN_BORDER_STYLE,
              alignment: { horizontal: 'center', vertical: 'center' },
            },
          });
        }
      }
    }

    return filteredGridData;
  };

  const getColumnMergeList = (columns: GridGroup[], rowMaxDepth: number, colMaxDepth: number) => {
    let nextColIndex = 0;
    const mergeList: string[] = [];

    const recur = (col: GridGroup, index: number, depth: number) => {
      const colSpan = getColSpan(col, index, depth, rowMaxDepth);

      if (index === 0 && depth === 0) {
        if (rowMaxDepth > 1 && colMaxDepth > 1) {
          mergeList.push(`${ALPHABET_LIST[index]}${depth + 1}:${ALPHABET_LIST[index + rowMaxDepth - 1]}${colMaxDepth}`);
        } else if (colMaxDepth > 1) {
          //TODO
        }
      } else if (colSpan > 1) {
        mergeList.push(`${ALPHABET_LIST[index]}${depth + 1}:${ALPHABET_LIST[index + colSpan - 1]}${depth + 1}`);
      }

      if (colSpan > 1 && col.children?.length) {
        for (let i = 0; i < col.children.length; i++) {
          recur(col.children[i], index + i, depth + 1);
        }
      }
      nextColIndex = index + colSpan;
    };

    for (let i = 0; i < columns.length; i++) {
      recur(columns[i], nextColIndex, 0);
    }

    return mergeList;
  };

  const getRowMergeList = (rows: GridGroup[], colMaxDepth: number) => {
    let nextRowDepth = 0;
    const mergeList: string[] = [];

    const recur = (row: GridGroup, index: number, depth: number) => {
      const rowSpan = getRowSpan(row);

      if (index === 0 && colMaxDepth > 1 && rowSpan > 1) {
        mergeList.push(
          `${ALPHABET_LIST[index]}${depth + colMaxDepth}:${ALPHABET_LIST[index]}${depth + colMaxDepth - 1 + rowSpan}`,
        );
      } else if (rowSpan > 1) {
        mergeList.push(`${ALPHABET_LIST[index]}${depth + 1}:${ALPHABET_LIST[index]}${depth + rowSpan}`);
      }

      if (rowSpan > 1 && row.children?.length) {
        for (let i = 0; i < row.children.length; i++) {
          recur(row.children[i], index + 1, depth + i);
        }
      }
      nextRowDepth = depth + rowSpan;
    };

    for (const row of rows) {
      recur(row, 0, nextRowDepth);
    }

    return mergeList;
  };

  const exportToExcel = ({ reports, fileName }: IExportToExcel) => {
    const wb = XLSX.utils.book_new();

    for (const sheetName in reports) {
      try {
        const { columns, rows, data } = reports[sheetName];
        const colMaxDepth = getMaxDepth(columns);
        const rowMaxDepth = getMaxDepth(rows);

        const rowGroup = addRows([], rows, rowMaxDepth);
        const colGroup = addColumns([], columns, colMaxDepth, rowMaxDepth);

        const dataKeys = Object.keys(data[0]).filter((key) => key !== 'division');

        if (rowGroup.length) {
          for (const row of data) {
            const findRowIndex = rowGroup.findIndex((group) => group[rowMaxDepth - 1].key === row.division);
            if (findRowIndex > -1) {
              rowGroup[findRowIndex].push(
                ...dataKeys.map((key) => {
                  const value = row[key];
                  const isNumber = typeof value === 'number';
                  return {
                    key,
                    v: isNumber ? amountToLocaleString(value) : (value as unknown as string),
                    t: 's',
                    s: {
                      font: { bold: true, color: { rgb: '000000' } },
                      fill: {
                        fgColor: {
                          rgb: (row.division as string)?.includes('total') ? 'C1C4CF' : 'EDF0FE',
                        },
                      },
                      border: BORDER_STYLE,
                      alignment: {
                        horizontal: isNumber ? 'right' : 'left',
                        vertical: 'center',
                      },
                    },
                  };
                }),
              );
            }
          }
        } else {
          for (const row of data) {
            const entries = Object.entries(row);
            rowGroup.push(
              entries.map(([key, value]) => {
                const isNumber = typeof value === 'number';
                return {
                  key: key as unknown as string,
                  v: isNumber ? amountToLocaleString(value) : (value as unknown as string),
                  t: 's',
                  s: {
                    font: { bold: true, color: { rgb: '000000' } },
                    fill: { fgColor: { rgb: 'EDF0FE' } },
                    border: BORDER_STYLE,
                    alignment: {
                      horizontal: isNumber ? 'right' : 'left',
                      vertical: 'center',
                    },
                  },
                };
              }),
            );
          }
        }

        const gridData: StyledCellType[][] = [...colGroup, ...rowGroup];

        const ws = XLSX.utils.aoa_to_sheet(gridData);
        ws['!cols'] = autoFitColumns(colGroup, rowGroup, data, rowMaxDepth);

        XLSX.utils.book_append_sheet(wb, ws, sheetName);

        const mergeList: string[] = [];

        const colMergeList = getColumnMergeList(columns, rowMaxDepth, colMaxDepth);
        const rowMergeList = getRowMergeList(rows, colMaxDepth);

        if (colMergeList.length) {
          mergeList.push(...colMergeList);
        }
        if (rowMergeList.length) {
          mergeList.push(...rowMergeList);
        }

        const merges = mergeList.map((range) => XLSX.utils.decode_range(range));

        if (!ws['!merges']) {
          ws['!merges'] = [];
        }

        if (!ws['!merges'].length && merges.length) {
          ws['!merges'] = merges;
          for (const merge of merges) {
            for (const range of ws['!merges']) {
              if (merge.e.r < range.s.r) return;
              if (range.e.r < merge.s.r) return;
              if (merge.e.c < range.s.c) return;
              if (range.e.c < merge.s.c) return;
              throw new Error(XLSX.utils.encode_range(merge) + ' overlaps ' + XLSX.utils.encode_range(range));
            }
            ws['!merges'].push(merge);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }

    try {
      XLSX.writeFile(wb, `${fileName}.xlsx`, { compression: true });
    } catch (error) {
      console.error(error);
    }
  };

  return { exportToExcel };
};
