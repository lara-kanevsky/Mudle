const { log } = require("console");
const assert = require("assert");
const expect = require("chai").expect;
const app = require("../app.js");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

// describe("Creacion de item", function () {
//   it("", function () {
//     app.grabarItems();
//     const resultado = app.items.length;
//     console.log(app.items);
//     assert.equal(resultado, 10);
//   });
// });

describe("Creación de usuario", () => {
  it("debería devolver 200 OK", (done) => {
    const usuario = {
      username: "Laruwu",
      password: "dongato",
      mail: "larapicantoich@gmail.com",
    };

    chai
      .request(app)
      .post("/usuarios")
      .send(usuario)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("Creación de item", () => {
  it("debería devolver 401 Unauthorized", (done) => {
    const item = {
      parentNode: -1,
      titulo: "Titulovich",
      contenido: "Contenido blabla balalsijdowjia.",
    };

    chai
      .request(app)
      .post("/items")
      .send(item)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});

describe("Obtener usuarios", () => {
  it("debería devolver 200 OK", (done) => {
    chai
      .request(app)
      .get("/usuarios")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("Login", () => {
  it("debería devolver 200 OK", (done) => {
    const credentials = {
      mail: "larapicantoich@gmail.com",
      password: "dongato",
    };

    chai
      .request(app)
      .post("/login")
      .send(credentials)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
