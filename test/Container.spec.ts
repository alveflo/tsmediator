///<reference path="../node_modules/@types/node/index.d.ts"/>
///<reference path="../node_modules/@types/chai/index.d.ts"/>
///<reference path="../node_modules/@types/mocha/index.d.ts"/>

import SimpleHandler from './SimpleHandler';
import { Container }from '../src/container';
import { Mediator } from '../lib';
import { expect } from 'chai';


describe("Container", () => {
  describe("RegisterHandler", () => {
    let mediator : Mediator =  null;

    beforeEach(() => {
        mediator = new Mediator();
    });
    
      it(`should register handler`, () => {
        Container.RegisterHandler(SimpleHandler);
        
        expect(mediator.Send('Simple_Handler', 'payload')).to.equal("handle: payload");
      });
  });
})