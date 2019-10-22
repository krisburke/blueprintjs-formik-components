import React from 'react';
import {
    IFormGroupProps as BPFormGroupProps,
    IHTMLSelectProps as BPHTMLSelectProps,
    HTMLSelect as BPHTMLSelect,
} from '@blueprintjs/core';
import { FieldProps } from 'formik';
import { filterOutObjectKeys, isDisabled } from './utils';
import { errorPropList, ErrorProps, withError } from './WithError';
import {
    formGroupPropList,
    withFormGroup,
    WithFormGroupProps,
} from './WithFormGroup';

export type HTMLSelectProps = FieldProps &
    BPFormGroupProps &
    BPHTMLSelectProps &
    ErrorProps;

export const transformHTMLSelectProps = (
    props: HTMLSelectProps,
): BPHTMLSelectProps => {
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

const HTMLSelectComponent = (props: HTMLSelectProps) => {
    return <BPHTMLSelect {...transformHTMLSelectProps(props)} />;
};

export const HTMLSelect: React.ComponentType<HTMLSelectProps> = withError<
    WithFormGroupProps<HTMLSelectProps>
>(withFormGroup<HTMLSelectProps>(HTMLSelectComponent));
