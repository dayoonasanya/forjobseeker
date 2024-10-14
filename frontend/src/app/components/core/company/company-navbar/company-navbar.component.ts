import { Component } from '@angular/core';

@Component({
  selector: 'app-company-navbar',
  standalone: true,
  imports: [],
  templateUrl: './company-navbar.component.html',
  styleUrl: './company-navbar.component.css'
})
export class CompanyNavbarComponent {

  companyLogoUrl = 'assets/home/logo.png';
  companyName = 'Brand';
  companyEmail = 'web@gmail.com';
  companyWebsite = 'www.company.com';
  companyLocation = 'City, Country';


  logout() {
    throw new Error('Method not implemented.');
  }
}
