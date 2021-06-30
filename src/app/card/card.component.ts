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

  /**
   * The card title
   */
  @Input() title: string;
  /**
   * The size of the card
   */
  @Input() size: CardSize = CardSize.Normal;

  /**
   * Whether the card image should be displayed as a circle; if false, a rectangle image is used
   */
  @Input() isCircleImage = false;

  /**
   * event emitted whenever the action button of the card is clicked
   */
  @Output() cardClicked = new EventEmitter<void>();

  private readonly buttonSize = ButtonSize;
  private readonly cardSize = CardSize;

  constructor() { }

  onClick(): void {
    this.cardClicked.emit();
  }

}
