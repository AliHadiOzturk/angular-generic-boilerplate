module.exports = {
  config: {
    allowedFiles: ['base-list.component.ts', 'base-list.component.html'],

    allowedPatterns: [],

    tablePatterns: [
      '<table',
      '<p-table',
      'TableModule',
      "from 'primeng/table'",
      'from "@primeng/table"',
      "from '@angular/material/table'",
      'from "@angular/material/table"',
      'MatTableModule',
    ],
  },
};
