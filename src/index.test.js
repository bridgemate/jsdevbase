import { expect } from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';
//fs is filesystem it allow us to interact with the filesystem using node and it comes from node

describe("First dummy test", () =>{
  it("should pass", () => {
    expect(true).to.equal(true);
  });
});

describe('index.html', () => {
  // callback function in jsdom.env causes asynchronous code so that we need pass "done"
  it('should have h1 that says Users', (done) => {
    // read the html file into a index object
    const index = fs.readFileSync('./src/index.html', "utf-8");

    // jsdom.env can accept another 2nd parameter: an array of javascript files for index.html
    // if any of the js files has fetch call, isomorphic-fetch npm package need to be used
    jsdom.env(index, function(err, window) {
      const h1 = window.document.getElementsByTagName('h1')[0];
      expect(h1.innerHTML).to.equal("Users");
      done();
      window.close();
    });
  })
})
