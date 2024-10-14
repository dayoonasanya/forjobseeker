import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { JobFieldService } from '../../../services/jobfield/jobfield.service';
import { AuthService } from '../../../services/auth/auth.service';
import { JobField } from '../../../interfaces/jobfield';
import { NotificationComponent } from '../../shared/notification/notification.component';

@Component({
  selector: 'app-register-jobseeker',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, FormsModule, NotificationComponent, RouterLink],
  templateUrl: './register-jobseeker.component.html',
  styleUrls: ['./register-jobseeker.component.css']
})
export class RegisterJobseekerComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  phone: string = '';
  maxQualification: string = 'Bachelor\'s Degree';
  yearsOfExperience: string = '0';
  jobFieldId: string = '';
  jobFields: JobField[] = [];
  isLoading: boolean = true;

  notificationType: 'success' | 'error' = 'success';
  notificationMessage: string = '';
  showNotification: boolean = false;

  constructor(
    private router: Router,
    private jobFieldService: JobFieldService,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadJobFields();
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  loadJobFields(): void {
    this.jobFieldService.getAllJobFields().subscribe(
      (fields: JobField[]) => {
        this.jobFields = fields;
        this.cd.detectChanges();
      },
      (error) => {
        this.showErrorNotification('Error fetching job fields. Please try again later.');
        console.error('Error fetching job fields:', error);
      }
    );
  }

  showSuccessNotification(message: string): void {
    this.notificationType = 'success';
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 5000);
  }

  showErrorNotification(message: string): void {
    this.notificationType = 'error';
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 5000);
  }

  validateForm(): boolean {
    if (!this.firstName || !this.lastName || !this.email || !this.password || !this.phone || !this.jobFieldId) {
      this.showErrorNotification('All fields are required.');
      return false;
    }
    if (this.password.length < 6) {
      this.showErrorNotification('Password must be at least 6 characters long.');
      return false;
    }
    return true;
  }

  registerJobseeker() {
    if (!this.validateForm()) {
      return;
    }

    const jobseekerData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      phone: this.phone,
      maxQualification: this.maxQualification,
      yearsOfExperience: this.yearsOfExperience,
      jobFieldId: this.jobFieldId,
      role: 'JOBSEEKER'
    };
  
    this.authService.register(jobseekerData).subscribe(
      (response) => {
        this.showSuccessNotification('Registration successful. Redirecting...');
        setTimeout(() => {
          this.router.navigate(['/jobseeker']);
        }, 3000);
      },
      (error) => {
        this.showErrorNotification('Email already in use. Please login');
        console.error('Error during registration:', error);
      }
    );
  }
}

