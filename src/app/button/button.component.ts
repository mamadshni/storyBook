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

  @Input() isPrimary = false;
  @Input() size: ButtonSize = ButtonSize.Normal;
  @Input() label = 'Button';

  @Output() clicked = new EventEmitter<void>();

  readonly buttonSize = ButtonSize;

  constructor() { }

  ngOnInit(): void {
    console.log(this.size);
  }

  onClick(): void {
    this.clicked.emit();
  }

}
