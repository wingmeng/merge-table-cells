# TableCellMerger

一个简单、灵活的表格单元格合并库。支持跨行、跨列合并，兼容 Vue2/Vue3、Angular、React 以及原生表格。

## 功能特点

- **跨行、跨列合并**：支持在表格中跨行或跨列合并单元格。
- **框架无关性**：可以在任何框架中使用，包括 Vue2/Vue3、Angular、React，以及原生的 HTML 表格。
- **简单易用**：通过简单的参数设置即可实现复杂的表格合并需求。

## 安装

使用 npm 或者 pnpm 安装：

```bash
npm install table-merge-cells
# 或者
pnpm add table-merge-cells
```

## 使用方法

import MergeTableCells from 'table-cell-merger';

const params = {
  target: 'table-id', // 表格的ID
  rows: 2, // 需要合并的行数
  cols: 1, // 需要合并的列数
  // 其他配置参数...
};

new MergeTableCells(params);

```html
<!DOCTYPE html>
<html>
<head>
  <title>TableCellMerger 示例</title>
</head>
<body>
  <table id="example-table">
    <tr>
      <td>1</td>
      <td>2</td>
      <td>3</td>
    </tr>
    <tr>
      <td>4</td>
      <td>5</td>
      <td>6</td>
    </tr>
    <tr>
      <td>7</td>
      <td>8</td>
      <td>9</td>
    </tr>
  </table>

  <script src="path/to/table-cell-merger.js"></script>
  <script>
    const params = {
      target: 'example-table',
      rows: 2,
      cols: 1,
    };
    new MergeTableCells(params);
  </script>
</body>
</html>
```

## 许可证
本项目使用 MIT 许可证。