import './App.css';
import MergeTableCells from 'merge-table-cells';
import testData from '@local/test-data';

function App() {
  const columns = [
    { title: '大区', prop: 'area' },
    { title: '省/直辖市', prop: 'province' },
    { title: '城市', prop: 'city' },
    { title: '网点', prop: 'store' },
    { title: '销售额（万元）', prop: 'sales' }
  ];
  const mergeHandle = new MergeTableCells(['area', 'province', 'city']);
  const tableData = mergeHandle.format(testData);
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
                  columns.map(col => getSpan(col.prop, row).includes(0) ? 
                    null : 
                    <td {...mergeHandle.span(col.prop, row)}>{ row[col.prop] }</td>
                  )
                }</tr>
              )
            }
        </tbody>
      </table>
    </div>
  )
}

export default App
