import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  loginUser() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.authService.login(loginData.email, loginData.password).subscribe(
      (response) => {
        // Fetch the user's role from the local storage
        const userRole = localStorage.getItem('user-role');
        
        if (userRole === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else if (userRole === 'COMPANY') {
          this.router.navigate(['/company']);
        } else if (userRole === 'JOBSEEKER') {
          this.router.navigate(['/jobseeker']);
        } else {
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        this.errorMessage = 'Invalid email or password';
        console.error('Error during login:', error);
      }
    );
  }
}
