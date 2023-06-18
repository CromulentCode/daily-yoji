import JishoAPI from 'unofficial-jisho-api';

const jisho = new JishoAPI();

jisho.searchForPhrase('問う').then(result => {
    const wordInfo = result.data[0]["senses"];
    const wordForms = result.data[0]["japanese"];
    const reading = wordForms[0]["reading"];
    const definitions = [];

    for (let index in wordInfo) {
        definitions.push(wordInfo[index]["english_definitions"]);
    }

    console.log(reading)
    console.log(definitions)
});
