var chai = require('chai');
var expect = require('chai').expect;
var chai_http = require('chai-http');
var axios = require('axios');

chai.use(chai_http);

describe("Search Test", ()=> {
  var url = `http://localhost:8001`;
  
  it("Search with String A-Z",  (done)=> {
    chai.request(url)
    .get(`/apis/search`)
    .query({s: "Batman", page: "1"})
    .end((err, res) => {
      //console.log(res)
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body.status).to.equal("success");
      done()
    })
    // expect(request.data.status).to.equal("success");
    // expect(request.data.data.Search).to.equal()
  });
  it("Search with String A-Z, without page",  (done)=> {
    chai.request(url)
    .get(`/apis/search`)
    .query({s: "Batman"})
    .end((err, res) => {
      //console.log(res)
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body.status).to.equal("success");
      expect(res.body.page).to.equal(1);
      done()
    })
    // expect(request.data.status).to.equal("success");
    // expect(request.data.data.Search).to.equal()
  });
  it("Search with String A-Z, without page",  (done)=> {
    chai.request(url)
    .get(`/apis/search`)
    .query({s: "Batman"})
    .end((err, res) => {
      //console.log(res)
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body.status).to.equal("success");
      expect(res.body.page).to.equal(1);
      done();
    })
    // expect(request.data.status).to.equal("success");
    // expect(request.data.data.Search).to.equal()
  });
})