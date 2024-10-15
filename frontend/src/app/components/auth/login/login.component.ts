import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { NotificationComponent } from '../../shared/notification/notification.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterLink, FormsModule, NotificationComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  isLoading: boolean = true;

  notificationType: 'success' | 'error' = 'success';
  notificationMessage: string = '';
  showNotification: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

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
    if (!this.email || !this.password) {
      this.showErrorNotification('Email and password are required.');
      return false;
    }
    return true;
  }

  loginUser() {
    if (!this.validateForm()) {
      return;
    }

    const loginData = {
      email: this.email,
      password: this.password
    };

    this.authService.login(loginData.email, loginData.password).subscribe(
      (response) => {
        const userRole = localStorage.getItem('user-role');
        
        this.showSuccessNotification('Redirecting to dashboard...');
        setTimeout(() => {
          if (userRole === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else if (userRole === 'COMPANY') {
            this.router.navigate(['/company']);
          } else if (userRole === 'JOBSEEKER') {
            this.router.navigate(['/jobs']);
          } else {
            this.router.navigate(['/login']);
          }
        }, 3000);
      },
      (error) => {
        this.showErrorNotification('Invalid email or password');
        console.error('Error during login:', error);
      }
    );
  }
}
