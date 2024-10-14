import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../../services/company/company.service';
import { Company } from '../../../../interfaces/company';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from '../../../shared/notification/notification.component';

@Component({
  selector: 'app-admin-company',
  standalone: true,
  imports: [CommonModule, NotificationComponent],
  templateUrl: './admin-company.component.html',
  styleUrls: ['./admin-company.component.css']
})
export class AdminCompanyComponent implements OnInit {
  companies: Company[] = [];
  showNotification = false;
  notificationMessage = '';
  notificationType: 'success' | 'error' | 'warning' | 'info' = 'success';
  confirmDeleteDialogVisible = false;
  companyToDelete: Company | null = null;

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  // Load all companies
  loadCompanies(): void {
    this.companyService.getAllCompanies().subscribe({
      next: (response) => {
        this.companies = response;
      },
      error: () => {
        this.showNotification = true;
        this.notificationMessage = 'Failed to load companies.';
        this.notificationType = 'error';
      },
    });
  }

  // Show confirmation dialog for deletion
  confirmDelete(company: Company): void {
    this.companyToDelete = company;
    this.confirmDeleteDialogVisible = true;
  }

  // Cancel deletion
  cancelDelete(): void {
    this.confirmDeleteDialogVisible = false;
    this.companyToDelete = null;
  }

  // Delete a company after confirmation
  deleteCompany(): void {
    if (this.companyToDelete) {
      this.companyService.deleteCompanyProfile(this.companyToDelete.id).subscribe({
        next: () => {
          this.companies = this.companies.filter(company => company.id !== this.companyToDelete?.id);
          this.showNotification = true;
          this.notificationMessage = 'Company deleted successfully!';
          this.notificationType = 'success';
          this.confirmDeleteDialogVisible = false;
          this.companyToDelete = null;
        },
        error: () => {
          this.showNotification = true;
          this.notificationMessage = 'Failed to delete company.';
          this.notificationType = 'error';
          this.confirmDeleteDialogVisible = false;
        },
      });
    }
  }

  // Verify a company
  verifyCompany(companyId: string): void {
    this.companyService.verifyCompany(companyId).subscribe({
      next: () => {
        const company = this.companies.find(c => c.id === companyId);
        if (company) {
          company.isVerified = true;
        }
        this.showNotification = true;
        this.notificationMessage = 'Company verified successfully!';
        this.notificationType = 'success';
      },
      error: () => {
        this.showNotification = true;
        this.notificationMessage = 'Failed to verify company.';
        this.notificationType = 'error';
      },
    });
  }

  getCompanyLogo(company: Company): string {
    return company.logo || 'assets/home/logo.png';
  }
}
