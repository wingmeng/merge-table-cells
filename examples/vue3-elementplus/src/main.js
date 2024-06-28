import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import 'element-plus/dist/index.css'
import MergeTableCells from '../../../dist/merge-table-cells.js'

createApp(App)
  .provide('MergeTableCells', MergeTableCells)
  .mount('#app')
