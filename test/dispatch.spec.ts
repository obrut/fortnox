import { assert } from 'chai';
import { Util } from '../src/utils';

const makeFakeFortnoxResponse = (message: string) => {
    return {
        headers: {
            get: () => {
                return 'application/json'
            },
        },
        json: async () => {
            return ({
                ErrorInformation: {
                    message
                }
            });
        }
    };
}

describe('utils', () => {

    // fake error response from fortnox
    it('should correctly report fortnox error', async () => {
        const error = await Util.makeErrorFromResponse(makeFakeFortnoxResponse('Fortnox Error'));
        assert.equal(error.message, 'Fortnox Error');
    })

    it('should correctly report unknown error', async () => {
        const error = await Util.makeErrorFromResponse(makeFakeFortnoxResponse(''));
        assert.equal(error.message, 'An error has occured');
    })

})