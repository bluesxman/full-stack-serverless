import React, {useEffect} from "react";
import {Auth} from 'aws-amplify';

function protectedRoute (Comp, route = '/profile') {
  return (props) => {
    async function  checkAuthState() {
      try {
        await Auth.currentAuthenticatedUser();
      } catch (err) {
        props.history.push(route)
      }
    }

    useEffect(() => {
      checkAuthState()
    }, [])

    return <Comp {...props} />
  }
}

export default protectedRoute
