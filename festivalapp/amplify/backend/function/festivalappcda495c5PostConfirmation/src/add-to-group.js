const aws = require('aws-sdk');

exports.handler = async (event, context, callback) => {
  const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });

  let isAdmin = false
  const adminEmails = ['jon.newton@gmail.com']

  if (adminEmails.includes(event.request.userAttributes.email)) {
    isAdmin = true
  }

  const groupParams = {
    UserPoolId: event.userPoolId,
  };

  const userParams = {
    UserPoolId: event.userPoolId,
    Username: event.userName,
  };

  if (isAdmin) {
    try {
      await cognitoidentityserviceprovider.getGroup(groupParams).promise();
    } catch (e) {
      await cognitoidentityserviceprovider.createGroup(groupParams).promise();
    }

    try {
      await cognitoidentityserviceprovider.adminAddUserToGroup(userParams).promise();
      callback(null, event);
    } catch (e) {
      callback(e);
    }
  } else {
    callback(null, event)
  }
};
