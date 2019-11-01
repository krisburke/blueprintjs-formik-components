import React, { useState } from 'react';
import {
    IRadioGroupProps as BPRadioGroupProps,
    IFormGroupProps as BPFormGroupProps,
    RadioGroup as BPRadioGroup,
} from '@blueprintjs/core';
import { FieldProps } from 'formik';
import { Omit } from './types';
import { filterOutObjectKeys, isDisabled } from './utils';
import { ErrorProps, withError, errorPropList } from './WithError';

export type RadioProps = FieldProps &
    BPFormGroupProps &
    BPRadioGroupProps &
    ErrorProps;

export const transformRadioProps = (
    props: RadioProps,
): Omit<BPRadioGroupProps, 'onChange' | 'selectedValue'> => {
    const { field, form, ...rest } = props;

    const filteredProps = filterOutObjectKeys(rest, errorPropList);

    return {
        ...filteredProps,
        disabled: isDisabled(props),
    };
};

const RadioComponent = (props: RadioProps) => {
    const { field, form } = props;
    const [value, setValue] = useState(field.value);

    const handleChange = (event: any) => {
        const selected = event.target.value;
        form.setFieldValue(field.name, selected);
        setValue(selected);
    };

    const handleOnBlur = () => {
        form.setFieldTouched(field.name);
    };

    const radioProps = {
        ...transformRadioProps(props),
        onChange: handleChange,
        onBlur: handleOnBlur,
        selectedValue: value,
    };

    return <BPRadioGroup {...radioProps} />;
};

export const RadioGroup: React.ComponentType<RadioProps> = withError<
    RadioProps
>(RadioComponent);
