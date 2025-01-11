import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import { ListConfig, BaseListHandlers, BaseListOptions } from '../../models/list.model';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-base-list',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    FormsModule,
    DatePipe,
    TagModule
  ],
  template: `
    <p-card [header]="options.title" styleClass="mb-4">
      <!-- Toolbar -->
      <div class="flex justify-content-between mb-4">
        <div class="flex gap-2">
          <p-button
            *ngIf="options.showAddButton"
            label="Add New"
            icon="pi pi-plus"
            (onClick)="onAddClick()"
          ></p-button>
          
          <p-button
            *ngIf="options.enableSelection && selectedItems.length > 0"
            label="Delete Selected"
            icon="pi pi-trash"
            severity="danger"
            (onClick)="onDeleteSelectedClick()"
          ></p-button>
        </div>
        
        <div *ngIf="options.showSearch" class="flex align-items-center gap-2">
          <span class="p-input-icon-left">
            <i class="pi pi-search"></i>
            <input 
              pInputText 
              type="text" 
              [(ngModel)]="searchQuery"
              (ngModelChange)="onSearchQueryChange($event)"
              placeholder="Search..." 
            />
          </span>
        </div>
      </div>

      <!-- Table -->
      <p-table
        #dt
        [value]="data"
        [columns]="config.columns"
        [paginator]="config.showPagination"
        [rows]="config.pageSize || 10"
        [totalRecords]="totalRecords"
        [loading]="loading"
        [resizableColumns]="true"
        [selection]="selectedItems"
        [selectionMode]="options.enableSelection ? 'multiple' : undefined"
        (selectionChange)="onSelectionChange($event)"
        styleClass="p-datatable-gridlines"
        responsiveLayout="scroll"
      >
        <ng-template pTemplate="header" let-columns>
          <tr>
            <th *ngIf="options.enableSelection" style="width: 3rem">
              <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
            </th>
            <th
              *ngFor="let col of columns"
              [pSortableColumn]="col.sortable ? col.field : null"
            >
              {{ col.header }}
              <p-sortIcon *ngIf="col.sortable" [field]="col.field"></p-sortIcon>
            </th>
            <th *ngIf="options.showEditButton || options.showDeleteButton">Actions</th>
          </tr>
        </ng-template>

        <ng-template pTemplate="body" let-item let-columns="columns">
          <tr>
            <td *ngIf="options.enableSelection">
              <p-tableCheckbox [value]="item"></p-tableCheckbox>
            </td>
            <td *ngFor="let col of columns">
              <ng-container [ngSwitch]="col.template">
                <ng-container *ngSwitchCase="'date'">
                  {{ item[col.field] | date:'medium' }}
                </ng-container>
                <ng-container *ngSwitchCase="'status'">
                  <p-tag
                    [value]="item[col.field] ? 'Active' : 'Inactive'"
                    [severity]="item[col.field] ? 'success' : 'danger'"
                  ></p-tag>
                </ng-container>
                <ng-container *ngSwitchDefault>
                  {{ item[col.field] }}
                </ng-container>
              </ng-container>
            </td>
            <td *ngIf="options.showEditButton || options.showDeleteButton">
              <div class="flex gap-2">
                <p-button
                  *ngIf="options.showEditButton"
                  icon="pi pi-pencil"
                  severity="secondary"
                  (onClick)="onEditClick(item)"
                ></p-button>
                <p-button
                  *ngIf="options.showDeleteButton"
                  icon="pi pi-trash"
                  severity="danger"
                  (onClick)="onDeleteClick(item)"
                ></p-button>
              </div>
            </td>
          </tr>
        </ng-template>
      </p-table>
    </p-card>
  `,
})
export class BaseListComponent<T = any> {
  @Input() config: ListConfig = { columns: [] };
  @Input() data: T[] = [];
  @Input() loading = false;
  @Input() totalRecords = 0;
  @Input() options: BaseListOptions = {
    showAddButton: true,
    showEditButton: true,
    showDeleteButton: true,
    showSearch: true,
    enableSelection: false,
  };
  @Input() handlers: BaseListHandlers<T> = {};

  @ViewChild('dt') table!: Table;

  protected searchQuery = '';
  protected selectedItems: T[] = [];

  protected onAddClick(): void {
    if (this.handlers.onAdd) {
      this.handlers.onAdd();
    }
  }

  protected onEditClick(item: T): void {
    if (this.handlers.onEdit) {
      this.handlers.onEdit(item);
    }
  }

  protected onDeleteClick(item: T): void {
    if (this.handlers.onDelete) {
      this.handlers.onDelete(item);
    }
  }

  protected onDeleteSelectedClick(): void {
    if (this.handlers.onDelete && this.selectedItems.length > 0) {
      this.selectedItems.forEach(item => this.handlers.onDelete?.(item));
    }
  }

  protected onSearchQueryChange(query: string): void {
    if (this.handlers.onSearch) {
      this.handlers.onSearch(query);
    }
  }

  protected onSelectionChange(items: T[]): void {
    this.selectedItems = items;
    if (this.handlers.onSelectionChange) {
      this.handlers.onSelectionChange(items);
    }
  }
}
