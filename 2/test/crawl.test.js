var chai = require('chai');
var expect = require('chai').expect;
var chai_http = require('chai-http');

//const url = `https://apis.andresetiawan.com/stockbit`;
const url = "http://localhost:8001"
chai.use(chai_http);

describe("Search Test", ()=> {
  it("Search with String A-Z",  (done)=> {
    chai.request(url)
    .get(`/apis/search`)
    .query({keyword: "Batman", page: "1"})
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body.status).to.equal("success");
      done()
    })
  });
  it("Search with String A-Z, without page",  (done)=> {
    chai.request(url)
    .get(`/apis/search`)
    .query({keyword: "Batman"})
    .end((err, res) => {
      //console.log(res)
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body.status).to.equal("success");
      expect(res.body.page).to.equal(1);
      done()
    })
  });
  it("Search with String A-Z, with negative page",  (done)=> {
    chai.request(url)
    .get(`/apis/search`)
    .query({keyword: "Batman", page:"-1"})
    .end((err, res) => {
      //console.log(res)
      expect(err).to.be.null;
      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
      expect(res.body.status).to.equal("error");
      done();
    })
  });
  it("Search with String A-Z, with non number page",  (done)=> {
    chai.request(url)
    .get(`/apis/search`)
    .query({keyword: "Batman", page: "lala"})
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body.status).to.equal("success");
      expect(res.body.page).to.equal(1);
      done();
    })
  });
  it("Search without query strings. Expect Error",  (done)=> {
    chai.request(url)
    .get(`/apis/search`)
    .end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
      expect(res.body.status).to.equal("error");
      done();
    })
  });
});

describe("Detail test", () => {
  it("Return detail with valid ID", (done)=> {
    chai.request(url)
    .get(`/apis/detail`)
    .query({id: "tt0371746"})
    .end((err, res) => {
      //console.log(res)
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body.status).to.equal("success");
      expect(res.body.data).to.be.a('object');
      done();
    })
  })
  it("Return detail with valid title", (done)=> {
    chai.request(url)
    .get(`/apis/detail`)
    .query({title: "Spider-Man"})
    .end((err, res) => {
      //console.log(res)
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body.status).to.equal("success");
      expect(res.body.data).to.be.a('object');
      done();
    })
  })
  it("Request with Invalid ID. Expect Error", (done)=> {
    chai.request(url)
    .get(`/apis/detail`)
    .query({id: "BatMan"}) //this ID is invalid
    .end((err, res) => {
      //console.log(res)
      expect(err).to.be.null;
      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
      expect(res.body.status).to.equal("error");
      done();
    })
  })
  it("Request with Invalid ID, outside alphanumeric. Expect Error", (done)=> {
    chai.request(url)
    .get(`/apis/detail`)
    .query({id: "Bat Man"}) //this ID is containing spaces (outside alphanumeric)
    .end((err, res) => {
      //console.log(res)
      expect(err).to.be.null;
      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
      expect(res.body.status).to.equal("error");
      done();
    })
  })
  it("Request with Invalid title. Expect Error", (done)=> {
    chai.request(url)
    .get(`/apis/detail`)
    .query({id: "asdasfasfsadsa"}) //this movie title is invalid
    .end((err, res) => {
      //console.log(res)
      expect(err).to.be.null;
      expect(res).to.have.status(400);
      expect(res.body).to.be.a('object');
      expect(res.body.status).to.equal("error");
      done();
    })
  })
})