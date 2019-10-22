import React from 'react';
import { FieldProps, getIn } from 'formik';
import hoistNonReactStatics from 'hoist-non-react-statics';

export interface ErrorProps {
    customErrorStyles?: any;
}

export const errorPropList = ['customErrorStyles'];

export type WithErrorProps<T> = T & FieldProps & ErrorProps;

export function withError<T>(
    WrappedComponent:
        | React.ComponentClass<WithErrorProps<T>>
        | React.FunctionComponent<WithErrorProps<T>>,
): React.FunctionComponent<WithErrorProps<T>> {
    const WithError = (props: WithErrorProps<T>) => {
        const getErrorStyles = () => {
            const defaultErrorStyles = { color: 'red' };

            return { ...defaultErrorStyles, ...props.customErrorStyles };
        };

        const {
            field,
            form: { errors, dirty, touched },
        } = props;

        const errorText = getIn(errors, field.name);
        const hasError =
            getIn(touched, field.name) && dirty && errorText !== undefined;

        return hasError ? (
            <>
                <WrappedComponent {...props} />
                <div style={getErrorStyles()}>{errorText}</div>
            </>
        ) : (
            <WrappedComponent {...props} />
        );
    };

    return hoistNonReactStatics(WithError, WrappedComponent);
}
