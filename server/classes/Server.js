class Server {
  constructor(app) {
    this.app = app;
  }

  start() {
    this.app.listen(process.env.dev_port, () => {
      console.log(
        `Listening for requests on port ${process.env.dev_port}, http://127.0.0.1:3000/`
      );
    });
  }
}

export default Server;
