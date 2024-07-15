import './App.css';
import { Table } from 'antd';
import MergeTableCells from 'merge-table-cells';
import testData from '@local/test-data';

function App() {
  const mergeHandle = new MergeTableCells(['area', 'province', 'city']);
  const tableData = mergeHandle.format(testData);
  const getSpan = (prop, row) => {
    const { rowspan, colspan } = mergeHandle.span(prop, row);

    return {
      rowSpan: rowspan,
      colSpan: colspan  
    }
  }
  const columns = [
    { 
      title: '大区', 
      dataIndex: 'area',
      onCell: row => getSpan('area', row) 
    },
    { 
      title: '省/直辖市', 
      dataIndex: 'province',
      onCell: row => getSpan('province', row) 
    },
    { 
      title: '城市', 
      dataIndex: 'city',
      onCell: row => getSpan('city', row) 
    },
    { title: '网点', dataIndex: 'store' },
    { title: '销售额（万元）', dataIndex: 'sales' }
  ];

  return (
    <Table 
      columns={columns} 
      dataSource={tableData} 
      pagination={false}
      bordered
    />
  )
}

export default App;
