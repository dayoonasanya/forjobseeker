import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';
import { CompanyService } from '../../../../services/company/company.service';
import { Company } from '../../../../interfaces/company';
import { Job } from '../../../../interfaces/job';
import { CompanyJobFormComponent } from "../company-job-form/company-job-form.component";

@Component({
  selector: 'app-company-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, CompanyJobFormComponent],
  templateUrl: './company-navbar.component.html',
  styleUrls: ['./company-navbar.component.css']
})
export class CompanyNavbarComponent implements OnInit {

  company: Company | null = null;
  companyLogoUrl: string = '';  
  companyName: string = ''; 
  companyEmail: string = '';  
  companyWebsite: string = '';  
  companyLocation: string = '';  
  notificationCount = 5;

  selectedJob: Job | null = null;
  isJobFormVisible: boolean = false;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private companyService: CompanyService,
    private router: Router
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
        this.company = response.company || response;

        if (this.company) {
          this.companyName = this.company.name || '';
          this.companyLogoUrl = this.company.logo || 'assets/home/logo.png';
          this.companyEmail = this.company.businessEmail || '';
          this.companyWebsite = this.company.website || '';
          this.companyLocation = this.company.country || '';
        }

        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Error loading company profile. Please try again later.';
        this.isLoading = false;
        console.error('Error fetching company profile:', error);
      }
    );
  }

  onPostJob(): void {
    this.selectedJob = null;
    this.isJobFormVisible = true;
  }

  closeJobForm(isSuccessful: boolean): void {
    this.isJobFormVisible = false;
  }

  // Logout
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
