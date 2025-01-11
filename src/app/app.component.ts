import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MenubarModule
  ]
})
export class AppComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Users',
      icon: 'pi pi-users',
      routerLink: ['/users']
    }
    // Add more menu items here as needed
  ];
}
