import './style.css';

const navs = [
  { title: 'Vue3 + ElementPlus', url: 5263, folder: 'vue3-elementplus' },
  { title: 'Vue2 + ElementUI', url: 5262, folder: 'vue2-elementui' },
  { title: 'React', url: 5261, folder: 'angular-tinyng' },
  { title: 'Angular + TinyNG', url: 5260, folder: 'angular-tinyng' },
  { title: '原生表格', url: './examples/native/index.html', folder: 'native' },
];

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <nav class="nav">${
    navs.map(nav => `
      <a class="link" href="${nav.folder === 'native' ? '//localhost:' + nav.url : nav.url}">
        ${nav.title}<code>./examples/${nav.folder}</code>
      </a>
    `).join('\n')
  }
  </nav>
  `