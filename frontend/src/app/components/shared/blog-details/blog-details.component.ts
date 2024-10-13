import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent {
  blogId: number | null = null;
  blog: any = null;

  blogs = [
    {
      id: 1,
      title: 'How to Introduce Yourself in a Job Interview?',
      date: '7 Feb, 2024',
      author: 'Admin',
      content: `
        Introducing yourself in a job interview is an essential step in making a great first impression. 
        It’s important to convey confidence and professionalism while giving the interviewer a sense of your background and experience.
        <br><br>
        Start by greeting your interviewer, maintaining eye contact, and giving a firm handshake. Then, succinctly summarize your career background, relevant skills, and what you bring to the role. 
        Practicing your introduction beforehand ensures you stay on point and avoid unnecessary tangents.
      `,
      image: 'assets/home/blog-1.jpg'
    },
    {
      id: 2,
      title: 'Looking for Highly Motivated Product to Build',
      date: '7 March, 2024',
      author: 'Admin',
      content: `
        Building a successful product requires dedication, research, and the motivation to solve real-world problems.
        <br><br>
        The first step in creating a product is identifying a gap in the market. Whether it's a new software tool or an innovative service, 
        being passionate about your idea is crucial to navigating the challenges that come with product development.
      `,
      image: 'assets/home/blog-2.jpg'
    },
    {
      id: 3,
      title: 'The Reason Why Software Development is the Best Job',
      date: '9 April, 2024',
      author: 'Admin',
      content: `
        Software development is one of the most rewarding fields in the tech industry. It allows you to solve complex problems, 
        continuously learn new skills, and create impactful products that are used by people all over the world.
        <br><br>
        Additionally, software developers enjoy high demand in the job market, making it a career path with great job security and flexibility.
      `,
      image: 'assets/home/blog-3.jpg'
    }
  ];

  constructor(private route: ActivatedRoute) {
    
    this.route.paramMap.subscribe(params => {
      this.blogId = Number(params.get('id'));
      this.blog = this.blogs.find(blog => blog.id === this.blogId);
    });
  }
}
