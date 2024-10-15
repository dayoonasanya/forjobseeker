import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-company-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './company-sidebar.component.html',
  styleUrls: ['./company-sidebar.component.css'],
})
export class CompanySidebarComponent {
  companyLinks = [
    { label: 'Dashboard', route: '/company/dashboard', icon: 'assets/company/dashboard-1.svg' },
    { label: 'Jobs', route: '/company/jobs', icon: 'assets/company/jobs.svg' },
    { label: 'Applicants', route: '/company/applications', icon: 'assets/company/applicants.svg' },
    { label: 'Settings', route: '/company/settings', icon: 'assets/company/settings.svg' },
  ];

  searchTerm = '';
  filteredLinks = this.companyLinks;

  constructor(private authService: AuthService, private router: Router) {}

  onSearchChange(term: string) {
    this.filteredLinks = this.companyLinks.filter((link) =>
      link.label.toLowerCase().includes(term.toLowerCase())
    );
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
