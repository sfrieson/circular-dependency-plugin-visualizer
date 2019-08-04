var makeModel = require('./model');
let model;
beforeEach(() => {
  model = makeModel();
});
it('adds files', () => {
  model.addFile('a.js', {id: 'a.js'});
  expect(model.getFiles().length).toBe(1);
});
it('does not add duplicate files', () => {
  model.addFile('a.js', {id: 'a.js'});
  model.addFile('a.js', {id: 'a.js'});
  expect(model.getFiles().length).toBe(1);
});
it('gets files', () => {
  expect(model.getFiles().length).toBe(0);
  model.addFile('a.js', {id: 'a.js'});
  model.addFile('b.js', {id: 'b.js'});
  model.addFile('c.js', {id: 'c.js'});
  expect(model.getFiles().length).toBe(3);
});

it('adds Imports', () => {
  model.addImport('a.js->b.js', {id: 'a.js->b.js'});
  expect(model.getImports().length).toBe(1);
});
it('does not add duplicate Imports', () => {
  model.addImport('a.js->b.js', {id: 'a.js->b.js'});
  model.addImport('a.js->b.js', {id: 'a.js->b.js'});
  expect(model.getImports().length).toBe(1);
});
it('gets imports', () => {
  expect(model.getImports().length).toBe(0);
  model.addImport('a.js', {id: 'a.js'});
  model.addImport('b.js', {id: 'b.js'});
  model.addImport('c.js', {id: 'c.js'});
  expect(model.getImports().length).toBe(3);
});
