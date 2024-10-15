import { Component, OnInit } from '@angular/core';
import { JobSeekerService } from '../../../../services/jobseeker/jobseeker.service';
import { NavbarComponent } from "../../../shared/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { JobSeeker } from '../../../../interfaces/jobseeker';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterLink],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  jobSeeker: JobSeeker | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private jobSeekerService: JobSeekerService) {}

  ngOnInit(): void {
    const jobSeekerId = localStorage.getItem('jobseeker-id');
    
    if (jobSeekerId) {
      this.loadJobSeekerDetails(jobSeekerId);
    } else {
      this.isLoading = false;
      this.errorMessage = 'No JobSeeker ID found. Please log in again.';
    }
  }

  loadJobSeekerDetails(jobSeekerId: string): void {
    this.jobSeekerService.getJobSeekerById(jobSeekerId).subscribe({
      next: (response) => {
        this.jobSeeker = response.jobSeeker;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading jobseeker details:', error);
        this.errorMessage = 'Failed to load jobseeker details.';
        this.isLoading = false;
      }
    });
  }
}
