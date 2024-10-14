import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css'],
})
export class AdminSidebarComponent {
  adminLinks = [
    { label: 'Dashboard', route: 'dashboard', icon: 'pi pi-home' },
    { label: 'Categories', route: 'jobfields', icon: 'pi pi-tags' },
    { label: 'Job Seekers', route: 'jobseekers', icon: 'pi pi-users' },
    { label: 'Companies', route: 'company', icon: 'pi pi-building' },
    { label: 'Jobs', route: 'jobs', icon: 'pi pi-briefcase' },
  ];

  searchTerm = '';
  filteredLinks = this.adminLinks;

  constructor(private authService: AuthService, private router: Router) {} 

  onSearchChange(term: string) {
    this.filteredLinks = this.adminLinks.filter((link) =>
      link.label.toLowerCase().includes(term.toLowerCase())
    );
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}