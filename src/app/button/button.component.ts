import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


export enum ButtonSize {
  Big = 'big',
  Normal = 'normal',
  Small = 'small'
}

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[class.primary]': 'isPrimary',
    '[class.big]': 'size === buttonSize.Big',
    '[class.small]': 'size === buttonSize.Small',
    '(click)': 'onClick()'
  }
})

export class ButtonComponent implements OnInit {
  /**
   * if this is true, the button is colored in the primary color
   */
  @Input() isPrimary = false;
  /**
   * The size of the button. Can be small, medium or large
   */
  @Input() size: ButtonSize = ButtonSize.Normal;
  /**
   * The text that should be displayed on the button
   */
  @Input() label = 'Button';

  /**
   * Click handler
   */
  @Output() clicked = new EventEmitter<void>();

  private readonly buttonSize = ButtonSize;

  constructor() { }

  ngOnInit(): void {
    console.log(this.size);
  }

  onClick(): void {
    this.clicked.emit();
  }

}
