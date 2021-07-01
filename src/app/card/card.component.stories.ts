import { CardComponent, CardSize } from './card.component';
import { Story } from '@storybook/angular';
import { ButtonComponent } from '../button/button.component';
import { componentStoriesSetup, createStoryWithConfig, enumMemberAsLabel, enumMembersAsLabels, enumValues } from 'src/stories/util';


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
    {
      name: 'size',
      type: 'CardSize',
      defaultValue: enumMemberAsLabel(CardSize, CardSize.Big, 'CardSize'),
      category: 'inputs',
      options: enumValues(CardSize),
      labels: enumMembersAsLabels(CardSize, 'CardSize'),
      control: 'radio',
    },
    {
      name: 'onClick',
      disable: true
    },
  ]
});



const Template: Story<CardComponent> = (args: CardComponent) => ({
    template: `
        <app-card
            [title]="title" [size]="size" [isCircleImage]="isCircleImage">
            {{content}}
        </app-card>
    `,
    props: args,
});



export const CircleImage = createStoryWithConfig({
  template : Template,
  storyDescription : 'test',
  codeSnippet : `
      <app-card
        [title]="title" [size]="size" [isCircleImage]="isCircleImage">
        content
      </app-card>
`
});

CircleImage.args = {
    isCircleImage : true,
    title: 'Circle Image',
};


export const RectangleImage = createStoryWithConfig({
  template : Template,
  storyDescription : 'test',
  codeSnippet : 'test'
});

RectangleImage.args = {
    isCircleImage : false,
    title: 'Rectangle Image',
};


export const Big = createStoryWithConfig({
  template : Template,
  storyDescription : 'test',
  codeSnippet : 'test'
});

Big.args = {
    ...CircleImage.args,
    size: CardSize.Big,
};


export const Normal = createStoryWithConfig({
  template : Template,
  storyDescription : 'test',
  codeSnippet : 'test'
});

Normal.args = {
    ...CircleImage.args,
    size: CardSize.Normal,
};

export const Small = createStoryWithConfig({
  template : Template,
  storyDescription : 'test',
  codeSnippet : 'test'
});

Small.args = {
    ...CircleImage.args,
    size: CardSize.Small,
};
