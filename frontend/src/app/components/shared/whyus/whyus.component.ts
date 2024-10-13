import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whyus',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './whyus.component.html',
  styleUrl: './whyus.component.css'
})
export class WhyusComponent {

}
