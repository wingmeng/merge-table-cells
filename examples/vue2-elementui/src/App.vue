<template>
  <div id="app">
    <el-table :data="tableData" :span-method="spanMethod" border>
      <el-table-column label="大区" prop="area" />
      <el-table-column label="省/直辖市" prop="province" />
      <el-table-column label="城市" prop="city" />
      <el-table-column label="网点" prop="store" />
      <el-table-column label="销售额（万元）" prop="sales" />
    </el-table>
  </div>
</template>

<script>
import testData from '@local/test-data';
import MergeTableCells from 'merge-table-cells';

const mergeHandle = new MergeTableCells(['area', 'province', 'city']);

export default {
  name: 'App',
  data() {
    return {
      tableData: mergeHandle.format(testData)
    }
  },
  methods: {
    spanMethod({ column, row }) {
      return mergeHandle.span(column.property, row);
    }
  }
}
</script>
