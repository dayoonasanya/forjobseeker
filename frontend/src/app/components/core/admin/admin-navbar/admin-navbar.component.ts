import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {
  avatarUrl: string = 'assets/home/admin.svg';

  constructor(private authService: AuthService, private router: Router) {} 

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
