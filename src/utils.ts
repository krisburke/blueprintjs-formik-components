import { FormikProps } from 'formik';

export function filterObjectByKeys(raw: object, allowedKeys: string[]): object {
    return Object.assign(
        {},
        ...Object.entries(raw)
            .filter(([key]) => allowedKeys.includes(key))
            .map(([key, value]) => ({ [key]: value })),
    );
}

export function filterOutObjectKeys(raw: object, removeKeys: string[]): object {
    return Object.assign(
        {},
        ...Object.entries(raw)
            .filter(([key]) => !removeKeys.includes(key))
            .map(([key, value]) => ({ [key]: value })),
    );
}

export const isDisabled = (props: {
    form?: FormikProps<any>;
    disabled?: boolean;
}) => (props.form && props.form.isSubmitting) || props.disabled || false;
