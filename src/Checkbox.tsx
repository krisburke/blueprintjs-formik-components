import React, { useState } from 'react';
import {
    ICheckboxProps as BPCheckboxProps,
    Checkbox as BPCheckbox,
} from '@blueprintjs/core';
import { FieldProps } from 'formik';
import { filterOutObjectKeys, isDisabled } from './utils';
import { Omit } from './types';
import { errorPropList, ErrorProps, withError } from './WithError';
import { formGroupPropList } from './WithFormGroup';

export type CheckboxProps = FieldProps &
    Omit<BPCheckboxProps, 'onChange' | 'checked' | 'value'> &
    ErrorProps & { inlineLabel?: string };

export const transformCheckboxProps = (
    props: CheckboxProps,
): BPCheckboxProps => {
    const disabled = isDisabled(props);
    const {
        field: { name },
        form,
        inlineLabel,
        ...rest
    } = props;

    const filteredProps = filterOutObjectKeys(rest, [
        ...errorPropList,
        ...formGroupPropList,
    ]);

    return {
        ...filteredProps,
        label: inlineLabel,
        disabled,
        name,
    };
};

const CheckboxComponent = (props: CheckboxProps) => {
    const { field, form } = props;
    const [value, setValue] = useState(field.value || false);

    const handleChange = () => {
        const checked = !value;
        form.setFieldValue(field.name, checked);
        setValue(checked);
    };

    const handleBlur = () => {
        form.setFieldTouched(field.name);
    };

    const checkboxProps = {
        ...transformCheckboxProps(props),
        onChange: handleChange,
        onBlur: handleBlur,
        checked: value,
    };

    return <BPCheckbox {...checkboxProps} />;
};

export const Checkbox: React.ComponentType<CheckboxProps> = withError<
    CheckboxProps
>(CheckboxComponent);
