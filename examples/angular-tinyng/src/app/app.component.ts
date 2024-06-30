import { Component } from '@angular/core';
import { TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';
import respData from '../../../demo-data.json';
import MergeTableCells from '../../../../lib/main';

const mergeHandle = new MergeTableCells(['area', 'province', 'city']);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayedData: Array<TiTableRowData> = [];
  srcData: TiTableSrcData = {
    data: mergeHandle.format(structuredClone(respData)),
    state: {
      searched: false,
      paginated: false,
      sorted: false
    }
  };
  columns: Array<TiTableColumns> = [
    { title: '大区', key: 'area' },
    { title: '省/直辖市', key: 'province' },
    { title: '城市', key: 'city' },
    { title: '网点', key: 'store' },
    { title: '销售额（万元）', key: 'sales' }
  ];

  public span = mergeHandle.span
}
