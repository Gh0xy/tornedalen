import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SafeUrlPipe } from './safe-url.pipe';

@Component({
  selector: 'app-exhibits',
  standalone: true,
  imports: [CommonModule, RouterModule, SafeUrlPipe], // Lägg till pipen här
  templateUrl: './exhibits.component.html',
  styleUrls: ['../../../styles.css']
})
export class ExhibitsComponent {
  videos: string[] = [
    'https://www.youtube.com/embed/bbf0-ge4MzY',
    'https://www.youtube.com/embed/TwuVIb4lAj4',
    'https://www.youtube.com/embed/Jab97M0bmvc'
  ];
}
