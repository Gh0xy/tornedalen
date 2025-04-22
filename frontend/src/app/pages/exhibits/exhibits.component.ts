import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SafeUrlPipe } from './safe-url.pipe';

@Component({
  selector: 'app-exhibits',
  standalone: true,
  imports: [CommonModule, RouterModule, SafeUrlPipe],
  templateUrl: './exhibits.component.html',
  styleUrls: ['./exhibits.component.css']
})
export class ExhibitsComponent {
  videos: { url: string; rating: number; description: string }[] = [
    {
      url: 'https://www.youtube.com/embed/bbf0-ge4MzY',
      rating: 0,
      description: 'En introduktion till Konsthall Tornedalen och platsens historia.'
    },
    {
      url: 'https://www.youtube.com/embed/TwuVIb4lAj4',
      rating: 0,
      description: 'En intervju med en lokal konstnär om det kreativa arbetet i regionen.'
    },
    {
      url: 'https://www.youtube.com/embed/Jab97M0bmvc',
      rating: 0,
      description: 'Dokumentär om Tornedalens natur och hur den inspirerat konsten.'
    }
  ];

  setRating(videoIndex: number, rating: number): void {
    this.videos[videoIndex].rating = rating;
  }
}
