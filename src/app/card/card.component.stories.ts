import { CardComponent, CardSize } from './card.component';
import { Story } from '@storybook/angular';
import { ButtonComponent } from '../button/button.component';
import { componentStoriesSetup, createStoryTemplate, createStoryWithConfig, getSettingsForPropertyUsingEnum } from 'src/stories/util';


export default componentStoriesSetup({
  title: 'Story Book/Card',
  component: CardComponent,
  declarations: [ButtonComponent],
  properties: [
    {
      name: 'content',
      type: 'string',
      defaultValue: 'Lorem ipsum dolor sit',
      description: 'this is arbitrary content projected with ng content',
      category: 'ng-content',
      control: 'text',
    },
    {
      name: 'title',
      type: 'string',
      defaultValue: 'title',
      control: 'text',
    },
    {
      name: 'isCircleImage',
      type: 'boolean',
      defaultValue: 'false',
      control: 'boolean'
    },
    getSettingsForPropertyUsingEnum({
      propertyName: 'size',
      enumUsed: CardSize,
      defaultValue: CardSize.Big,
      enumName: 'CardSize'
    }),
    {
      name: 'onClick',
      disable: true
    },
  ]
});

const storyTemplate: Story<CardComponent> = createStoryTemplate<CardComponent>({
  htmlTemplate: `<app-card [title]="title" [size]="size" [isCircleImage]="isCircleImage">{{content}}</app-card>`
});

export const CircleImage = createStoryWithConfig({
  template: storyTemplate,
  codeSnippet: `<app-card
  title="Circle Image"
  size="CardSize.Big"
  [isCircleImage]="true"
  (cardClicked)="cardClicked($event)">
  Lorem ipsum dolor sit</app-card>`
});

CircleImage.args = {
  isCircleImage: true,
  title: 'Circle Image'
};


export const RectangleImage = createStoryWithConfig({
  template: storyTemplate,
  storyDescription: 'This is some example **text**.',
  codeSnippet: `
  <app-card
  title="Rectangle Image"
  size="CardSize.Big"
  [isCircleImage]="false"
  (cardClicked)="cardClicked($event)"
>Lorem ipsum dolor sit</app-card>
`
});

RectangleImage.args = {
  isCircleImage: false,
  title: 'Rectangle Image',
};


export const Big = createStoryWithConfig({
  template: storyTemplate,
  storyDescription: 'test',
  codeSnippet: `<app-card
  title="Circle Image"
  size="big"
  [isCircleImage]="true"
  (cardClicked)="cardClicked($event)"
>Lorem ipsum dolor sit</app-card>`
});

Big.args = {
  ...CircleImage.args,
  size: CardSize.Big,
};


export const Normal = createStoryWithConfig({
  template: storyTemplate,
  storyDescription: 'test',
  codeSnippet: `<app-card
  title="Circle Image"
  size="normal"
  [isCircleImage]="true"
  (cardClicked)="cardClicked($event)"
>Lorem ipsum dolor sit</app-card>`
});

Normal.args = {
  ...CircleImage.args,
  size: CardSize.Normal,
};

export const Small = createStoryWithConfig({
  template: storyTemplate,
  storyDescription: 'test',
  codeSnippet: `
  <app-card
    title="Circle Image"
    size="small"
    [isCircleImage]="true"
    (cardClicked)="cardClicked($event)"
  >Lorem ipsum dolor sit</app-card>`
});

Small.args = {
  ...CircleImage.args,
  size: CardSize.Small,
};
