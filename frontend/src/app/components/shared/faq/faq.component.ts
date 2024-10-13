import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterLink, FooterComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  faqStates: boolean[] = [false, false, false, false, false];

  
  toggleFaq(index: number): void {
    this.faqStates[index] = !this.faqStates[index];
  }
}
