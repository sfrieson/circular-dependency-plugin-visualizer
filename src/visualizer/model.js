module.exports = function makeModel() {
  const files = {};
  const imports = {};
  return {
    addFile(name, data) {
      files[name] = data;
    },
    addImport(id, source, target) {
      imports[id] = {
        id,
        source,
        target,
      };
    },
    getFiles() {
      return files;
    },
    getImports() {
      return imports;
    },
  };
};
