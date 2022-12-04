import { checkForURL } from './js/urlChecker'
import { handleSubmit } from './js/formHandler'

import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

//To send the user input data to the server and request the API response from server
// Event listener to add function to existing HTML DOM element
const submitButton = document.getElementById('analyze');
submitButton.addEventListener('click', handleSubmit);

console.log("All code run successfully");