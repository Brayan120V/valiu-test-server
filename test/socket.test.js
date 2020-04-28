const io = require('socket.io-client');

const tag = {
  name: 'hello bitch',
};

describe('Socket', () => {
  let socketClient1;
  let socketClient2;

  beforeEach((done) => {
    socketClient1 = io('http://localhost:8080');
    socketClient2 = io('http://localhost:8080');
    socketClient1.on('connect', () => {
      console.log('worked for client 1...');
    });
    socketClient2.on('connect', () => {
      console.log('worked for client 2...');
    });
    socketClient1.on('disconnect', () => {
      console.log('disconnected client 1...');
    });
    socketClient2.on('disconnect', () => {
      console.log('disconnected client 2...');
    });
    done();
  });

  afterEach((done) => {
    if (socketClient1.connected) {
      console.log('disconnecting client 1...');
      socketClient1.disconnect();
    } else {
      console.log('no connection to break for client 1...');
    }
    if (socketClient2.connected) {
      console.log('disconnecting client 2...');
      socketClient2.disconnect();
    } else {
      console.log('no connection to break for client 2...');
    }
    done();
  });

  it('SEND_MESSAGE', (done) => {
    socketClient1.emit('SEND_MESSAGE', tag);
    socketClient2.on('SEND_MESSAGE', (data) => {
      data.name.should.equal(tag.name);
      done();
      console.log(data);
    });
  });

  it('REMOVE_MESSAGE', (done) => {
    socketClient1.emit('REMOVE_MESSAGE', tag);
    socketClient2.on('REMOVE_MESSAGE', (data) => {
      data.name.should.equal(tag.name);
      done();
      console.log(data);
    });
  });
});
