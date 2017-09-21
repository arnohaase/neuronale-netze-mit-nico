import Backend from '../services/Backend';
import {createMockActionContext} from 'fluxible/utils';
import LoadConfigAction from './LoadConfigAction';

jest.mock('../services/Backend');

describe('LoadConfigAction', () => {
    test('call backend', done => {
        let mockContext = createMockActionContext();
        Backend.init('GET /config', 'response body');

        LoadConfigAction(mockContext, {}, (err, body) => {
            expect(err).toBe(null);
            expect(body).toBe('response body');
            done();
        });

        expect(mockContext.dispatchCalls).toHaveLength(1);
        expect(mockContext.dispatchCalls[0].name).toBe('configLoaded');
        expect(mockContext.dispatchCalls[0].payload).toBe('response body');
    })
});
