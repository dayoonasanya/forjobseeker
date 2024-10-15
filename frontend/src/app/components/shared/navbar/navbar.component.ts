import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { JobSeekerService } from '../../../services/jobseeker/jobseeker.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  userRole: string | null = null;
  jobseekerInitials: string = '';
  jobseekerProfileImage: string | null = null;
  jobseekerName: string = '';
  jobseekerPhone: string = '';
  errorMessage: string = '';
 
  isDropdownVisible: boolean = false;
  constructor(
    private authService: AuthService,
    private jobSeekerService: JobSeekerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.userRole = this.authService.getUserRole();

    if (this.isLoggedIn && this.userRole === 'JOBSEEKER') {
      this.loadJobSeekerDetails();
    }
  }

  loadJobSeekerDetails(): void {
    const jobSeekerId = localStorage.getItem('jobseeker-id');
    console.log('JobSeeker ID from localStorage:', jobSeekerId);
  
    if (jobSeekerId) {
      this.jobSeekerService.getJobSeekerById(jobSeekerId).subscribe({
        next: (response) => {
          const jobseeker = response.jobSeeker;
          console.log('Jobseeker details received:', jobseeker);
      
          this.jobseekerProfileImage = jobseeker.profileImage || null;
          this.jobseekerPhone = jobseeker.phone || '';
          
          if (jobseeker.firstName && jobseeker.lastName) {
            this.jobseekerInitials = this.getInitials(jobseeker.firstName, jobseeker.lastName);
            this.jobseekerName = `${jobseeker.firstName} ${jobseeker.lastName}`;
          } else {
            this.jobseekerInitials = 'NA'; 
            this.jobseekerName = 'Unknown';
          }
        },
        error: (error) => {
          console.error('Failed to load jobseeker details', error);
          if (error.status === 404) {
            this.errorMessage = `JobSeeker with ID ${jobSeekerId} not found. Please check your account details.`;
          } else if (error.status === 401) {
            this.errorMessage = 'Unauthorized access. Please log in again.';
            this.authService.logout();
          } else {
            this.errorMessage = `Failed to load jobseeker details: ${error.message}`;
          }
        }
      });
    } else {
      console.error('No jobseeker ID found in localStorage');
      this.errorMessage = 'No jobseeker ID found. Please try logging in again.';
    }
  }

  getInitials(firstName: string, lastName: string): string {
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  }

  toggleDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}