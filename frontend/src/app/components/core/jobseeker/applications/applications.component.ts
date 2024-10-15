import { Component } from '@angular/core';
import { NavbarComponent } from "../../../shared/navbar/navbar.component";

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css'
})
export class ApplicationsComponent {

}
