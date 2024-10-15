import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../../../../services/company/company.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { Company } from '../../../../interfaces/company';
import { Job } from '../../../../interfaces/job';
import { RouterLink } from '@angular/router';
import { CompanyJobDetailsComponent } from "../company-job-details/company-job-details.component";

@Component({
  selector: 'app-company-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, CompanyJobDetailsComponent],
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  company: Company | null = null;
  selectedJob: Job | null = null;
  isJobDetailsVisible: boolean = false;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private companyService: CompanyService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const companyId = this.authService.getCompanyId();
    if (companyId) {
      this.getCompanyProfile(companyId);
    } else {
      this.isLoading = false;
      this.errorMessage = 'No company found. Please ensure you are logged in as a company user.';
    }
  }

  getCompanyProfile(companyId: string): void {
    this.companyService.getCompanyById(companyId).subscribe(
      (response) => {
        this.company = response.company;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Error loading company details. Please try again later.';
        this.isLoading = false;
        console.error('Error fetching company profile:', error);
      }
    );
  }

  // Function to show job details
  showJobDetails(job: Job) {
    this.selectedJob = job;
    this.isJobDetailsVisible = true;
  }
}
