import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { JobService } from '../../../services/job/job.service';
import { Job } from '../../../interfaces/job';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  jobs: Job[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.jobService.getAllJobs().subscribe({
      next: (jobs) => {
        this.jobs = jobs;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load jobs. Please try again later.';
        console.error('Error loading jobs:', error);
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
