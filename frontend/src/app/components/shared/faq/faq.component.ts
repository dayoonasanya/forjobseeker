import { Component, OnInit } from '@angular/core';
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
export class FaqComponent implements OnInit {
  faqStates: boolean[] = [false, false, false, false, false];
  isLoading: boolean = true;

  ngOnInit(): void {
    
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  toggleFaq(index: number): void {
    this.faqStates[index] = !this.faqStates[index];
  }
}
