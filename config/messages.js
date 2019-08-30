exports.resetPassword = password => {
  return `Your password has been reset to ${password}
    Please endeavour to change your password after login`;
};

exports.adminRegistration = (password, username) => {
  return `An admin account has been created for you. Your account details are as follows:
  Username: ${username}
  Password: ${password}
  
  Please login and change your password at: set portal url`;
};
