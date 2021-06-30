import { CardComponent, CardSize } from './card.component';
import { moduleMetadata, Story, Meta, componentWrapperDecorator } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

export default {
  title: 'Story Book/Card',
  component: CardComponent,
  decorators: [

    moduleMetadata({
      declarations: [ButtonComponent],
    }),
  ],
  argTypes: {
    content: {
        defaultValue: 'Lorem ipsum dolor sit',
        description: 'this is content of the card with ng content',
        table: {
            category: 'ng-content',
        },
        control: {
          type: 'text'
        }
    },

    title: {
        type: { name: 'string', required: false },
        defaultValue: 'Title',
        description: 'this input represents title of Card',
        table: {
            category: 'inputs',
            type: { summary: 'string' },
            defaultValue: { summary: 'Title' },
        },
        control: {
          type: 'text'
        }
    },
    isCircleImage : {
        type: { name: 'boolean', required: false },
        defaultValue: 'false',
        description: 'this input changes card image from rectangle to circle',
        table: {
            category: 'inputs',
            type: { summary: 'boolean' },
            defaultValue: { summary: 'false' },
        },
        control: {
          type: 'boolean'
        }
    },

    size : {
        type: { name: 'CardSize', required: false },
        defaultValue: CardSize.Normal,
        description: 'this input changes card size',
        table: {
            category: 'inputs',
            type: { summary: 'CardSize' },
            defaultValue: { summary: CardSize.Normal },
        },
        options: [CardSize.Small, CardSize.Normal, CardSize.Big],
        control: {
          type: 'radio'
        }
    },

    onClick : {
        description: 'this event calls on button card click',
    },

  },

} as Meta;



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
