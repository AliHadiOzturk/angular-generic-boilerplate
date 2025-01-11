export const config = {
  allowedFiles: [
    'base-list.component.ts',
    'base-list.component.html',
    'special-case.component.ts'
  ],
  
  allowedPatterns: [
    // Add any allowed patterns here
  ],
  
  tablePatterns: [
    '<table',
    '<p-table',
    'TableModule',
    'from \'primeng/table\'',
    'from "@primeng/table"',
    'from \'@angular/material/table\'',
    'from "@angular/material/table"',
    'MatTableModule'
  ]
}; 