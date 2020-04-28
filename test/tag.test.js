import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

const io = require('socket.io-client');

// Create Tag
const tag = {
  name: 'Oye Caglitos',
};

before((done) => {
  chai.use(chaiHttp);
  chai.should();
  done();
});

describe('Tag', () => {
  it('create tag', (done) => {
    chai.request(app)
      .post('/tag/create')
      .send(tag)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.name.should.equals(tag.name);
        tag._id = res.body._id;
        done();
      });
  });

  it('update tag', (done) => {
    chai.request(app)
      .put(`/tag/update/${tag._id}`)
      .send({ name: 'Dime Gosita' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.name.should.equals('Dime Gosita');
        done();
      });
  });

  it('remove tag', (done) => {
    chai.request(app)
      .delete(`/tag/delete/${tag._id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.name.should.equals('Dime Gosita');
        done();
      });
  });

  it('list tags', (done) => {
    chai.request(app)
      .get('/tag/list')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.length.should.to.equal(0);
        done();
      });
  });
});
