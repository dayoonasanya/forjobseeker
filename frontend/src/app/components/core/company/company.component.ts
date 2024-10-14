import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CompanyNavbarComponent } from './company-navbar/company-navbar.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CompanySidebarComponent } from './company-sidebar/company-sidebar.component';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, CompanyNavbarComponent, RouterLink, CompanySidebarComponent, RouterOutlet],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent {

}
