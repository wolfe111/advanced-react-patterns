// Prop Collections and Getters
// http://localhost:3000/isolated/exercise/04.js

import { find } from 'lodash'
import * as React from 'react'
import {Switch} from '../switch'

function callAll(...fns) {
  return (...args) => {
    console.log('fns', fns)
    console.log('args', args)
    fns.forEach(fn => {
      console.log('fn', fn)
      fn && fn(...args)
    })
  }
}

function useToggle() {
  const [on, setOn] = React.useState(false)
  const toggle = (e) => {
    console.log(e)
    setOn(!on)
  }

  // 🐨 Add a property called `togglerProps`. It should be an object that has
  // `aria-pressed` and `onClick` properties.
  // 💰 {'aria-pressed': on, onClick: toggle}
  const togglerProps = {'aria-pressed': on, onClick: toggle}
  const getTogglerProps = ({onClick, ...props} = {}) => {
    return {
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...props,
    }
  }
  return {on, toggle, getTogglerProps}
}

// exercise 1
// function App() {
//   const {on, togglerProps} = useToggle()
//   return (
//     <div>
//       <Switch on={on} {...togglerProps} />
//       <hr />
//       <button aria-label="custom-button" {...togglerProps}>
//         {on ? 'on' : 'off'}
//       </button>
//     </div>
//   )
// }

function App() {
  const {on, getTogglerProps} = useToggle()
  return (
    <div>
      <Switch {...getTogglerProps({on})} />
      <hr />
      <button
        {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: () => console.info('onButtonClick'),
          id: 'custom-button-id',
        })}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
