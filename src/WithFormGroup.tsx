import React from 'react';
import {
    FormGroup as BPFormGroup,
    IFormGroupProps as BPFormGroupProps,
} from '@blueprintjs/core';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { filterObjectByKeys } from './utils';

export type WithFormGroupProps<T> = T & BPFormGroupProps;

export const formGroupPropList = [
    'contentClassName',
    'helperText',
    'inline',
    'label',
    'labelFor',
    'labelInfo',
    'style',
];

export function withFormGroup<T>(
    WrappedComponent:
        | React.ComponentClass<WithFormGroupProps<T>>
        | React.FunctionComponent<WithFormGroupProps<T>>,
): React.FunctionComponent<WithFormGroupProps<T>> {
    const WithFormGroup = (props: WithFormGroupProps<T>) => {
        const shouldRenderFormGroup = !!props.label || !!props.helperText;
        const formProps = filterObjectByKeys(props, formGroupPropList);

        return shouldRenderFormGroup ? (
            <BPFormGroup {...formProps}>
                <WrappedComponent {...props} />
            </BPFormGroup>
        ) : (
            <WrappedComponent {...props} />
        );
    };

    return hoistNonReactStatics(WithFormGroup, WrappedComponent);
}
