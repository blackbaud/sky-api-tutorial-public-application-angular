import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SkyPageModule } from '@skyux/pages';
import { SkyFluidGridModule } from '@skyux/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet, SkyPageModule, SkyFluidGridModule],
})
export class AppComponent {
  title = 'SKY API Public Application with PKCE';
}
