import React, { useState } from 'react';
import {
    ITagInputProps as BPTagInputProps,
    IFormGroupProps as BPFormGroupProps,
    TagInput as BPTagInput,
    Button,
} from '@blueprintjs/core';
import { FieldProps } from 'formik';
import { Omit } from './types';
import { filterOutObjectKeys, isDisabled } from './utils';
import { ErrorProps, withError, errorPropList } from './WithError';
import {
    withFormGroup,
    WithFormGroupProps,
    formGroupPropList,
} from './WithFormGroup';

export type TagInputProps = FieldProps &
    BPFormGroupProps &
    Omit<BPTagInputProps, 'onChange' | 'values'> &
    ErrorProps;

export const transformTagInputProps = (
    props: TagInputProps,
): Omit<BPTagInputProps, 'values'> => {
    const { field, form, ...rest } = props;

    const filteredProps = filterOutObjectKeys(rest, [
        ...formGroupPropList,
        ...errorPropList,
    ]);

    return {
        ...filteredProps,
        disabled: isDisabled(props),
    };
};

const TagInputComponent = (props: TagInputProps) => {
    const { field, form, rightElement } = props;
    const [values, setValues] = useState(field.value || []);
    const transformedProps = transformTagInputProps(props);

    const handleChange = (values: any) => {
        form.setFieldValue(field.name, values);
        setValues(values);
    };

    const handleOnBlur = () => {
        form.setFieldTouched(field.name);
    };

    const handleClear = () => {
        form.setFieldValue(field.name, []);
        setValues([]);
    };

    const clearButton = (
        <Button
            disabled={transformedProps.disabled}
            icon={values.length > 0 && 'cross'}
            minimal={true}
            onClick={handleClear}
        />
    );

    const tagInputProps = {
        ...transformedProps,
        onBlur: handleOnBlur,
        onChange: handleChange,
        rightElement: rightElement || clearButton,
        values,
    };

    return <BPTagInput {...tagInputProps} />;
};

export const TagInput: React.ComponentType<TagInputProps> = withError<
    WithFormGroupProps<TagInputProps>
>(withFormGroup<TagInputProps>(TagInputComponent));
