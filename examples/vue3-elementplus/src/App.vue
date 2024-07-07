<script setup>
import RowspanOnly from './views/rowspan-only.vue';
import ColspanOnly from './views/colspan-only.vue';
import BothMerge from './views/both-merge.vue';
import CustomSortTable from './views/custom-sort.vue';
import WithOrderNumber from './views/with-order-number.vue';
import respData from '@local/test-data';

const getData = () => structuredClone(respData);
</script>

<template>
  <RowspanOnly :data="getData()" />
  <ColspanOnly :data="getData()" />
  <BothMerge :data="getData()" />
  <CustomSortTable :data="getData()" />
  <WithOrderNumber :data="getData()" />
</template>
