import { default as React, Fragment} from 'react';
import { useHistory } from 'react-router';
import { PageLayout } from '../layouts'
import { InputFieldListMember, Button, BackButton, InputField} from '../components';
import { Title } from '../components';
import {Footer } from '../components';


const SignInClubPage = ({children}) => {
  const history = useHistory();

  return (
    <Fragment>
      <main>
      <BackButton />
        log u ier nekeer in clubken
      </main>
      <Footer/>
    </Fragment>
  );
};

export default SignInClubPage;