export interface ListAction {
  label: string;
  icon?: string;
  handler: (...args: any[]) => void;
  visible?: boolean;
  disabled?: boolean;
}

export interface ColumnDefinition {
  field: string;
  header: string;
  sortable?: boolean;
  template?: string;
  width?: string;
}

export interface ListConfig {
  columns: ColumnDefinition[];
  title?: string;
  showSearch?: boolean;
  showPagination?: boolean;
  pageSize?: number;
}

export interface BaseListHandlers<T> {
  onAdd?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onSearch?: (query: string) => void;
  onSelectionChange?: (items: T[]) => void;
}

export interface BaseListOptions {
  showAddButton?: boolean;
  showEditButton?: boolean;
  showDeleteButton?: boolean;
  showSearch?: boolean;
  enableSelection?: boolean;
  title?: string;
} 