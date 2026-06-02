import '../components/sortable-list/sortable-list.js';

document.addEventListener('DOMContentLoaded', () => {
  const list = document.querySelector('sortable-list');
  list.items = [
    { name: 'Mango', createdAt: Date.parse('2026-01-15') },
    { name: 'Apple', createdAt: Date.parse('2026-03-20') },
    { name: 'Pear',  createdAt: Date.parse('2026-02-10') },
    { name: 'Kiwi',  createdAt: Date.parse('2026-04-05') },
    { name: 'Fig',   createdAt: Date.parse('2026-05-01') },
  ];
});
