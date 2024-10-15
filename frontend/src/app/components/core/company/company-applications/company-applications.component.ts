import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../../../services/application/application.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-company-applications',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './company-applications.component.html',
  styleUrls: ['./company-applications.component.css']
})
export class CompanyApplicationsComponent implements OnInit {
  applications: any[] = [];
  acceptedApplications: any[] = [];
  rejectedApplications: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  selectedApplication: any = null;
  isApplicationDetailsVisible: boolean = false;

  constructor(
    private applicationService: ApplicationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const companyId = this.authService.getCompanyId();
    if (companyId) {
      this.fetchCompanyApplications(companyId);
    } else {
      this.isLoading = false;
      this.errorMessage = 'No company found. Please ensure you are logged in.';
    }
  }

  fetchCompanyApplications(companyId: string): void {
    this.applicationService.getApplicationsByCompany(companyId).subscribe(
      (response) => {
        this.applications = response.filter(app => app.status === 'PENDING');
        this.acceptedApplications = response.filter(app => app.status === 'ACCEPTED');
        this.rejectedApplications = response.filter(app => app.status === 'REJECTED');
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Error loading applications. Please try again later.';
        this.isLoading = false;
      }
    );
  }

  acceptApplication(applicationId: string): void {
    this.updateApplicationStatus(applicationId, 'ACCEPTED');
  }

  rejectApplication(applicationId: string): void {
    this.updateApplicationStatus(applicationId, 'REJECTED');
  }

  updateApplicationStatus(applicationId: string, status: string): void {
    this.applicationService.updateApplicationStatus(applicationId, status).subscribe(
      () => {
        alert(`Application ${status.toLowerCase()} successfully.`);
        this.fetchCompanyApplications(this.authService.getCompanyId()!);
      },
      (error) => {
        alert(`Error updating application. Please try again.`);
      }
    );
  }

  getStatusDisplay(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'Pending';
      case 'ACCEPTED':
        return 'Accepted';
      case 'REJECTED':
        return 'Rejected';
      default:
        return status;
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'ACCEPTED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  viewApplicationDetails(application: any): void {
    this.selectedApplication = application;
    this.isApplicationDetailsVisible = true;
  }

  closeApplicationDetails(): void {
    this.isApplicationDetailsVisible = false;
    this.selectedApplication = null;
  }
}
