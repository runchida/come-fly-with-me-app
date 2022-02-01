// import styles
import './styles/base.scss'
import './styles/result.scss'

// import js
import { onSubmit } from './js/eventListeners'
import { postInfo } from './js/serverAPI'
import { updateResult } from './js/updateUI'

console.log('indox.js loaded')
export { onSubmit, postInfo, updateResult }