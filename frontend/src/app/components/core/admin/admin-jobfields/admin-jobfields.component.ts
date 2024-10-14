import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobFieldService } from '../../../../services/jobfield/jobfield.service';
import { JobField } from '../../../../interfaces/jobfield';
import { NotificationComponent } from '../../../shared/notification/notification.component';

@Component({
  selector: 'app-admin-jobfields',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationComponent],
  templateUrl: './admin-jobfields.component.html',
  styleUrls: ['./admin-jobfields.component.css']
})
export class AdminJobfieldsComponent implements OnInit {
  jobFields: JobField[] = [];
  jobFieldName: string = '';
  editingJobFieldId: string | null = null;
  notificationMessage: string = '';
  notificationType: 'success' | 'error' = 'success';
  showNotification: boolean = false;

  constructor(private jobFieldService: JobFieldService) {}

  ngOnInit(): void {
    this.loadJobFields();
  }

  // Load all job fields
  loadJobFields(): void {
    this.jobFieldService.getAllJobFields().subscribe({
      next: (fields) => {
        this.jobFields = fields;
      },
      error: (err) => {
        this.showNotificationMessage('error', 'Failed to load job fields.');
      }
    });
  }

  // Add or Update Job Field
  saveJobField(): void {
    if (!this.jobFieldName.trim()) {
      this.showNotificationMessage('error', 'Job field name is required.');
      return;
    }

    if (this.editingJobFieldId) {
      // Update Job Field
      this.jobFieldService.updateJobField(this.editingJobFieldId, { name: this.jobFieldName }).subscribe({
        next: () => {
          this.loadJobFields();
          this.resetForm();
          this.showNotificationMessage('success', 'Job field updated successfully.');
        },
        error: () => {
          this.showNotificationMessage('error', 'Failed to update job field.');
        }
      });
    } else {
      // Add Job Field
      this.jobFieldService.createJobField({ name: this.jobFieldName }).subscribe({
        next: () => {
          this.loadJobFields();
          this.resetForm();
          this.showNotificationMessage('success', 'Job field added successfully.');
        },
        error: () => {
          this.showNotificationMessage('error', 'Failed to add job field.');
        }
      });
    }
  }

  // Start editing a job field
  startEditJobField(field: JobField): void {
    this.editingJobFieldId = field.id;
    this.jobFieldName = field.name;
  }

  // Delete a job field
  deleteJobField(id: string): void {
    this.jobFieldService.deleteJobField(id).subscribe({
      next: () => {
        this.loadJobFields();
        this.showNotificationMessage('success', 'Job field deleted successfully.');
      },
      error: () => {
        this.showNotificationMessage('error', 'Failed to delete job field.');
      }
    });
  }

  // Reset form to default state
  resetForm(): void {
    this.jobFieldName = '';
    this.editingJobFieldId = null;
  }

  // Show notification with the custom notification component
  showNotificationMessage(type: 'success' | 'error', message: string): void {
    this.notificationType = type;
    this.notificationMessage = message;
    this.showNotification = true;

    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }
}
