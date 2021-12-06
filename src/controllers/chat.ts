// import * as socketio from 'socket.io';
// import * as http from 'http';

// import {mensajeAPI} from '../apis/mensaje'
// import {UserAPI} from '../apis/users'



// export const initWsServer = (server: http.Server): void => {
//     const io: socketio.Server = new socketio.Server();
//     io.attach(server);
  
//     io.on('connection', async (socket: socketio.Socket) => {
    
  
  
//       socket.on('new message', async newMessage => {
//         try {
//           const user = await UserAPI.query(newMessage.email);
//           await mensajeAPI.save(user.id, newMessage.text, 'usuario');
  
//           const response = await getMessageResponse(newMessage.text, user.id);
//           await mensajeAPI.save(user.id, response, 'sistema');
  
//           const messagesList = await mensajeAPI.get(user.id);
//           socket.emit('new message saved', messagesList);
//         } catch (e:any) {
//           socket.emit('messages error', {
//             error: e.error,
//             message: e.message,
//           });
//         }
//       });
//     });
//   };