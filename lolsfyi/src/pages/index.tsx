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
        {/* <Matches /> */}
      </main>
    </>
  )
}

export default Home;

// import { GetServerSideProps } from 'next';
// import useSWR from 'swr';

// type DataType = {
//   TeamID: string;
//   Name: string;
//   League: string;
// };

// type MatchType = {
//   MatchID: string;
//   League: string;
//   Patch: number;
//   Match_date: string;
//   Split: string;
//   GameLength: string;
//   Win_side: string;
//   Playoffs: number;
//   Round: number;
// };

// // const fetchData = async (league: string, page: number) => {
// //   const response = await fetch(`/api/matches?league=${league}&page=${page}`);
// //   const data = await response.json();
// //   // Use the fetched data here
// // };

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

// interface HomeProps {
//   initialData: DataType[];
// }

// const Home: React.FC<HomeProps> = ({ initialData }) => {
//   const { data } = useSWR<DataType[]>('/api/get_team_data', fetcher, { fallbackData: initialData });

//   return (
//     <div>
//       <h1>Data from MySQL</h1>
//       <ul>
//         {data && data.map((item) => (
//           <li key={item.TeamID}>{JSON.stringify(item)}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export const getServerSideProps: GetServerSideProps = async () => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get_team_data`);
//     if (!res.ok) {
//       console.error('Error fetching data:', res.status, await res.text());
//       return { notFound: true };
//     }
//     const initialData = await res.json();
//     return { props: { initialData } };
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return { notFound: true };
//   }
// };

// export default Home;
