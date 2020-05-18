import { default as React, Fragment, useCallback, useState} from 'react';
import { useHistory } from 'react-router';
import * as Routes from '../routes';
import { PageLayout } from '../layouts'
import { SignUpInputFieldListMember, Button, BackButton } from '../components';
import { Title } from '../components';
import {Footer } from '../components';

import '../components/universalComponents/universal.scss';

const SignUpMemberPage = ({children}) => {
  const history = useHistory();

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