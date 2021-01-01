const aws = require('aws-sdk');

exports.handler = async (event, context, callback) => {
  const cognitoProvider = new aws.CognitoIdentityServiceProvider({
    apiVersion: '2016-04-18'
  })

  let isAdmin = false
  const adminEmails = ['jon.newton@gmail.com']

  if (adminEmails.indexOf(event.request.userAttributes.email) !== -1) {
    isAdmin = true
  }

  if (isAdmin) {
    const groupParams = {
      UserPoolId: event.userPoolId,
      GroupName: 'Admin'
    }

    const userParams = {
      UserPoolId: event.userPoolId,
      Username: event.userName,
      GroupName: 'Admin'
    }

    try {
      await cognitoProvider.adminAddUserToGroup(userParams).promise()
      callback(null, event)
    } catch (e) {
      callback(e)
    }
  } else {
    callback(null, event)
  }
};
