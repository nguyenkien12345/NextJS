export const Api = {
    async getAll(){
       try{
            const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
            const data = await res.json();
            return data;
       }
       catch(error){
           console.log(error);
       }
    },
}