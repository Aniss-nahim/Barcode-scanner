import {
  Component,
  inject
} from '@angular/core';
import { ScanbotSDKService } from '@app/services/scanbot-sdk.service';
@Component({
  selector: 'app-scanbot-sdk',
  standalone: true,
  template: `
    <div class="container">
      <button
        type="button"
        (click)="scan()"
        (keydown.enter)="scan()">
          Start scanner
      </button>
    </div>
  `,
  styleUrls: [],
  imports: [],
})
export class ScanbotSdkComponent {
    private readonly scanbotSdk = inject(ScanbotSDKService); 

    public async scan() {
      const isValid =  await this.scanbotSdk.checkLicense();
      if(!isValid) return; 

      const result = await this.scanbotSdk.startScanner();
      
      console.log("Scan code result: ", result);
    }
}