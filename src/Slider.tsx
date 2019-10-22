import React, { useState } from 'react';
import {
    ISliderProps as BPSliderProps,
    IFormGroupProps as BPFormGroupProps,
    Slider as BPSlider,
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

export type SliderProps = FieldProps &
    BPFormGroupProps &
    Omit<BPSliderProps, 'onChange' | 'value'> &
    ErrorProps;

export const transformSliderProps = (props: SliderProps): BPSliderProps => {
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

const SliderComponent = (props: SliderProps) => {
    const { field, form } = props;
    const [value, setValue] = useState(field.value);

    const handleChange = (num: number) => {
        form.setFieldValue(field.name, num);
        setValue(num);
    };

    const handleBlur = () => {
        form.setFieldTouched(field.name);
    };

    const sliderProps = {
        ...transformSliderProps(props),
        onChange: handleChange,
        onBlur: handleBlur,
        value,
    };

    return <BPSlider {...sliderProps} />;
};

export const Slider: React.ComponentType<SliderProps> = withError<
    WithFormGroupProps<SliderProps>
>(withFormGroup<SliderProps>(SliderComponent));
