
export class ClientApi {

    constructor() {
            
    }

    async getNewsFeed() {

        let apiUri = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=22f66588d55e4db88dabda8f03aa598c";
        
        try {
            
        let response = await fetch(apiUri);
        let responseJson = await response.json();

        console.log('done');
        console.log(responseJson);
        
        } 
        catch (error) {
            console.error(error);
        }
    } 
}