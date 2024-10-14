import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-get-started',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css']
})
export class GetStartedComponent implements OnInit {
  isLoading: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  navigateTo(type: 'jobseeker' | 'employer') {
    if (type === 'jobseeker') {
      this.router.navigate(['/register-jobseeker']);
    } else if (type === 'employer') {
      this.router.navigate(['/register-employer']);
    }
  }
}
