<script setup>
import MergeTableCells from 'merge-table-cells'
import { ElTable, ElTableColumn } from 'element-plus';

const props = defineProps({
  data: Array
});
const mergeHandle = new MergeTableCells(['area', 'province', 'city']);
const topValueMapping = ['area', 'province', 'city'].reduce((obj, k) => {
  obj[k] = '上海总部';
  return obj;
}, {});
const tableData = mergeHandle.format(props.data, (a, b) => {
  for (let sortKey of mergeHandle.mergeKeys.rowspan) {
    const value1 = a[sortKey];
    const value2 = b[sortKey];
    const order = [value1, value2].indexOf(topValueMapping[sortKey]);

    if (order > -1) {
      return order === 0 ? -1 : 1;
    }

    if (value1 !== value2) {
      return value1.localeCompare(value2);
    }

    if (sortKey === 'city' && value1 === value2) {
      return b.sales - a.sales;
    }
  }
});
const spanMethod = ({ column, row }) => mergeHandle.span(column.property, row);
</script>

<template>
  <h2>自定义排序</h2>
  <ol>
    <li>将“上海总部”放到表格第一行；</li>
    <li>除“上海总部”外的大区、省/直辖市和城市按拼音语序升序；</li>
    <li>每个城市的网点按销售额降序排列。</li>
  </ol>
  <el-table :data="tableData" :span-method="spanMethod" border>
    <el-table-column label="大区" prop="area" />
    <el-table-column label="省/直辖市" prop="province" />
    <el-table-column label="城市" prop="city" />
    <el-table-column label="网点" prop="store" />
    <el-table-column label="销售额（万元）" prop="sales" />
  </el-table>
</template>