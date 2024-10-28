import test from 'ava';
import userService from '../src/modules/user/services/userService'

test('check if our random service works', async t => {
    const result = await userService.getRandomTest();
    t.is(result, 'it works');
});