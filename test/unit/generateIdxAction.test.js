import generateIdxAction from '../../src/generateIdxAction';

const mockIdxResponse = require('../mocks/request-identifier');
const mockPollingIdxResponse = require('../mocks/poll-for-password');

jest.mock('cross-fetch');
jest.mock('../../src/makeIdxState');
const { Response } = jest.requireActual('cross-fetch');

// import targets for mockery
import fetch from 'cross-fetch'; 
import makeIdxState from '../../src/makeIdxState';
fetch.mockImplementation( () => Promise.resolve( new Response(JSON.stringify( mockIdxResponse )) ) );
makeIdxState.mockReturnValue('mock IdxState');

describe('generateIdxAction', () => { 
  it('builds a function', () => {
    const actionFunction = generateIdxAction(mockIdxResponse.remediation.value[0]);
    expect(typeof actionFunction).toBe('function');
  });

  it('returns a function that returns an idxState', async () => {
    const actionFunction = generateIdxAction(mockIdxResponse.remediation.value[0]);
    return actionFunction()
      .then( result => {
        expect( fetch.mock.calls.length ).toBe(1);
        expect( result ).toBe('mock IdxState');
      });
  });

  // TODO: Conditions to decide if polling is finished are being discussed
  xit('generates a polling function when appropriate', () => { 
    const pollingFunction = generateIdxAction( mockPollingIdxResponse.factor.value.poll );
    fail('not done yet');
  });
});
