import { default as React, Fragment} from 'react';
import { useHistory } from 'react-router';
import { PageLayout } from '../layouts'
import { UserOptionList } from '../components';
import { Title } from '../components';
import {Footer } from '../components';


const HomePage = ({children}) => {
  const history = useHistory();

  return (
    <Fragment>
      <main>
        <Title />
        <UserOptionList />
      </main>
      <Footer/>
    </Fragment>
  );
};

export default HomePage;