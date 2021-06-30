import { ArgTypes } from '@storybook/angular';

// tslint:disable-next-line:typedef
function args(obj: ArgsInterface[]) {
    const result: ArgTypes;

    obj.forEach(item => {

        result[item.name] = {
            type : { name: item.type, required: item.require },
            defaultValue: item.defaultValue,
            description: item.description,
            table: {
                disable: item.disable,
                category: item.category,
                type: { summary: item.type },
                defaultValue: { summary: item.defaultValue },
            },
            options: item.options,
            control: {
              type: item.control,
              min: item.minRange,
              max: item.maxRange
            }

        };

    });

    return result;

}

// tslint:disable-next-line:no-empty-interface
interface ArgsInterface {
    name: string;
    disable?: boolean;
    require?: boolean;

    type?: any;
    defaultValue?: string;
    description?: string;
    category?: string;

    control?: 'boolean' | 'select' | 'radio' | 'range';
    options?: string[];
    minRange?: number;
    maxRange?: number;

}
