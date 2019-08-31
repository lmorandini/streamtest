"use strict";

module.exports = async (config) => {
  const routing = new Routing (config.app);
  routing.configure ();
  routing.bind (routing.handle);
};

class Routing {
  constructor (app) {
    this.app = app;
  }

  configure () {
    const bodyParser = require ('body-parser');
    this.app.use (bodyParser.json ());
    this.app.use (bodyParser.raw ());
    this.app.use (bodyParser.text ({type: "text/*"}));
    this.app.disable ('x-powered-by');
  }

  bind (route) {
    this.app.post ('/*', route);
    this.app.get ('/*', route);
    this.app.patch ('/*', route);
    this.app.put ('/*', route);
    this.app.delete ('/*', route);
  }

  handle (req, res) {
    let seq = 1;
    const nseq = 30;
    res.write (JSON.stringify (
      {message: 'start'})
      + '\n');
    const inter = setInterval (() => {
      res.write (JSON.stringify (
        {seq: seq++, message: (new Date ()).toISOString ()})
        + '\n');

      if (seq === nseq) {
        clearInterval (inter);
        res.status (200).end (JSON.stringify ({message: 'end'}) + '\n');
      }
    }, 1000);
  }
}


