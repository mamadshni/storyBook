import { Meta } from '@storybook/angular';
import { Args as DefaultArgs } from '@storybook/addons';

export interface DefaultConfigInterface<ComponentType> {

    title: string;
    component?: ComponentType;
    subcomponents?: Record<string, ComponentType>;

    declarations?: any[];
    entryComponents?: any[];
    imports?: any[];
    schemas?: any[];
    providers?: any[];
}

export defaultConfig(args: DefaultConfigInterface) : Meta<Args> {

}
