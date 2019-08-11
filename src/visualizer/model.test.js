var makeModel = require('./model');
let model;
beforeEach(() => {
  model = makeModel();
});
it('adds files', () => {
  model.addFile('a.js', { id: 'a.js' });
  expect(Object.keys(model.getFiles()).length).toBe(1);
});
it('does not add duplicate files', () => {
  model.addFile('a.js', { id: 'a.js' });
  model.addFile('a.js', { id: 'a.js' });
  expect(Object.keys(model.getFiles()).length).toBe(1);
  expect('a.js' in model.getFiles()).toBeTruthy();
});
it('gets files', () => {
  expect(typeof model.getFiles()).toBe('object');
  expect(Object.keys(model.getFiles()).length).toBe(0);
  model.addFile('a.js', { id: 'a.js' });
  model.addFile('b.js', { id: 'b.js' });
  model.addFile('c.js', { id: 'c.js' });
  expect(Object.keys(model.getFiles()).length).toBe(3);
});

it('adds Imports', () => {
  const id = 'a.js->b.js';
  model.addImport(id, { id });
  expect(Object.keys(model.getImports()).length).toBe(1);
  expect(id in model.getImports()).toBeTruthy();
});
it('does not add duplicate Imports', () => {
  model.addImport('a.js->b.js', { id: 'a.js->b.js' });
  model.addImport('a.js->b.js', { id: 'a.js->b.js' });
  expect(Object.keys(model.getImports()).length).toBe(1);
});
it('gets imports', () => {
  expect(Object.keys(model.getImports()).length).toBe(0);
  model.addImport('a.js', { id: 'a.js' });
  model.addImport('b.js', { id: 'b.js' });
  model.addImport('c.js', { id: 'c.js' });
  expect(Object.keys(model.getImports()).length).toBe(3);
});
