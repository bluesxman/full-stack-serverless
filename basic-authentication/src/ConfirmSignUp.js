import React from 'react'
import Button from './Button'
import {styles} from "./Form";

function ConfirmSignUp(props) {
  return (
    <div style={styles.container}>
      <input
        name='confirmationCode'
        onChange={ e => {e.persist(); props.updateFormState(e)}}
        style={styles.input}
        placeholder='Confirmation Code'
      />

      <Button onClick={props.confirmSignUp} title="Confirm Sign Up" />
    </div>
  )
}

export default ConfirmSignUp
