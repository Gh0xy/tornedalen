import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-exhibits',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './exhibits.component.html',
  styleUrls: ['../../../styles.css']
})
export class ExhibitsComponent {}