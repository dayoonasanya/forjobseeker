import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { NotificationComponent } from '../../shared/notification/notification.component';

@Component({
  selector: 'app-register-employer',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterLink, FormsModule, NotificationComponent],
  templateUrl: './register-employer.component.html',
  styleUrls: ['./register-employer.component.css']
})
export class RegisterEmployerComponent implements OnInit {
  companyName: string = '';
  website: string = '';
  email: string = '';
  businessEmail: string = '';
  password: string = '';
  country: string = '';
  licenseNumber: string = '';
  
  notificationType: 'success' | 'error' = 'success';
  notificationMessage: string = '';
  showNotification: boolean = false;
  
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
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
    if (!this.companyName || !this.email || !this.password || !this.businessEmail || !this.country || !this.licenseNumber) {
      this.showErrorNotification('All fields are required.');
      return false;
    }
    if (this.password.length < 6) {
      this.showErrorNotification('Password must be at least 6 characters long.');
      return false;
    }
    return true;
  }

  registerEmployer() {
    if (!this.validateForm()) {
      return;
    }

    const employerData = {
      email: this.email,
      password: this.password,
      role: 'COMPANY',
      companyName: this.companyName,
      website: this.website,
      country: this.country,
      businessEmail: this.businessEmail,
      licenseNumber: this.licenseNumber
    };

    console.log('Employer data being registered:', employerData);

    this.authService.register(employerData).subscribe(
      (response) => {
        this.showSuccessNotification('Registration successful. Redirecting...');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      (error) => {
        if (error.status === 409) {
          this.showErrorNotification('Email already in use. Proceed to login.');
        } else {
          this.showErrorNotification('Email or License already in use. Proceed to login.');
        }
        console.error('Error during employer registration:', error);
      }
    );
  }
}
