import { useState } from 'react';
import { Api } from '../apis/coins';
import CoinList from '../components/Coins/CoinList';
import Layout from '../components/Layout/Layout';
import SearchBar from '../components/SearchBar/SearchBar';

export const getServerSideProps = async () => {
  try{
      const coins = await Api.getAll();
      return {props: {coins: coins}};
  }
  catch(error){
      console.log(error);
  }
}

function Home({coins}) {

  const [search,setSearch] = useState('');

  const filterCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()));

  const handleChangeValue = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <Layout>
        <div className='coin_app'>
            <SearchBar type='text' placeholder='Search: ' value={search} onChange={handleChangeValue} />
            <CoinList coins={filterCoins}/>
        </div>
    </Layout>
  )
}

export default Home;
