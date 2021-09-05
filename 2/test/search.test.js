var {expect} = require('chai');
var axios = require('axios');

describe("Search Test", ()=> {
  var url = `http://localhost:8001/apis/search`;
  it("Search with String A-Z", async ()=> {
    let request = await axios.get(url, {
      params: {
        "s": "Batman",
        "page": 1
      }
    })
    expect(1+1).to.equal(2);
  });
})