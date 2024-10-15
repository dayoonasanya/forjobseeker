import { Component } from '@angular/core';
import { NavbarComponent } from "../../../shared/navbar/navbar.component";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

}
