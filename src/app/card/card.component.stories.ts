import { CardComponent, CardSize } from './card.component';
import { Story } from '@storybook/angular';
import { ButtonComponent } from '../button/button.component';
import { DefaultStoryConfig, enumMemberAsLabel, enumMembersAsLabels } from 'src/stories/util';


export default DefaultStoryConfig({
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
      options: enumMembersAsLabels(CardSize, 'CardSize'),
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

export const CircleImage = Template.bind({});

CircleImage.args = {
    isCircleImage : true,
    title: 'Circle Image',
};

// CircleImage.parameters = {
//     docs : {
//         description : {
//             story : "a",
//         },
//         source : {
//             code: ""
//         }
//     }
// }


export const RectangleImage = Template.bind({});
RectangleImage.args = {
    isCircleImage : false,
    title: 'Rectangle Image',
};


export const Big = Template.bind({});
Big.args = {
    ...CircleImage.args,
    size: CardSize.Big,
};


export const Normal = Template.bind({});
Normal.args = {
    ...CircleImage.args,
    size: CardSize.Normal,
};

export const Small = Template.bind({});
Small.args = {
    ...CircleImage.args,
    size: CardSize.Small,
};
