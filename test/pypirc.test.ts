import * as pypi from '../src/pypirc';
import {v4 as uuidv4} from 'uuid';
import * as fs from 'fs';

describe('test get pypric contents', () => {
    const testCase = [
        {
            description: 'input不传参数',
            inputs: {
                pypiOperationType: '',
                indexUrl: '',
                trustedHost: '',
                repository: '',
                username: '',
                password: '',
                indexServer: '',
                tools: ''
            },
            result: `[distutils]\nindex-servers=pypi\n\n[pypi]\nrepository = https://pypi.org/simple\n`
        },
        {
            description: '只传repository',
            inputs: {
                pypiOperationType: '',
                indexUrl: '',
                trustedHost: '',
                repository: 'https://repo.xxx.xxx/repository/pypi/simple',
                username: '',
                password: '',
                indexServer: '',
                tools: ''
            },
            result: `[distutils]\nindex-servers=pypi\n\n[pypi]\nrepository = https://repo.xxx.xxx/repository/pypi/simple\n`
        },
        {
            description: '传用户名密码',
            inputs: {
                pypiOperationType: '',
                indexUrl: '',
                trustedHost: '',
                repository: '',
                username: 'username',
                password: 'password',
                indexServer: '',
                tools: ''
            },
            result: `[distutils]\nindex-servers=pypi\n\n[pypi]\nrepository = https://pypi.org/simple\nusername = username\npassword = password\n`
        }
    ];
    testCase.forEach(item => {
        const {description, inputs, result} = item;
        test(`${description}`, async () => {
            expect(pypi.getPypricContents(inputs)).toBe(result);
        });
    });
});

test('get pypirc path', async () => {
    expect(pypi.getPypircPath()).toMatch(/.pypirc$/);
});

test('test write pypirc config', async () => {
    const content = 'hello';
    const path = 'test/.test-' + uuidv4();
    pypi.writePypirc(path, content);
    expect(fs.readFileSync(path, 'utf-8')).toBe(content);
    fs.unlinkSync(path);
});

describe('test generate pypirc config', () => {
    const testCase = [
        {
            description: '查看是否生成pypirc',
            inputs: {
                pypiOperationType: '',
                indexUrl: '',
                trustedHost: '',
                repository: '',
                username: '',
                password: '',
                indexServer: '',
                tools: ''
            },
            result: '[distutils]\nindex-servers=pypi\n\n[pypi]\nrepository = https://pypi.org/simple\n'
        }
    ];
    const configPath = pypi.getPypircPath();
    const tmpPath = './test/.pyoirc-' + uuidv4();
    beforeAll(() => {
        if (fs.existsSync(configPath)) {
            fs.copyFileSync(configPath, tmpPath);
        }
    });
    afterAll(() => {
        if (fs.existsSync(tmpPath)) {
            fs.copyFileSync(tmpPath, configPath);
            fs.unlinkSync(tmpPath);
        }
    });

    testCase.forEach(item => {
        const {description, inputs, result} = item;
        test(`${description}`, async () => {
            pypi.generatePypirc(inputs);
            expect(fs.readFileSync(configPath, 'utf-8')).toBe(result);
        });
    });
});
