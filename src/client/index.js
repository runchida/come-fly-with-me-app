// import styles
import './styles/base.scss'
import './styles/result.scss'

// import js
import { onSubmit } from './js/eventListeners'
import { postInfo } from './js/serverAPI'
import { updateResult, resetResult } from './js/updateUI'

console.log('indox.js loaded')
export { onSubmit, postInfo, updateResult, resetResult }