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
    labels?: { [key: string]: string };

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
    /**
     * A story template the new story should be based on
     */
    template: Story;

    /**
     * The HTML code snippet; will be prettified automatically
     */
    codeSnippet?: string;

    /**
     * A description for the story; markdown is supported.
     */
    storyDescription?: string;
}

export interface TemplateConfig {
    /**
     * HTML code to use by Story Book when creating the component (only necessary if content projection is used)
     */
    htmlTemplate?: string;
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



export function createStoryTemplate<T>(config?: TemplateConfig): Story<T> {
    return (args: T) => ({
        props: args,
        template: config?.htmlTemplate,
    });
}



export function createStoryWithConfig(config: StoryConfig): Story {
    const template: Story = config.template.bind({});

    template.parameters = {
        docs: {
            description: {
                story: config.storyDescription,
            },
            source: {
                code: config.codeSnippet? prettifyHtml(config.codeSnippet) : ''
            }
        }
    };
    return template;
}



// https://stackoverflow.com/a/43091709/13727176
export function enumMembersAsLabels(someEnum: any, enumName?: string): { [key: string]: string } {
    // the filter() is for enums with number values -> for some reason they are stored as keys and values (both directions)?
    return Object.entries(someEnum)
        .filter(([key, value]) => isNaN(+key))
        .reduce((obj, [key, value]: [string, string]) => {
            obj[value] = `${enumName ? `${enumName}.` : ''}${key}`;
            return obj;
        }, {});
}



// tslint:disable-next-line:max-line-length
export function enumMemberAsLabel<T extends { [index: string]: string | number }>(myEnum: T, enumValue: string | number, enumName?: string): keyof T {
    const enumKey = getEnumKeyByEnumValue(myEnum, enumValue);
    return `${enumName ? `${enumName}.` : ''}${enumKey}`;
}

// https://stackoverflow.com/a/54297863/13727176
function getEnumKeyByEnumValue<T extends { [index: string]: string | number }>(myEnum: T, enumValue: string | number): keyof T | null {
    const keys = Object.keys(myEnum).filter(x => myEnum[x] === enumValue);
    return keys.length > 0 ? keys[0] : null;
}

export function enumValues(someEnum: any): string[] {
    // the filter() is for enums with number values -> for some reason they are stored as keys and values (both directions)?

    return Object.values(someEnum).filter(value => isNaN(+value)) as string[];
}

export function prettifyHtml(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html.trim()
        .replace(/^\s+|\s+$/gm, '')
        .split('\n')
        .map(str => !str.startsWith('<') ? ' ' + str : str)//we could lose syntax highlighting if some char that is not an opening tag is on its own line in original text (it would then stick together with the tag name for example), so we add white space 
        .join('');
    return (formatHtml(div, 0).innerHTML).trim();
}


export function formatHtml(node: HTMLElement, level: number): HTMLElement {

    const indentBefore = new Array(level++ + 1).join('    ');
    const indentAfter = new Array(level - 1).join('    ');
    let textNode: Text;

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < node.children.length; i++) {

        textNode = document.createTextNode(`\n${indentBefore}`);
        node.insertBefore(textNode, node.children[i]);

        formatHtml(node.children[i] as HTMLElement, level);

        if (node.lastElementChild === node.children[i]) {
            textNode = document.createTextNode('\n' + indentAfter);
            node.appendChild(textNode);
        }
    }

    return node;
}