import { Component, OnInit } from '@angular/core';
import { JobSeekerService } from '../../../../services/jobseeker/jobseeker.service';
import { JobSeeker } from '../../../../interfaces/jobseeker';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from '../../../shared/notification/notification.component';

@Component({
  selector: 'app-admin-jobseekers',
  standalone: true,
  imports: [CommonModule, NotificationComponent],
  templateUrl: './admin-jobseekers.component.html',
  styleUrls: ['./admin-jobseekers.component.css'],
})
export class AdminJobseekersComponent implements OnInit {
  jobSeekers: JobSeeker[] = [];
  showNotification = false;
  notificationMessage = '';
  notificationType: 'success' | 'error' | 'warning' | 'info' = 'success';
  confirmDeleteDialogVisible = false;
  jobSeekerToDelete: JobSeeker | null = null;

  constructor(private jobSeekerService: JobSeekerService) {}

  ngOnInit(): void {
    this.loadJobSeekers();
  }

  loadJobSeekers(): void {
    this.jobSeekerService.getAllJobSeekers().subscribe({
      next: (response) => {
        this.jobSeekers = response;
      },
      error: () => {
        this.showNotification = true;
        this.notificationMessage = 'Failed to load job seekers.';
        this.notificationType = 'error';
      },
    });
  }

  // Show confirmation dialog for deletion
  confirmDelete(jobSeeker: JobSeeker): void {
    this.jobSeekerToDelete = jobSeeker;
    this.confirmDeleteDialogVisible = true;
  }

  // Cancel deletion
  cancelDelete(): void {
    this.confirmDeleteDialogVisible = false;
    this.jobSeekerToDelete = null;
  }

  // Delete a job seeker after confirmation
  deleteJobSeeker(): void {
    if (this.jobSeekerToDelete) {
      this.jobSeekerService.deleteJobSeekerProfile(this.jobSeekerToDelete.id).subscribe({
        next: () => {
          this.jobSeekers = this.jobSeekers.filter(seeker => seeker.id !== this.jobSeekerToDelete?.id);
          this.showNotification = true;
          this.notificationMessage = 'Job seeker deleted successfully!';
          this.notificationType = 'success';
          this.confirmDeleteDialogVisible = false;
          this.jobSeekerToDelete = null;
        },
        error: () => {
          this.showNotification = true;
          this.notificationMessage = 'Failed to delete job seeker.';
          this.notificationType = 'error';
          this.confirmDeleteDialogVisible = false;
        },
      });
    }
  }

  getProfileImage(jobSeeker: JobSeeker): string {
    return jobSeeker.profileImage || 'assets/home/default.svg';
  }
}
