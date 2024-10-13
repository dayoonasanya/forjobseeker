import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-employer',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterLink, FormsModule],
  templateUrl: './register-employer.component.html',
  styleUrls: ['./register-employer.component.css']
})
export class RegisterEmployerComponent implements OnInit {
  // Declare form fields
  companyName: string = '';
  website: string = '';
  email: string = '';
  businessEmail: string = '';
  password: string = '';
  country: string = '';
  licenseNumber: string = '';

  isLoading: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  // Method to handle registration
  registerEmployer() {
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

    console.log('Employer registered:', employerData);

    // Navigate to login after registration
    this.router.navigate(['/login']);
  }
}
