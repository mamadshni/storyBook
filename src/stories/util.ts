import { Meta, moduleMetadata, ArgTypes } from '@storybook/angular';

export type ControlTypeInterface = 'array' | 'boolean' | 'number' | 'range' | 'object' | 'radio' | 'inline-radio' | 'check' | '	inline-check' | 'select' | 'multi-select' | 'text' | 'color' | 'date';
export interface PropertiesInterface {

    name: string;
    description?: string;
    defaultValue?: string;

    disable?: boolean;
    require?: boolean;
    type?: any;

    category?: string;

    control?: ControlTypeInterface;
    options?: string[];

    minRange?: number;
    maxRange?: number;
    stepRange?: number;
}
export interface DefaultConfigInterface {

    title: string;
    component?: any;
    includeStories?: string[];

    declarations?: any[];
    imports?: any[];

    properties ?: PropertiesInterface[];
}



export function DefaultStoryConfig(configs: DefaultConfigInterface): Meta {
    const argTypesObject: ArgTypes = {};

    configs.properties.forEach((property: PropertiesInterface) => {
        argTypesObject[property.name] = {
            ...property,
            type: { name: `${property.type}`, required: property.require},
            defaultValue: property.defaultValue,
            description: property.description,
            table: {
                disable: property.disable,
                category: property.category,
                type: { summary: `${property.type}` },
                defaultValue: { summary: property.defaultValue},
            },
            options: property.options,
            control: {
                type: property.control || null
            }
        };
    });

    return {
        title: configs.title,
        component: configs.component,
        decorators: [
          moduleMetadata({
            declarations: configs.declarations,
            imports: configs.imports
          }),
        ],
        argTypes: argTypesObject
    } as Meta;
}
