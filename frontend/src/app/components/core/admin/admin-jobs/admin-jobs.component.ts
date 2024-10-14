import { Component, OnInit } from '@angular/core';
import { JobService } from '../../../../services/job/job.service';
import { Job } from '../../../../interfaces/job';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from '../../../shared/notification/notification.component';

@Component({
  selector: 'app-admin-jobs',
  standalone: true,
  imports: [CommonModule, NotificationComponent],
  templateUrl: './admin-jobs.component.html',
  styleUrls: ['./admin-jobs.component.css']
})
export class AdminJobsComponent implements OnInit {
  jobs: Job[] = [];
  showNotification = false;
  notificationMessage = '';
  notificationType: 'success' | 'error' | 'warning' | 'info' = 'success';
  confirmDeleteDialogVisible = false;
  jobToDelete: Job | null = null;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.jobService.getAllJobs().subscribe({
      next: (response) => {
        this.jobs = response;
        console.log(this.jobs);
      },
      error: () => {
        this.showNotification = true;
        this.notificationMessage = 'Failed to load jobs.';
        this.notificationType = 'error';
      },
    });
  }

  // Map job types to user-friendly labels
  getJobTypeLabel(type: string): string {
    switch (type) {
      case 'FULL_TIME':
        return 'Full Time';
      case 'PART_TIME':
        return 'Part Time';
      case 'INTERNSHIP':
        return 'Internship';
      default:
        return 'Unknown';
    }
  }

  confirmDelete(job: Job): void {
    this.jobToDelete = job;
    this.confirmDeleteDialogVisible = true;
  }

  cancelDelete(): void {
    this.confirmDeleteDialogVisible = false;
    this.jobToDelete = null;
  }

  deleteJob(): void {
    if (this.jobToDelete) {
      this.jobService.deleteJob(this.jobToDelete.id).subscribe({
        next: () => {
          this.jobs = this.jobs.filter(job => job.id !== this.jobToDelete?.id);
          this.showNotification = true;
          this.notificationMessage = 'Job deleted successfully!';
          this.notificationType = 'success';
          this.confirmDeleteDialogVisible = false;
          this.jobToDelete = null;
        },
        error: () => {
          this.showNotification = true;
          this.notificationMessage = 'Failed to delete job.';
          this.notificationType = 'error';
          this.confirmDeleteDialogVisible = false;
        },
      });
    }
  }
}
