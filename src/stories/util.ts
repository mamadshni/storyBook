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

    properties?: PropertiesInterface[];
}

export function DefaultStoryConfig(config: DefaultConfigInterface): Meta {
    const argTypesObject: ArgTypes = {};

    config.properties.forEach((property: PropertiesInterface) => {
        argTypesObject[property.name] = {
            ...property,
            type: { name: `${property.type}`, required: property.require },
            defaultValue: property.defaultValue,
            description: property.description,
            table: {
                disable: property.disable,
                category: property.category,
                type: { summary: `${property.type}` },
                defaultValue: { summary: property.defaultValue },
            },
            options: property.options,
            control: {
                type: property.control || null
            }
        };
    });

    return {
        title: config.title,
        component: config.component,
        decorators: [
            moduleMetadata({
                declarations: config.declarations,
                imports: config.imports
            }),
        ],
        argTypes: argTypesObject
    } as Meta;
}

//https://stackoverflow.com/a/43091709/13727176
export function enumMembersAsLabels(someEnum: any, enumName?: string) {
    //the filter() is for enums with number values -> for some reason they are stored as keys and values (both directions)?
    if (enumName) return Object.keys(someEnum)
        .filter(value => typeof value === 'string')
        .map(value => `${enumName}.${value}`) as string[];

    return Object.keys(someEnum)
        .filter(value => typeof value === 'string') as string[];
}

export function enumMemberAsLabel<T extends {[index:string]:string | number}>(myEnum: T, enumValue: string | number, enumName?: string) {
    const enumKey = getEnumKeyByEnumValue(myEnum, enumValue);
    if (enumName) return `${enumName}.${enumKey}`;
    return enumKey;
}

//https://stackoverflow.com/a/54297863/13727176
function getEnumKeyByEnumValue<T extends {[index:string]:string | number}>(myEnum:T, enumValue: string | number):keyof T|null {
    let keys = Object.keys(myEnum).filter(x => myEnum[x] == enumValue);
    return keys.length > 0 ? keys[0] : null;
}