import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Lägg till RouterModule här

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterModule],  // Lägg till RouterModule här
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
