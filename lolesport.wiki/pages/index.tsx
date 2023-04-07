import Image from 'next/image'
import Link from 'next/link';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div>
      <Header />
      <h1><Link href={'/stats/players'}> Stats Players</Link></h1>
      <h1><Link href={'/stats/teams'}> Stats Teams</Link></h1>
      <h1><Link href={'/players'}> Players</Link></h1>
      <h1><Link href={'/teams'}> Teams</Link></h1>
    </div>
  )
}
