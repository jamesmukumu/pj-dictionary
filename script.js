const input = document.getElementById('input')
const btn = document.getElementById('btn')

const output = document.getElementById('output')
const body = document.querySelector('body')




btn.addEventListener('click', (t) => {
  t.preventDefault()
  const value = input.value

  if (value === '') {
    return
  }

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${value}`)
    .then(Response=>Response.json())

    .then(data => {
      console.log(data)//in order to see whats contained in the data 
      // resultDiv.innerHTML = '';

      data.forEach(result => {//using data for each to access alll the data in the big array 
        const wordDiv= document.createElement('div')//created a div that will contain all our words
        wordDiv.classList.add('word')//adding word to the worddiv
wordDiv.className = 'wordd'
        const word  = document.createElement('h2')
        word.textContent = result.word//accessing word from the result

        const phoneticDiv = document.createElement('div')//targetingphnetics which come singlyly wihtout an array 
        phoneticDiv.classList.add('phonetic')
        phoneticDiv.textContent = result.phonetics[0].text



const pronunciation = result.phonetics[0].audio



output.innerHTML = `<audio controls>
<source src="${pronunciation}" type="audio/mpeg">
</audio>`


        const meaninglist = document.createElement('ul')
        meaninglist.classList.add('meaning-list')
//meanings come in array we use the array method for each to target all items in the array
       result. meanings.forEach(meaning => {
          const meaningitem = document.createElement('li')//creating an li that we will append to the ul (meaning list)
          meaningitem.classList.add('meaning-item')

          const partOfSpeech = document.createElement('h3')//accessing part of the speech from the meaning
          partOfSpeech.textContent = meaning.partOfSpeech

          const definition = document.createElement('p')
          definition.textContent = meaning.definitions[0].definition

          //  const synonym = document.createElement('p')
          //  synonym.textContent = meaning.synonyms[0].synonym

          meaningitem.appendChild(partOfSpeech)
          meaningitem.appendChild(definition)
          //  meaningitem.appendChild(synonym)
          meaninglist.appendChild(meaningitem)
        })

        wordDiv.appendChild(word);
        wordDiv.appendChild(phoneticDiv)
        wordDiv.appendChild(meaninglist)


        output.appendChild(wordDiv)
      });
    })
    .catch(error => {
      console.error('There was a problem fetching the data:',)
    })
  })