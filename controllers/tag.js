import * as web from 'express-decorators';
import Tag from '../models/tag';

@web.basePath('/tag')
class TagController {
  constructor() {
  }

  @web.post('/create')
  async create(req, res) {
    res.send(await Tag.create(req.body));
  }

  @web.put('/update/:id')
  async update(req, res) {
    res.send(await Tag.update({ _id: req.params.id }, req.body));
  }

  @web.del('/delete/:id')
  async delete(req, res) {
    res.send(await Tag.delete({ _id: req.params.id }));
  }

  @web.get('/list')
  async list(req, res) {
    res.send(await Tag.list());
  }
}

module.exports = TagController;
