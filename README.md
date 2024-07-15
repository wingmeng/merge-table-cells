# TableCellMerger

一个简单、灵活的表格单元格合并库。支持跨行、跨列合并，支持 Vue2/Vue3、Angular、React 以及原生表格。

## 功能特点

- **跨行、跨列合并**：支持在表格中跨行或跨列合并单元格。
- **框架无关性**：可以在主流框架中使用，如 Vue2/Vue3、Angular、React，含相关 UI 框架，包括原生的 HTML 表格。
- **简单易用**：通过简单的参数设置即可实现复杂的表格合并需求。

## 安装

使用 npm 或者 pnpm 安装：

```bash
npm install table-merge-cells
# 或者
pnpm install table-merge-cells
```

## 使用方法

以 Vue3 + ElementPlus 为例：

```js
import MergeTableCells from 'merge-table-cells';

// 业务数据
const respData = [
  { area: '华北', province: '北京', city: '北京', store: '密云分店', ... },
  ...
];

const mergeHandle = new MergeTableCells({
  rowspan: ['area', 'province', 'city'],  // 需要跨行合并的列
  colspan: ['area', 'province']  // 需要跨列合并的列
});

// 获取格式化后的表格数据，包含每一行的跨行、跨列信息
const tableData = mergeHandle.format(respData);

// 获取指定的跨行、跨列信息
const spanMethod = (prop, row) => mergeHandle.span(prop, row);
```

```html
<template>
  <el-table :data="tableData" :span-method="spanMethod" border>
    <el-table-column label="大区" prop="area" />
    <el-table-column label="省/直辖市" prop="province" />
    <el-table-column label="城市" prop="city" />
    <el-table-column label="网点" prop="store" />
    <el-table-column label="销售额（万元）" prop="sales" />
  </el-table>
</template>
```

## 示例

- [Vue3 + ElementPlus](./examples/vue3-elementplus/)
- [Vue2 + ElementUI](./examples/vue2-elementui/)
- [React + AntDesign](./examples/react-antd/)
- [Angular + TinyNG](./examples/angular-tinyng/)
- [原生表格](./examples/native/)

> 上述示例放在 `examples` 文件夹下，安装好每个示例的依赖后，可在项目根目录运行 `npm run examples` 启动所有示例。

## 许可证
本项目使用 MIT 许可证。