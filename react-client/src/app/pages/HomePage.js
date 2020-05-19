import { default as React, Fragment} from 'react';
import { UserOptionList } from '../components';
import { Title } from '../components';
import {Footer } from '../components';


const HomePage = ({children}) => {

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