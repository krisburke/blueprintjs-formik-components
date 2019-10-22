import * as React from 'react';
// import * as Yup from 'yup';
import { Field, Form, Formik, FormikProps } from 'formik';
import { InputGroup } from '../.';
import { Checkbox } from '../.';
import { Button } from '@blueprintjs/core';
import { Switch } from '../.';
import { TextArea } from '../.';
import { HTMLSelect } from '../.';
import { NumericInput } from '../.';
import { RadioGroup } from '../.';
import { Slider } from '../.';
import { TagInput } from '../.';

interface Values {
    test: string;
    isActive: boolean;
    isCurrent: boolean;
    description: string;
    pickOne: string;
    howMany: number;
    selectValue?: any;
    chooseOne: string;
}

const TestForm = () => {
    const initialValues: Values = {
        test: 'testing',
        isActive: false,
        isCurrent: false,
        description: '',
        pickOne: '',
        howMany: 5,
        chooseOne: 'dog',
    };

    // const validationSchema = Yup.object().shape({
    //     test: Yup.string().required('Test field is required.'),
    // });

    // TODO Test onBlur for each field by adding requirements and testing validation

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values: Values) => {
                console.log('Submitting: ', values);
            }}
            // validationSchema={validationSchema}
            render={({ submitForm }: FormikProps<Values>) => {
                return (
                    <Form>
                        <Field
                            name="test"
                            label="Test"
                            helperText="Please add your input here."
                            component={InputGroup}
                            large={true}
                            fill={false}
                            autoFocus={true}
                            customErrorStyles={{
                                color: '#cc0000',
                                fontSize: '.9rem',
                            }}
                        />
                        <Field
                            name="isActive"
                            label="Is Active?"
                            component={Checkbox}
                        />
                        <Field
                            name="isCurrent"
                            label="Is Current?"
                            component={Switch}
                        />
                        <Field
                            name="description"
                            label="Description"
                            component={TextArea}
                        />
                        <Field
                            name="pickOne"
                            label="Pick One of the Following: "
                            component={HTMLSelect}
                            options={['', 'blue', 'red', 'green', 'yellow']}
                        />
                        <Field
                            name="howMany"
                            label="How many?"
                            component={NumericInput}
                        />
                        <Field
                            name="chooseOne"
                            label="Choose One: "
                            component={RadioGroup} // FIXME
                            options={[
                                { label: 'Cat', value: 'cat' },
                                { label: 'Dog', value: 'dog' },
                                { label: 'Fish', value: 'fish' },
                            ]}
                        />
                        <Field
                            name="selectValue"
                            label="Select a Value"
                            component={Slider} // FIXME
                        />
                        <Field
                            name="tags"
                            label="Tags"
                            component={TagInput} // FIXME
                        />
                        <Button text="Submit" onClick={submitForm} />
                    </Form>
                );
            }}
        />
    );
};

export default TestForm;
