import React from 'react';
import {
    IFormGroupProps as BPFormGroupProps,
    IInputGroupProps as BPInputGroupProps,
    HTMLInputProps,
    InputGroup as BPInputGroup,
} from '@blueprintjs/core';
import { FieldProps } from 'formik';
import { Omit } from './types';
import { filterOutObjectKeys, isDisabled } from './utils';
import { errorPropList, ErrorProps, withError } from './WithError';
import {
    formGroupPropList,
    withFormGroup,
    WithFormGroupProps,
} from './WithFormGroup';

export type InputGroupProps = FieldProps &
    BPFormGroupProps &
    Omit<BPInputGroupProps, 'onChange' | 'value'> &
    HTMLInputProps &
    ErrorProps;

export const transformInputGroupProps = (
    props: InputGroupProps,
): BPInputGroupProps & HTMLInputProps => {
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

const InputComponent = (props: InputGroupProps) => {
    return <BPInputGroup {...transformInputGroupProps(props)} />;
};

export const InputGroup: React.ComponentType<InputGroupProps> = withError<
    WithFormGroupProps<InputGroupProps>
>(withFormGroup<InputGroupProps>(InputComponent));
