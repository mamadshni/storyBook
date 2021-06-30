import { ButtonSize } from './button.component';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { ButtonComponent } from './button.component';
import { DefaultStoryConfig } from 'src/stories/util';


// tslint:disable-next-line:align
export default DefaultStoryConfig({
  title: 'Story Book/Button',
  component: ButtonComponent,
  properties: [
    {
      name: 'label',
      type: 'string',
      defaultValue: 'Button',
      description: 'this input represents title of button',
      category: 'inputs',
      control: 'text',
    },
    {
      name: 'isPrimary',
      type: 'boolean',
      defaultValue: 'false',
      description: 'this input changes button to primary button',
      category: 'inputs',
      control: 'boolean',
    },
    {
      name: 'size',
      type: 'ButtonSize',
      defaultValue: ButtonSize.Normal,
      description: 'this input changes button size',
      category: 'inputs',
      options: [ButtonSize.Small, ButtonSize.Normal, ButtonSize.Big],
      control: 'select',
    },
  ]
});

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
