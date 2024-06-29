import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FillInTheBlanksComponent } from '../components/fill-in-the-blanks/fill-in-the-blanks.component';
import { widgetDisplayOptions } from '../configs/config';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, FillInTheBlanksComponent],
})
export class AppComponent {
  title = 'FITBTest';
  readonly configData = widgetDisplayOptions;
}
