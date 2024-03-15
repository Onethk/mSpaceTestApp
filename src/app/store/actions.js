// actions.js
export const UPDATE_PHONE_NUM = 'UPDATE_PHONE_NUM';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const UPDATE_REFERENCE_NUM = 'UPDATE_REFERENCE_NUM';
export const UPDATE_SUCCESS_STATUS = 'UPDATE_SUCCESS_STATUS';


export const updatePhoneNumber = (phoneNumber) => ({
  type: UPDATE_PHONE_NUM,
  payload: phoneNumber,
});

export const updatePassword = (password) => ({
  type: UPDATE_PASSWORD,
  payload: password,
});

export const updateReferenceNum = (referenceNumber) => ({
  type: UPDATE_REFERENCE_NUM,
  payload: referenceNumber,
});

export const updateSuccessStatus = (successStatus) => ({
  type: UPDATE_SUCCESS_STATUS,
  payload: successStatus,
});