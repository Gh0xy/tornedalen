import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importera RouterModule här

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], // Lägg till RouterModule här också
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}