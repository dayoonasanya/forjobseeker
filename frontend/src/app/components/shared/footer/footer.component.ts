import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'] // ✅ fix: "styleUrls", not "styleUrl"
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
}

