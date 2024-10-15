import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JobService } from '../../../services/job/job.service';
import { Job } from '../../../interfaces/job';
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

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute
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
