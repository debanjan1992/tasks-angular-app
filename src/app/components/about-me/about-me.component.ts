import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { PanelModule } from 'primeng/panel';
import { differenceInYears } from "date-fns";

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [ButtonModule, TagModule, CommonModule, PanelModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {
  name = "Debanjan Saha";
  email = "debanjansaha1992@gmail.com";
  skills = ["Angular", "React", "Redux", "NgRx", "RxJS", "HTML", "CSS/SCSS", "Javascript", "Typescript", "Webpack"];
  experienceStart = new Date(2014, 6, 14);

  gotoLinkedIn() {
    window.location.href = "https://www.linkedin.com/in/debanjan-saha-78a83893/";
  }

  gotoInstagram() {
    window.location.href = "https://www.instagram.com/travellingcoder/";
  }

  get cover() {
    return `I'm a Web Developer based in Pune, India. I have over ${this.experience} years of experience in web development using angular and react!`;
  }

  get experience() {
    return differenceInYears(new Date(), this.experienceStart);
  }
}
