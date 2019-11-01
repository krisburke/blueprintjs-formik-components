import * as React from 'react';
// import * as Yup from 'yup';
import { Field, Form, Formik, FormikProps } from 'formik';
import { InputGroup, withFormGroup } from '../.';
import { Checkbox } from '../.';
import { Button } from '@blueprintjs/core';
import { Switch } from '../.';
import { TextArea } from '../.';
import { HTMLSelect } from '../.';
import { NumericInput } from '../.';
import { RadioGroup } from '../.';
import { Slider } from '../.';
import { TagInput } from '../.';

const TextAreaWithFormGroup = withFormGroup(TextArea);
const CheckboxWithFormGroup = withFormGroup(Checkbox);
const InputGroupWithFormGroup = withFormGroup(InputGroup);
const SwitchWithFormGroup = withFormGroup(Switch);
const SelectWithFormGroup = withFormGroup(HTMLSelect);
const NumericInputWithFormGroup = withFormGroup(NumericInput);
const SliderWithFormGroup = withFormGroup(Slider);
const TagInputWithFormGroup = withFormGroup(TagInput);

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
                            component={InputGroupWithFormGroup}
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
                            component={CheckboxWithFormGroup}
                        />
                        <Field
                            name="isCurrent"
                            label="Is Current?"
                            component={SwitchWithFormGroup}
                        />
                        <Field
                            name="description"
                            label="Description"
                            component={TextAreaWithFormGroup}
                        />
                        <Field
                            name="pickOne"
                            label="Pick One of the Following: "
                            component={SelectWithFormGroup}
                            options={['', 'blue', 'red', 'green', 'yellow']}
                        />
                        <Field
                            name="howMany"
                            label="How many?"
                            component={NumericInputWithFormGroup}
                        />
                        <Field
                            name="chooseOne"
                            label="Choose One: "
                            component={RadioGroup}
                            options={[
                                { label: 'Cat', value: 'cat' },
                                { label: 'Dog', value: 'dog' },
                                { label: 'Fish', value: 'fish' },
                            ]}
                        />
                        <Field
                            name="selectValue"
                            label="Select a Value"
                            component={SliderWithFormGroup} // FIXME
                        />
                        <Field
                            name="tags"
                            label="Tags"
                            component={TagInputWithFormGroup} // FIXME
                        />
                        <Button text="Submit" onClick={submitForm} />
                    </Form>
                );
            }}
        />
    );
};

export default TestForm;
