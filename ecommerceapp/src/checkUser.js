import { Auth } from 'aws-amplify'

async function checkUser(updateUser) {
  const userData = await Auth.currentSession().catch( err => console.log('error: ', err))

  if (!userData) {
    console.log('No user data')
    updateUser({})
    return
  }

  const {idToken: {payload}} = userData

  console.log('payload: ', payload)

  const isAuthorized = payload['cognito:groups'] && payload['cognito:groups'].includes('Admin')
  updateUser({
    username: payload['cognito:username'],
    isAuthorized
  })
}

export default checkUser
