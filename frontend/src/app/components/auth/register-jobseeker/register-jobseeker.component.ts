import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-jobseeker',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, FormsModule, RouterLink],
  templateUrl: './register-jobseeker.component.html',
  styleUrls: ['./register-jobseeker.component.css']
})
export class RegisterJobseekerComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  phone: string = '';
  maxQualification: string = 'Bachelor\'s Degree'; // Default value
  yearsOfExperience: number | null = null;
  jobFieldId: string = '';

  jobFields = [
    { id: '1', name: 'Software Development' },
    { id: '2', name: 'Marketing' },
    { id: '3', name: 'Project Management' }
  ];

  isLoading: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  registerJobseeker() {
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

    console.log('Registering jobseeker:', jobseekerData);

    // Simulate navigation after registration
    this.router.navigate(['/jobseeker']);
  }
}
