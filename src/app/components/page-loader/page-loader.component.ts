import { Component } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-page-loader',
  standalone: true,
  imports: [ProgressBarModule],
  templateUrl: './page-loader.component.html',
  styleUrl: './page-loader.component.scss'
})
export class PageLoaderComponent {

}
