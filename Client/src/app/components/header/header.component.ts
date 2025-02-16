import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
    title = 'Cutie Pie';
    constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer){
      this.matIconRegistry.addSvgIcon(
        `dog`,
        this.domSanitizer.bypassSecurityTrustResourceUrl("svg/dog.svg")
      );
      this.matIconRegistry.addSvgIcon(
        `cat`,
        this.domSanitizer.bypassSecurityTrustResourceUrl("svg/cat.svg")
      );
    }
}
