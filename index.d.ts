export type MergeType = 'rowspan' | 'colspan';
export type MergeOptions = { [key in MergeType]: string[] };
export type ChainMap = Map<string, { count: number; children: ChainMap | undefined }>;

export declare class MergeTableCells {
  /**
   * 单元格合并构造器
   * @param mergeOptions - 单元格合并配置
   */
  constructor(mergeOptions: MergeOptions | string[]);
  format(rwaData: any[], sortHandle?: Function): any[];
  span(prop: string, row: any): { [key in MergeType]: number };
}
