import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TestForm from '../example/TestForm';

describe('it', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TestForm />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
