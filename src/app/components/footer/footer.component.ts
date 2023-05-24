import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule]
})
export class FooterComponent {

    scrollToTop(){
        window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
}
