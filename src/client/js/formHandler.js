import { checkForURL } from "./urlChecker";

function handleSubmit(event) {
    
    event.preventDefault();

    /* Function to POST data */
    const postData = async (postUrl, input, language) =>{
        const response = await fetch(postUrl,{
            method: 'POST',
            credentials: 'same-origin', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: input,
                language: language
            }),
        }).catch((e) => {
            console.log('error', e);
        })
        return response.json();
    }

    function clearErrState() {
        document.getElementById('error').innerText = '';
    }

    "::: Form Submitted :::"
    let urlInput, language;
    urlInput = document.getElementById('input').value;
    language = document.getElementById('language').value;

    clearErrState();

    if (!checkForURL(urlInput)){
        document.getElementById('error').innerText = 'Please input a valid URL';
    } else {
        postData('http://localhost:8080/',urlInput, language)
        .then((data)=>{
            if (data['code'] == 0) {
                document.getElementById('polarity').innerText = data['polarity']; /*Insert polarity .body.agreement */
                document.getElementById('subjectivity').innerText = data['subjectivity']/*Insert article subject body.subjectivity*/
                document.getElementById('sampleText').innerText = data['sampleText']/*Insert article snippet herebody.sentence_list[0]*/
            } else {
                document.getElementById('error').innerText = 'API Failed. ' + (!data['msg']?'':data['msg']) + '. Error Code: '+data['code'];
                console.log('API Failed. ' + (!data['msg']?'':data['msg']) + '. Error Code: '+data['code']);
            }
        })
        .catch((e) => {
            console.log('error', e);
        });
    }
}

export { handleSubmit }
