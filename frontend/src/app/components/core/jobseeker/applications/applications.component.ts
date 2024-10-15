import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../../../services/application/application.service';
import { NavbarComponent } from "../../../shared/navbar/navbar.component";
import { Application } from '../../../../interfaces/application';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterLink],
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  applications: Application[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private applicationService: ApplicationService) {}

  ngOnInit(): void {
    const jobSeekerId = localStorage.getItem('jobseeker-id');

    console.log('JobSeeker ID:', jobSeekerId);

    if (jobSeekerId) {
      this.loadApplications(jobSeekerId);
    } else {
      this.isLoading = false;
      this.errorMessage = 'No JobSeeker ID found. Please log in again.';
      console.error(this.errorMessage);
    }
  }

  loadApplications(jobSeekerId: string): void {
    console.log('Loading applications for JobSeeker ID:', jobSeekerId);

    this.applicationService.getApplicationsByJobSeeker(jobSeekerId).subscribe({
      next: (response) => {
        console.log('Applications loaded:', response);
        this.applications = response.applications;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading applications:', error);
        this.errorMessage = 'Failed to load applications. Please try again later.';
        this.isLoading = false;
      }
    });
  }
}
