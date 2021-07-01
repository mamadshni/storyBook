import { Meta, moduleMetadata, ArgTypes, Story } from '@storybook/angular';

export type ControlType = 'array' | 'boolean' | 'number' | 'range' | 'object' | 'radio' | 'inline-radio' | 'check' | '	inline-check' | 'select' | 'multi-select' | 'text' | 'color' | 'date';

export interface PropertyConfig {

    name: string;
    description?: string;
    defaultValue?: string;

    disable?: boolean;
    require?: boolean;
    type?: any;

    category?: string;

    control?: ControlType;
    options?: string[];
    labels?: {[key: string]: string};

    minRange?: number;
    maxRange?: number;
    stepRange?: number;
}

export interface ComponentStoriesConfig {
    /**
     * Title to use for the stories in the sidebar; slashes can be used to setup a hierarchy
     * (e.g. use 'StoryBook/Button' if the 'Button' stories should be under the 'Story Book' heading)
     */
    title: string;

    /**
     * The component that should be used for the stories
     */
    component?: any;
    includeStories?: string[];

    /**
     * Provide any additional declarations that might be needed to run the stories here.
     */
    declarations?: any[];
    /**
     * Provide any additional imports that might be needed to run the stories here.
     */
    imports?: any[];

    /**
     * additional configuration for the properties of the component.
     * Use this to customize the controls + docs for the component
     * further and fix anything Story Book got wrong
     * (e.g. add a default value that wasn't added automatically, use different control for picking possible property values etc.)
     */
    properties?: PropertyConfig[];
}


export interface StoryConfig {
    template: Story;

    codeSnippet ?: string;
    storyDescription ?: string;
}




export function componentStoriesSetup(config: ComponentStoriesConfig): Meta {

    const argTypesObject: ArgTypes = {};

    config.properties.forEach((property: PropertyConfig) => {
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
                type: property.control || null,
                labels: property.labels,
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

// https://stackoverflow.com/a/43091709/13727176
export function enumMembersAsLabels(someEnum: any, enumName?: string): {[key: string]: string} {
    // the filter() is for enums with number values -> for some reason they are stored as keys and values (both directions)?
    return Object.entries(someEnum)
        .filter(([key, value]) => isNaN(+key))
        .reduce((obj, [key, value]: [string, string]) => {
            obj[value] = `${enumName ? `${enumName}.` : '' }${key}`;
            return obj;
        }, {});
}

// tslint:disable-next-line:max-line-length
export function enumMemberAsLabel <T extends {[index: string]: string | number}>(myEnum: T, enumValue: string | number, enumName?: string): keyof T {
    const enumKey = getEnumKeyByEnumValue(myEnum, enumValue);
    return `${enumName ? `${enumName}.` : '' }${enumKey}`;
}

// https://stackoverflow.com/a/54297863/13727176
function getEnumKeyByEnumValue<T extends {[index: string]: string | number}>(myEnum: T, enumValue: string | number): keyof T|null {
    const keys = Object.keys(myEnum).filter(x => myEnum[x] === enumValue);
    return keys.length > 0 ? keys[0] : null;
}

export function enumValues(someEnum: any): string[] {
    // the filter() is for enums with number values -> for some reason they are stored as keys and values (both directions)?

    return Object.values(someEnum).filter(value => isNaN(+value)) as string[];
}



export function createStoryWithConfig(config: StoryConfig): Story {
    const reference: Story = config.template.bind({});

    reference.parameters = {
        docs : {
            description : {
                story : config.storyDescription,
            },
            source : {
                code: config.codeSnippet
            }
        }
    };
    return reference;
}




