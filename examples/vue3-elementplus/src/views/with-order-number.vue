<script setup>
import { inject } from 'vue';
import { ElTable, ElTableColumn } from 'element-plus';

const props = defineProps({
  data: Array
});
const MergeTableCells = inject('MergeTableCells');

const mergeHandle = new MergeTableCells(['area', 'province', 'city']);
let index = 0;
const tableData = mergeHandle.format(props.data).map(item => ({
  index: item._span.rowspan.area ? ++index : index,  // 基于 area 列显示序号
  ...item
}));
const spanMethod = ({ column, row }) => {
  const { property } = column;

  if (property === 'index') {
    return {
      rowspan: mergeHandle.span('area', row).rowspan,
      colspan: 1
    }
  }

  return mergeHandle.span(property, row);
}
</script>

<template>
  <h2>带序号列</h2>
  <el-table :data="tableData" :span-method="spanMethod" border>
    <el-table-column label="#" prop="index" width="50" align="center" />
    <el-table-column label="大区" prop="area" />
    <el-table-column label="省/直辖市" prop="province" />
    <el-table-column label="城市" prop="city" />
    <el-table-column label="网点" prop="store" />
    <el-table-column label="销售额（万元）" prop="sales" />
  </el-table>
</template>