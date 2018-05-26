import React from 'react';
import Header from './Header';
import {Container} from 'semantic-ui-react';
import Head from 'next/head';

export default props =>{
    return (
        <div>
        <Header/>
         <Container>
            <Head>
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
            </Head>
            {props.children}
        </Container>
        </div>
       
    )
}
