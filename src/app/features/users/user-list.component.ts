import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from '../../shared/components/base-list/base-list.component';
import { User } from './user.model';

@Component({
  selector: 'app-user-list',
  template: '<app-base-list [config]="config" [data]="users" [options]="options" [handlers]="handlers"></app-base-list>',
  standalone: true,
  imports: [BaseListComponent]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  
  config = {
    showPagination: true,
    pageSize: 10,
    columns: [
      { field: 'username', header: 'Username', sortable: true },
      { field: 'firstName', header: 'First Name', sortable: true },
      { field: 'lastName', header: 'Last Name', sortable: true },
      { field: 'email', header: 'Email', sortable: true },
      { 
        field: 'isActive', 
        header: 'Status', 
        sortable: true,
        template: 'status'
      },
      { 
        field: 'createdAt', 
        header: 'Created Date', 
        sortable: true,
        template: 'date'
      },
      { 
        field: 'lastLogin', 
        header: 'Last Login', 
        sortable: true,
        template: 'date'
      }
    ]
  };

  options = {
    showAddButton: true,
    showEditButton: true,
    showDeleteButton: true,
    showSearch: true,
    enableSelection: true,
    title: 'Users'
  };

  handlers = {
    onAdd: () => {
      console.log('Add clicked');
    },
    onEdit: (user: User) => {
      console.log('Edit clicked', user);
    },
    onDelete: (user: User) => {
      console.log('Delete clicked', user);
    },
    onSearch: (query: string) => {
      console.log('Search query', query);
      this.filterUsers(query);
    },
    onSelectionChange: (users: User[]) => {
      console.log('Selection changed', users);
    }
  };

  ngOnInit() {
    // Load sample data
    this.users = this.generateSampleUsers();
  }

  private generateSampleUsers(count: number = 50): User[] {
    const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'James', 'Emma', 'William', 'Olivia'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'example.com'];

    return Array.from({ length: count }, (_, index) => {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}`;
      const domain = domains[Math.floor(Math.random() * domains.length)];
      const createdAt = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000);
      const lastLogin = Math.random() > 0.3 ? new Date(createdAt.getTime() + Math.random() * (Date.now() - createdAt.getTime())) : undefined;

      return {
        id: index + 1,
        username,
        firstName,
        lastName,
        email: `${username}@${domain}`,
        isActive: Math.random() > 0.2,
        createdAt,
        lastLogin
      };
    });
  }

  private filterUsers(query: string) {
    const normalizedQuery = query.toLowerCase().trim();
    const filteredUsers = this.generateSampleUsers().filter(user => 
      user.username.toLowerCase().includes(normalizedQuery) ||
      user.firstName.toLowerCase().includes(normalizedQuery) ||
      user.lastName.toLowerCase().includes(normalizedQuery) ||
      user.email.toLowerCase().includes(normalizedQuery)
    );
    this.users = filteredUsers;
  }
}
