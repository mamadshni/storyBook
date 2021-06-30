import { ButtonSize } from './../button/button.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';

export enum CardSize {
  Big = 'big',
  Normal = 'normal',
  Small = 'small'
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host : {
    '[class.big]': 'size === buttonSize.Big',
    '[class.small]': 'size === buttonSize.Small',
  }
})
export class CardComponent {

  @Input() title: string;
  @Input() size: CardSize = CardSize.Normal;

  @Input() isCircleImage = false;

  @Output() cardClicked = new EventEmitter<void>();

  readonly buttonSize = ButtonSize;
  readonly cardSize = CardSize;

  constructor() { }

  onClick(): void {
    this.cardClicked.emit();
  }

}
