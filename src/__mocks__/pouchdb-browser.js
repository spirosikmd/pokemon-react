class PouchDB {
  allDocs() {
    return Promise.resolve({
      rows: [],
    });
  }
}

module.exports = PouchDB;
