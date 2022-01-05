export const GET_NOTIFICATION_FROM_SOCKET = 'GET_NOTIFICATION_FROM_SOCKET';
export const GET_NOTI = (data) => {
  return {
    type: GET_NOTIFICATION_FROM_SOCKET,
    payload: data,
  };
};
console.log(GET_NOTI());
