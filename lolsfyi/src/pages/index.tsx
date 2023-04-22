import React from 'react';
import Head from 'next/head'
import Matches from './matches/Matches'
import scss from './Home.module.scss';

const Home : React.FC = () => {
  return (
    <>
      <Head>
        <title>lols.fyi</title>
        <meta name="description" content="LoL eSport FYI website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={scss.main}>
        <Matches />
      </main>
    </>
  )
}

export default Home;
