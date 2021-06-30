import { ButtonSize } from './button.component';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { ButtonComponent } from './button.component';

export default {
  title: 'Story Book/Button',
  component: ButtonComponent,
  argTypes: {
    label: {
        type: { name: 'string', required: false },
        defaultValue: 'Button',
        description: 'this input represents title of button',
        table: {
            category: 'inputs',
            type: { summary: 'string' },
            defaultValue: { summary: 'Button' },
        },
        control: {
          type: 'text'
        }
    },
    isPrimary : {
        type: { name: 'boolean', required: false },
        defaultValue: 'false',
        description: 'this input changes button to primary button',
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
        type: { name: 'ButtonSize', required: false },
        defaultValue: ButtonSize.Normal,
        description: 'this input changes button size',
        table: {
            category: 'inputs',
            type: { summary: 'ButtonSize' },
            defaultValue: { summary: ButtonSize.Normal },
        },
        options: [ButtonSize.Small, ButtonSize.Normal, ButtonSize.Big],
        control: {
          type: 'select'
        }
    },

    onClick : {
        description: 'this event calls on button click',
    },


    backgroundColor : {
        table : { disable: true }
    },
    primary : {
        table : { disable: true }
    },
  },
} as Meta;

const Template: Story<ButtonComponent> = (args: ButtonComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
    isPrimary: true,
    label: 'Primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
    isPrimary: false,
    label: 'Secondary',
};

export const Big = Template.bind({});
Big.args = {
    ...Secondary.args,
    size: ButtonSize.Big,
};


export const Normal = Template.bind({});
Normal.args = {
    ...Secondary.args,
    size: ButtonSize.Normal,
};

export const Small = Template.bind({});
Small.args = {
    ...Secondary.args,
    size: ButtonSize.Small,
};
