import './App.css';
import MergeTableCells from '../../../dist/merge-table-cells';

const respData = [
  { area: '华北', province: '北京', city: '北京', store: '密云分店', sales: '2' },
  { area: '华中', province: '湖北', city: '武汉', store: '江城旗舰店', sales: '1' },
  { area: '华北', province: '北京', city: '北京', store: '朝阳旗舰店', sales: '23' },
  { area: '上海总部', province: '上海总部', city: '上海总部', store: '静安区分公司', sales: '2' },
  { area: '华中', province: '湖北', city: '武汉', store: '琴断口街加盟店', sales: '2' },
  { area: '华北', province: '北京', city: '北京', store: '香山店', sales: '6' },
  { area: '华南', province: '广东', city: '广州', store: '花城店', sales: '0' },
  { area: '华南', province: '广西', city: '桂林', store: '甲天下旗舰店', sales: '5' },
  { area: '华中', province: '湖北', city: '武汉', store: '汉阳造体验店', sales: '4' },
  { area: '华南', province: '广东', city: '东莞', store: '东莞东汽车站分店', sales: '5' },
  { area: '华南', province: '广东', city: '深圳', store: '华强北工厂店', sales: '5' },
  { area: '上海总部', province: '上海总部', city: '上海总部', store: '上海总部中心', sales: '17' },
  { area: '华南', province: '广东', city: '东莞', store: '东莞汽车东站分店', sales: '6' },
  { area: '华北', province: '河北', city: '石家庄', store: '常山紫龙加盟店', sales: '5' },
  { area: '华南', province: '广东', city: '广州', store: '越来越秀旗舰店', sales: '0' }
];

function App() {
  const columns = [
    { title: '大区', prop: 'area' },
    { title: '省/直辖市', prop: 'province' },
    { title: '城市', prop: 'city' },
    { title: '网点', prop: 'store' },
    { title: '销售额（万元）', prop: 'sales' }
  ];
  const mergeHandle = new MergeTableCells(['area', 'province', 'city']);
  const tableData = mergeHandle.format(respData);
  const getSpan = (prop, row) => {
    const { rowspan, colspan } = mergeHandle.span(prop, row);
    return [rowspan, colspan];
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            {
              columns.map(item => <th>{ item.title }</th>)
            }
          </tr>
        </thead>
        <tbody>
            {
              tableData.map(row => 
                <tr>{
                  columns.map(col => <td>ddd</td>)
                }</tr>
              )
            }
        </tbody>
      </table>
    </div>
  );
}

export default App;
