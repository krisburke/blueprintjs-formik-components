import React, { useState } from 'react';
import {
    IFormGroupProps as BPFormGroupProps,
    INumericInputProps as BPNumericInputProps,
    NumericInput as BPNumericInput,
} from '@blueprintjs/core';
import { FieldProps } from 'formik';
import { Omit } from './types';
import { filterOutObjectKeys, isDisabled } from './utils';
import { ErrorProps, withError, errorPropList } from './WithError';
import { formGroupPropList } from './WithFormGroup';

export type NumericInputProps = FieldProps &
    BPFormGroupProps &
    Omit<BPNumericInputProps, 'value' | 'onValueChange'> &
    ErrorProps;

export const transformNumericInputProps = (
    props: NumericInputProps,
): BPNumericInputProps => {
    const disabled = isDisabled(props);
    const { field, form, ...rest } = props;

    const filteredProps = filterOutObjectKeys(rest, [
        ...errorPropList,
        ...formGroupPropList,
    ]);

    return {
        ...filteredProps,
        disabled,
    };
};

const NumericInputComponent = (props: NumericInputProps) => {
    const { field, form } = props;
    const [value, setValue] = useState(field.value);

    const handleValueChange = (
        valueAsNumber: number,
        _valueAsString: string,
    ) => {
        form.setFieldValue(field.name, valueAsNumber);
        setValue(valueAsNumber);
    };

    const handleBlur = () => {
        form.setFieldTouched(field.name);
    };

    const inputProps = {
        ...transformNumericInputProps(props),
        onValueChange: handleValueChange,
        onButtonClick: handleBlur,
        onBlur: handleBlur,
        value,
    };

    return <BPNumericInput {...inputProps} />;
};

export const NumericInput: React.ComponentType<NumericInputProps> = withError<
    NumericInputProps
>(NumericInputComponent);
