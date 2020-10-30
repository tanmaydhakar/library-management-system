const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const apiBase = "http://localhost:3333";

chai.use(chaiHttp);

describe("# Project APIs : admin", () => {
  let adminToken;
  let userToken;
  it("login admin", function (done) {
    chai
      .request(apiBase)
      .post("/api/login")
      .send({ username: "Admin123", password: "Admin@123" })
      .then((res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property("user");
        expect(res.body.user).to.have.property("token");
        adminToken = res.body.user.token;
        done();
      })
  });

  it("login user", function (done) {
    chai
      .request(apiBase)
      .post("/api/login")
      .send({ username: "User123", password: "User@123" })
      .then((res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property("user");
        expect(res.body.user).to.have.property("token");
        userToken = res.body.user.token;
        done();
      })
  });

  it("create a request for issue", function (done) {
    chai
      .request(apiBase)
      .post("/api/book/3/issue")
      .set("Authorization", userToken)
      .set("Accept", "application/json")
      .then((res) => {
        expect(res.body).to.satisfy(function (body) {
          if (Array.isArray(body)) {
            expect(res.statusCode).to.equal(400);
            expect(res.body[0].message).to.equal(
              "Book not available for issue"
            );
            return true;
          } else if (body.request) {
            expect(res.statusCode).to.equal(201);
            expect(res.body.request).to.have.property("id");
            return true;
          } else {
            return false;
          }
        });
        return done();
      });
  });

  it("list all requests", function (done) {
    chai
      .request(apiBase)
      .get("/api/requests")
      .set("Authorization", adminToken)
      .set("Accept", "application/json")
      .then((res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.have.property("requests");
        done();
      });
  });

  it("list all requests, for a given user", function (done) {
    chai
      .request(apiBase)
      .get("/api/requests?userId=1")
      .set("Authorization", adminToken)
      .set("Accept", "application/json")
      .then((res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.have.property("requests");
        done();
      });
  });

  it("fail case for list all requests, for a given user", function (done) {
    chai
      .request(apiBase)
      .get("/api/requests?userId=123")
      .set("Authorization", adminToken)
      .set("Accept", "application/json")
      .then((res) => {
        expect(res.statusCode).to.be.equal(400);
        expect(res.body[0].message).to.equal(
          "Invalid userId"
        );
        done();
      });
  });

  it("list a requests", function (done) {
    chai
      .request(apiBase)
      .get("/api/request/3")
      .set("Authorization", adminToken)
      .set("Accept", "application/json")
      .then((res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.have.property("request");
        expect(res.body.request).to.have.property("book_id");
        expect(res.body.request).to.have.property("user_id");
        expect(res.body.request).to.have.property("type");
        expect(res.body.request).to.have.property("status");
        expect(res.body.request).to.have.property("created_at");
        expect(res.body.request).to.have.property("updated_at");
        expect(res.body.request).to.have.property("book");
        expect(res.body.request.book).to.have.property("book");
        expect(res.body.request.book).to.have.property("id");
        expect(res.body.request.book).to.have.property("title");
        expect(res.body.request.book).to.have.property("quantity");
        expect(res.body.request.book).to.have.property("available");
        expect(res.body.request.book).to.have.property("created_at");
        expect(res.body.request.book).to.have.property("updated_at");

        done();
      });
  });

  it("fail case, list a requests", function (done) {
    chai
      .request(apiBase)
      .get("/api/request/100")
      .set("Authorization", adminToken)
      .set("Accept", "application/json")
      .then((res) => {
        expect(res.statusCode).to.be.equal(400);
        expect(res.body[0].message).to.equal(
          "Request does not exists"
        );

        done();
      });
  });

  it("fail case,user accept a request", function (done) {
    chai
      .request(apiBase)
      .patch("/api/request/1")
      .set("Authorization", userToken)
      .set("Accept", "application/json")
      .then((res) => {
        expect(res.statusCode).to.be.equal(403);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.have.equal("Forbidden");
        done();
      });
  });

  it("fail case,no auth, accept a request", function (done) {
    chai
      .request(apiBase)
      .patch("/api/request/1")
      .set("Accept", "application/json")
      .then((res) => {
        expect(res.statusCode).to.be.equal(400);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.have.equal("Authorization token missing");
        done();
      });
  });

  it("accept a request", function (done) {
    chai
      .request(apiBase)
      .patch("/api/request/1")
      .set("Authorization", adminToken)
      .set("Accept", "application/json")
      .then((res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.have.property("request");
        expect(res.body.request).to.have.property("id");
        expect(res.body.request).to.have.property("book_id");
        expect(res.body.request).to.have.property("user_id");
        expect(res.body.request).to.have.property("type");
        expect(res.body.request).to.have.property("status");
        expect(res.body.request).to.have.property("created_at");
        expect(res.body.request).to.have.property("updated_at");

        done();
      });
  });

  it("reject a request"),
    function (done) {
      chai
        .request(apiBase)
        .patch("/api/request/4")
        .set("Authorization", adminToken)
        .set("Accept", "application/json")
        .then((res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body).to.have.property("request");
          expect(res.body.request).to.have.property("id");
          expect(res.body.request).to.have.property("book_id");
          expect(res.body.request).to.have.property("user_id");
          expect(res.body.request).to.have.property("type");
          expect(res.body.request).to.have.property("status");
          expect(res.body.request).to.have.property("created_at");
          expect(res.body.request).to.have.property("updated_at");

          done();
        });
    };

    it("create a request for return", function (done) {
      chai
        .request(apiBase)
        .post("/api/book/1/return")
        .set("Authorization", userToken)
        .set("Accept", "application/json")
        .then((res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body).to.have.property("requests");
          expect(res.body.request).to.have.property("id");
          expect(res.body.request).to.have.property("book_id");
          expect(res.body.request).to.have.property("user_id");
          expect(res.body.request).to.have.property("type");
          expect(res.body.request).to.have.property("status");
          expect(res.body.request).to.have.property("created_at");
          expect(res.body.request).to.have.property("updated_at");

          return done();
        });
    });
});
