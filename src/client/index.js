// import styles
import './styles/base.scss'
import './styles/result.scss'

// import js
import { onSubmit } from './js/eventListeners'
import { postInfo } from './js/serverAPI'
import { updateResult, resetResult, updateError } from './js/updateUI'

export { onSubmit, postInfo, updateResult, resetResult, updateError }

console.log('Check service worker');
// Check that service workers are supported
if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/serviceWorker.js');
    });
} else {
    console.log('No worker found')
}