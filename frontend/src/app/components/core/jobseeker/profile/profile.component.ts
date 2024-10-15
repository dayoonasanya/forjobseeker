import { Component } from '@angular/core';
import { NavbarComponent } from "../../../shared/navbar/navbar.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
