import { Component } from '@angular/core';
import { CardSize } from './card/card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  readonly cardSize = CardSize;
  title = 'storyBook';
}
