import React, { useState } from 'react';
import {
    ISwitchProps as BPSwitchProps,
    Switch as BPSwitch,
} from '@blueprintjs/core';
import { FieldProps } from 'formik';
import { Omit } from './types';
import { filterOutObjectKeys, isDisabled } from './utils';
import { ErrorProps, withError, errorPropList } from './WithError';
import { formGroupPropList } from './WithFormGroup';

export type SwitchProps = FieldProps &
    Omit<BPSwitchProps, 'onChange' | 'checked' | 'value'> &
    ErrorProps & { inlineLabel?: string };

export const transformSwitchProps = (props: SwitchProps): BPSwitchProps => {
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

const SwitchComponent = (props: SwitchProps) => {
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

    const switchProps = {
        ...transformSwitchProps(props),
        onChange: handleChange,
        onBlur: handleBlur,
        checked: value,
    };

    return <BPSwitch {...switchProps} />;
};

export const Switch: React.ComponentType<SwitchProps> = withError<SwitchProps>(
    SwitchComponent,
);
