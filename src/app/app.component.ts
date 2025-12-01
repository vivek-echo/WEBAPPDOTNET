// Angular import
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// project import
import { SpinnerComponent } from './shared/components/spinner/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet]
})
export class AppComponent {
  title = 'Berry Angular Free Version';
}
