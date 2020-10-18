import {get} from './requests'

export default function JokeTimer(min, max){

    let time;
    let cowJokes = [];
    window.onload = resetTimer;

    async function getCowJokes() {
        cowJokes = await get("api/jokes");
    }

    function tellJoke() {
        if (cowJokes.length === 0){
            getCowJokes();
        }
        const selectedJoke = randomItemFromList(cowJokes);
        const selectedIndex = cowJokes.findIndex((joke) => joke === selectedJoke);
        cowJokes.splice(selectedIndex,1);
        resetTimer();
        console.log(selectedJoke)
    }
    
    function randomInterval(min, max) {
        return 1000 * Math.floor(min + (Math.random()*(max-min)));
    }

    function randomItemFromList(list) {
        const index = Math.floor((Math.random()*(list.length)));
        return list[index];
    }

    function resetTimer() {
        clearTimeout(time);
        let interval = randomInterval(min, max);
        time = setTimeout(tellJoke, interval);
    }

}