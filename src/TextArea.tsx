import React from 'react';
import {
    IFormGroupProps as BPFormGroupProps,
    ITextAreaProps as BPTextAreaProps,
    TextArea as BPTextArea,
} from '@blueprintjs/core';
import { FieldProps } from 'formik';
import { Omit } from './types';
import { filterOutObjectKeys, isDisabled } from './utils';
import { ErrorProps, withError, errorPropList } from './WithError';
import { formGroupPropList } from './WithFormGroup';

export type TextAreaProps = FieldProps &
    BPFormGroupProps &
    Omit<BPTextAreaProps, 'onChange' | 'value'> &
    ErrorProps;

export const transformTextAreaProps = (
    props: TextAreaProps,
): BPTextAreaProps => {
    const disabled = isDisabled(props);
    const {
        field: { onChange, onBlur, value, name },
        form,
        ...rest
    } = props;

    const filteredProps = filterOutObjectKeys(rest, [
        ...errorPropList,
        ...formGroupPropList,
    ]);

    return {
        ...filteredProps,
        disabled,
        onChange,
        onBlur,
        value,
        name,
    };
};

const TextAreaComponent = (props: TextAreaProps) => {
    return <BPTextArea {...transformTextAreaProps(props)} />;
};

export const TextArea: React.ComponentType<TextAreaProps> = withError<
    TextAreaProps
>(TextAreaComponent);
