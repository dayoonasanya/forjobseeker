import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { JobService } from '../../../services/job/job.service';
import { Job } from '../../../interfaces/job';
import { ApplicationService } from '../../../services/application/application.service';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent implements OnInit {
  job: Job | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';
  notificationMessage: string = ''; 

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const jobId = this.route.snapshot.paramMap.get('id');
    if (jobId) {
      this.loadJobDetails(jobId);
    }
  }

  loadJobDetails(jobId: string): void {
    this.jobService.getJobById(jobId).subscribe({
      next: (job) => {
        console.log('Job details received:', job);
        this.job = job;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading job details:', error);
        this.errorMessage = 'Failed to load job details.';
        this.isLoading = false;
      }
    });
  }

  applyForJob(): void {
    const isLoggedIn = this.authService.isAuthenticated();
  
    if (!isLoggedIn) {
      this.notificationMessage = 'Please log in to apply for this job.';
      this.router.navigate(['/login']);
    } else {
      const jobId = this.job?.id;
      const jobSeekerId = localStorage.getItem('jobseeker-id');
  
      console.log('JobSeeker ID:', jobSeekerId);
  
      if (!jobSeekerId) {
        this.notificationMessage = 'No JobSeeker ID found. Please log in again.';
        this.authService.logout();
        return;
      }
  
      if (jobId && jobSeekerId) {
        const applicationData = {
          jobId: jobId,
          jobSeekerId: jobSeekerId,
          status: 'PENDING'
        };
  
        console.log('Application data to be sent:', applicationData);
  
        this.applicationService.createApplication(applicationData).subscribe({
          next: (response) => {
            console.log('Application submitted:', response);
            this.notificationMessage = 'Your application has been submitted successfully!';
          },
          error: (error) => {
            console.error('Error submitting application:', error);
            this.notificationMessage = 'Failed to submit your application. Please try again later.';
          }
        });
      }
    }
  }
  
  

  /**
   * Function to get formatted job type
   * @param type The job type
   * @returns Formatted job type string
   */
  getJobTypeLabel(type: string): string {
    switch (type) {
      case 'FULL_TIME':
        return 'Full-Time';
      case 'PART_TIME':
        return 'Part Time';
      case 'INTERNSHIP':
        return 'Internship';
      default:
        return 'Unknown';
    }
  }
}
