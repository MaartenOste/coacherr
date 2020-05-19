import { default as React, Fragment } from 'react';
import { useHistory } from 'react-router';
import { SignUpInputFieldListMember, Button, BackButton } from '../components';
import {Footer } from '../components';

import '../components/universalComponents/universal.scss';

const SignUpMemberPage = ({children}) => {
  return (
    <Fragment>
      <main>
        <BackButton />
        <SignUpInputFieldListMember />
      </main>
      <Footer/>
    </Fragment>
  );
};

export default SignUpMemberPage;