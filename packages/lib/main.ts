import type { MergeOptions, ChainMap, MergeType, SpanInfo } from '../index';

function setItems(map: ChainMap, key: string) {
  const { count = 0, children = new Map() } = map.get(key) || {};

  map.set(key, { count: count + 1, children });
  return map.get(key);
}

// 枚举表格跨列属性组合
function buildEnumCombos(props: Array<string>) {
  const result: Array<string[]> = [];

  if (props.length < 2) {
    return result;
  }

  for (let i = 0; i < props.length; i++) {
    for (let j = i + 1; j < props.length; j++) {
      const combo = props.slice(i, j + 1);

      if (combo.length >= 2) {
        result.push(combo);
      }
    }
  }

  // 组合项数最多的排前面
  return result.sort((a, b) => b.length - a.length);
}

export default class MergeTableCells {
  mergeKeys: MergeOptions = {
    rowspan: [],
    colspan: []
  };

  alias = '_span';

  constructor(mergeOptions: MergeOptions | string[]) {
    const options = Array.isArray(mergeOptions) ? {
      rowspan: mergeOptions,
      colspan: mergeOptions
    } : mergeOptions;

    this.mergeKeys.rowspan = options?.rowspan || [];
    this.mergeKeys.colspan = options?.colspan || [];
  }

  format(rawData: any[], sortHandle?: Function): any[] {
    const { rowspan: rowMergeKeys, colspan: colMergeKeys } = this.mergeKeys;
    const sortFn = (a: any, b: any): number => {
      if (typeof sortHandle === 'function') {
        return sortHandle(a, b);  // 使用传入的排序方法（如有）
      }

      for (let orderKey of rowMergeKeys) {
        const value1 = String(a[orderKey] ?? '');
        const value2 = String(b[orderKey] ?? '');

        if (value1 !== value2) {
          return value1.localeCompare(value2);
        }
      }

      return 0;
    };

    const orderData = [...rawData].sort(sortFn);
    const groupedData: ChainMap = orderData.reduce((group: ChainMap, item: any) => {
      rowMergeKeys.reduce((obj: any, key) =>
        setItems(obj.children || group, item[key]), {}
      );

      return group;
    }, new Map());
    const getLevelInfo = (row: any) => {
      return rowMergeKeys.reduce((mergeArr: any[], key, i) => {
        if (i === 0) {
          mergeArr.push(groupedData.get(row[key]));
        } else {
          mergeArr.push(mergeArr[i - 1].children.get(row[key]));
        }

        return mergeArr;
      }, []);
    };

    // 根据跨列排至枚举相邻列
    const mergeColsCombos = buildEnumCombos(colMergeKeys);
    const getColspanInfo = (rowspanInfo: SpanInfo, row: any) => {
      const result: { [propName: string]: number } = {};

      for (let combo of mergeColsCombos) {
        const matched = combo.every((k, i) => {
          if (i === 0) {
            return true;
          }

          // 跨行数相同的列才能跨列合并
          return row[k] === row[combo[i - 1]] &&
            rowspanInfo[k] > 0 &&
            rowspanInfo[k] === rowspanInfo[combo[i - 1]];
        });

        if (matched) {
          combo.forEach((k, i) => {
            result[k] = i === 0 ? combo.length : 0;
          });
          break;
        }
      }

      return result;
    };

    // 处理表格数据（添加跨行、跨列信息）
    const tableData = orderData.map((item, index, arr) => {
      const spanInfo: { rowspan: SpanInfo, colspan: SpanInfo } = {
        rowspan: {},
        colspan: {}
      };
      // 获取当前层级数据
      const levelInfoArr = getLevelInfo(item);

      if (index === 0) {  // 首行直接赋值 rowspan 数据
        rowMergeKeys.forEach((key, i) => {
          spanInfo.rowspan[key] = levelInfoArr[i].count;
        });

        spanInfo.colspan = getColspanInfo(spanInfo.rowspan, item);
        item[this.alias] = spanInfo;
        return item;
      }

      // 判断是否为相邻行且内容相同的单元格
      const isSameWithPrev = (key: string): boolean => item[key] === arr[index - 1][key];

      rowMergeKeys.reduce((isLastSame: boolean, key, i) => {
        const isSame = isLastSame && isSameWithPrev(key);

        spanInfo.rowspan[key] = isSame ? 0 : levelInfoArr[i].count;
        return isSame;
      }, true);

      spanInfo.colspan = getColspanInfo(spanInfo.rowspan, item);
      item[this.alias] = spanInfo;
      return item;
    });

    return tableData;
  }

  span(prop: string, row: any): { [key in MergeType]: number } {
    const spanInfo = row[this.alias] || {};
    const spanTarget = {
      rowspan: 1,
      colspan: 1
    };

    Object.keys(spanTarget).forEach((key) => {
      if (({}).hasOwnProperty.call(spanInfo[key] || {}, prop)) {
        spanTarget[key as MergeType] = spanInfo[key][prop];
      }
    });

    return spanTarget;
  }
}