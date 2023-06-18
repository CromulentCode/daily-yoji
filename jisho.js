import { readFileSync, writeFileSync } from 'fs';
import JishoAPI from 'unofficial-jisho-api';

const jisho = new JishoAPI();

const oldData = JSON.parse(readFileSync('../assets/data.json', 'utf8'));
const storedDay = oldData.day;
const currentDate = new Date();
const currentDay = currentDate.getDate().toString();

if (storedDay !== currentDay) {
    // Looks up a random 四字熟語 on jisho.org, then overwrites the old data with the results
    jisho.searchForPhrase(chooseRandomYoji()).then(result => updateData(result));
}

// Updates the data stored in the data.json file
function updateData(result) {
    const wordSenses = result.data[0]["senses"];
    const wordForms = result.data[0]["japanese"];
    const reading = wordForms[0]["reading"];
    const definitions = [];

    for (let index in wordSenses) {
        definitions.push(wordSenses[index]["english_definitions"]);
    }

    const newData = {
        day: currentDay,
        word: wordForms[0]["word"],
        definitions: definitions,
        reading: reading,
        otherForms: wordForms.slice(1) // All alternative ways to write the 四字熟語 with their reading
    }

    // Update JSON file with new day and 四字熟語
    writeFileSync('../assets/data.json', JSON.stringify(newData));
}

// Returns a random 四字熟語
function chooseRandomYoji() {
    // Reads a string of many 四字熟語 seperated by newlines, then splits them to form an array
    const yojiArray = readFileSync('../assets/yoji_list.txt', 'utf8').split("\r\n");
    // Returns a random 四字熟語 from the array
    return yojiArray[getRandomNumber(0, yojiArray.length)];
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
