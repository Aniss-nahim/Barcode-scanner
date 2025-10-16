import { Component } from '@angular/core';
import { ScanbotSdkComponent } from './components/scanbot-sdk/scanbot-sdk.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScanbotSdkComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}
