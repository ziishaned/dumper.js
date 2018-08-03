let dd = require('./lib/dd');

const obj = {
    'elements':
        {
            'verb':
                {
                    'label': 'verb',
                    'id': 'verb',
                    'type': 'text',
                    'size': '50',
                    'element': 'input'
                },
            'url':
                {
                    'label': 'url',
                    'id': 'url',
                    'type': 'text',
                    'size': '50',
                    'element': 'input'
                },
            'reqBody':
                {
                    'label': 'reqbody',
                    'id': 'reqbody',
                    'type': 'text',
                    'size': '50',
                    'element': 'input'
                }
        }
};

dd(obj);
