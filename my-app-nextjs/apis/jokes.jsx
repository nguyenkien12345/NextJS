import axios  from 'axios';

export const JokesApi =  {
    async getRandomJoke(){
        try{
            const response = await axios.get('https://api.chucknorris.io/jokes/random');
            return response.data;
        }
        catch(error){
            console.log(error);
        }
    }
};