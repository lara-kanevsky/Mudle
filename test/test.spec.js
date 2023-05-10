const assert = require('assert')
const App = require('../classes/app.js')
const { log } = require('console')
const expect = require('chai').expect 
const app = new App("Mudle")

describe('Creacion de item',function() {
    it('',function(){
        app.grabarItems()
        const resultado=app.items.length;
        console.log(app.items)
        assert.equal(resultado,10)
    })
})