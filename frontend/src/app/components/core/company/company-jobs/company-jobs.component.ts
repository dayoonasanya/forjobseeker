import { Component, OnInit } from '@angular/core';
import { JobService } from '../../../../services/job/job.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { Job } from '../../../../interfaces/job';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CompanyJobDetailsComponent } from "../company-job-details/company-job-details.component";
import { CompanyJobFormComponent } from "../company-job-form/company-job-form.component";

@Component({
  selector: 'app-company-jobs',
  standalone: true,
  imports: [CommonModule, RouterLink, CompanyJobDetailsComponent, CompanyJobFormComponent],
  templateUrl: './company-jobs.component.html',
  styleUrls: ['./company-jobs.component.css']
})
export class CompanyJobsComponent implements OnInit {

  jobs: Job[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  selectedJob: Job | null = null;
  isJobDetailsVisible: boolean = false;
  isJobFormVisible: boolean = false;

  constructor(
    private jobService: JobService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const companyId = this.authService.getCompanyId();
    if (companyId) {
      this.fetchCompanyJobs(companyId);
    } else {
      this.isLoading = false;
      this.errorMessage = 'No company found. Please ensure you are logged in.';
    }
  }

  fetchCompanyJobs(companyId: string): void {
    this.jobService.getJobsByCompany(companyId).subscribe(
      (response) => {
        this.jobs = response;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Error loading jobs. Please try again later.';
        this.isLoading = false;
      }
    );
  }

  // Show job creation form
  onPostJob(): void {
    this.selectedJob = null;
    this.isJobFormVisible = true;
  }

  // Show job editing form
  onEditJob(job: Job): void {
    this.selectedJob = job;
    this.isJobFormVisible = true;
  }

  // Close job form
  closeJobForm(isSuccessful: boolean): void {
    this.isJobFormVisible = false;
    if (isSuccessful) {
      this.fetchCompanyJobs(this.authService.getCompanyId()!);
    }
  }

  // Map backend job type to user-friendly string
  mapJobType(type: string): string {
    switch (type) {
      case 'FULL_TIME':
        return 'Full-Time';
      case 'PART_TIME':
        return 'Part-Time';
      case 'INTERNSHIP':
        return 'Internship';
      default:
        return 'Unknown';
    }
  }


  onDeleteJob(jobId: string): void {
    if (confirm('Are you sure you want to delete this job?')) {
      this.jobService.deleteJob(jobId).subscribe(
        () => {
          this.jobs = this.jobs.filter(job => job.id !== jobId);
          alert('Job deleted successfully');
        },
        (error) => {
          alert('Error deleting job. Please try again.');
        }
      );
    }
  }

 

  showJobDetails(job: Job) {
    this.selectedJob = job;
    this.isJobDetailsVisible = true;
  }
}
