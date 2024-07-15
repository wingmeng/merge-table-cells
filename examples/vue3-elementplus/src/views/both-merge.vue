<script setup>
import MergeTableCells from 'merge-table-cells'
import { ElTable, ElTableColumn } from 'element-plus';

const props = defineProps({
  data: Array
});
const mergeHandle = new MergeTableCells(['area', 'province', 'city']);
const tableData = mergeHandle.format(props.data);
const spanMethod = ({ column, row }) => mergeHandle.span(column.property, row);
</script>

<template>
  <h2>行合并+列合并</h2>
  <el-table :data="tableData" :span-method="spanMethod" border>
    <el-table-column label="大区" prop="area" />
    <el-table-column label="省/直辖市" prop="province" />
    <el-table-column label="城市" prop="city" />
    <el-table-column label="网点" prop="store" />
    <el-table-column label="销售额（万元）" prop="sales" />
  </el-table>
</template>