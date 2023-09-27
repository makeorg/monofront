import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { FlexElementStyle } from '@make.org/ui/elements/FlexElements';
import { SwitchButton } from '.';

const meta: Meta<typeof SwitchButton> = {
  component: SwitchButton,
  argTypes: {
    value: {
      control: 'boolean',
      description: 'Value of the switch',
    },
    onEnabling: {
      description: 'Method called when the switch is enable',
    },
    onDisabling: {
      description: 'Method called when the switch is disable',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SwitchButton>;

export const Switch: Story = {
  args: {
    value: false,
  },
  render: args => {
    const { value } = args;

    const enableSwitch = (): boolean => true;
    const disableSwitch = (): boolean => false;

    return (
      <FlexElementStyle>
        <SwitchButton
          value={value}
          onEnabling={enableSwitch}
          onDisabling={disableSwitch}
        />
      </FlexElementStyle>
    );
  },
};
