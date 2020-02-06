import React from 'react';
import PageHeader from './PageHeader';
import Button from './Button'

function LoginForm(props) {
    return (
        <div>
            <PageHeader />
            <Button type={props.type} onClick={props.onClick} />
        </div>
    );
  }

export default LoginForm;