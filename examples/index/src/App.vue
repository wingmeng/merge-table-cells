<template>
  <div>
    <nav class="nav">
      <a v-for="nav in navs"
        class="link"
        :class="statusMap[nav.tag].status"
        href="javascript:;"
        @click="jump(nav.tag, nav.url)"
        :key="nav.tag">
        <span class="title">{{ nav.title }}</span>
        <code>./examples/{{ nav.tag }}</code>
      </a>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

interface Nav {
  title: string;
  port: number;
  tag: string;
  url: string;
}

interface StatusInfo {
  url: string;
  status: 'pending' | 'error' | 'ok';
  retry: number;
}

const navs: Array<Nav> = [
  { title: 'Vue3 + ElementPlus', port: 5263, tag: 'vue3-elementplus' },
  { title: 'Vue2 + ElementUI', port: 5262, tag: 'vue2-elementui' },
  { title: 'React + AntDesign', port: 5261, tag: 'react-antd' },
  { title: 'Angular + TinyNG', port: 5260, tag: 'angular-tinyng' },
  { title: '原生表格', port: 5259, tag: 'native' },
].map(nav => ({ ...nav, url: `http://localhost:${nav.port}` }));

const statusMap = navs.reduce((obj: { [propName: Nav['tag']]: StatusInfo }, nav) => {
  obj[nav.tag] = {
    url: nav.url,
    status: 'pending',
    retry: 10
  };
  return obj;
}, reactive({}));

const jump = (tag: Nav['tag'], url: string) => {
  if (statusMap[tag].status === 'ok') {
    window.open(url, url);
  }
}

navs.forEach(pendingServer);

function pendingServer(item: Nav) {
  const info = statusMap[item.tag];
  let timer: any;
  const req = (url: string) => {
    console.log(url)
    fetch(url)
      .then(response => {
        if (response.ok) {
          info.status = 'ok';
          clearTimeout(timer);
        }
      })
      .catch(() => {
        if (info.retry) {
          timer = setTimeout(() => {
            req(item.url);
            info.retry--;
          }, 2000)
        } else {
          clearTimeout(timer);
          info.status = 'error';
        }
      });
  };
  req(item.url);
}
</script>
