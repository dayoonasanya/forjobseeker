import { Routes } from '@angular/router';
import { HomeComponent } from './components/shared/home/home.component';
import { AboutComponent } from './components/shared/about/about.component';
import { FaqComponent } from './components/shared/faq/faq.component';
import { BlogComponent } from './components/shared/blog/blog.component';
import { BlogDetailsComponent } from './components/shared/blog-details/blog-details.component';
import { ContactUsComponent } from './components/shared/contact-us/contact-us.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'blogs', component: BlogComponent },
    { path: 'blogs/:id', component: BlogDetailsComponent },
    { path: 'contact-us', component: ContactUsComponent }   
];
