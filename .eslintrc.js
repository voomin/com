// const path = require('path');

module.exports = {
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        'airbnb-base',
        'plugin:vue/recommended'
    ],
    // "settings": {
    //     "import/resolver": { // alias import 설정
    //         "alias": [
    //             // ["@", path.resolve(__dirname, "./src")],
    //             // ["canvas", "./src/service/canvas/canvas_libs"],
    //             // ["blockly", "./src/service/canvas/blockly_libs"],
    //             // ["interpreter", path.resolve(__dirname, "./src/service/canvas/interpreter")]
    //         ]
    //     }
    // },
    globals: {
        Blockly: true,
        createjs: true,
        Proton: true,
        amplitude: true
    },
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }], // js indent 관련 기존 사용 규칙 따르도록
        'vue/html-indent': ['error', 4], // vue template indent 관련 기존 사용 규칙 따르도록
        'linebreak-style': 0, // CRLF, LF 이슈 Cross-OS 확인 후 되살림 혹은 유지 필요
        'no-sparse-arrays': 0, // [, 1, 2] <- 이와 같은 배열 내 뛰어넘기 가능토록
        'global-require': 0, // require를 변수 선언 시 외에 사용 가능토록
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }], // devDependencies에만 존재하는 패키지도 임포트 가능토록
        'no-param-reassign': ['error', { props: false }], // 매개 변수 객체 내용 변경 허용
        'no-plusplus': 0, // 증감 연산자 허용
        'import/no-dynamic-require': 0, // 다이나믹 require 허용
        'vue/max-attributes-per-line': ['error', {
            singleline: 3, // [회의] 1줄에 attribute 3개까지 허용
            multiline: {
                max: 3, // [회의] single line과 동일하게 맞춤
                allowFirstLine: false // [회의] multiline의 첫줄에 attribute 허용 여부
            }
        }],
        'comma-dangle': ['error', 'never'], // [eslint] 마지막 comma 없는 것으로
        'no-alert': 0, // [회의] alert 허용
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 추가 설정 확인 요망
        'no-debugger': 'error', // [default] debugger 사용 불가
        'max-len': ['error', {
            code: 100, // [default-airbnb] 1줄에 100자 이내로 작성
            ignoreComments: true, // [eslint] 주석은 max-len 적용 안함
            ignoreTrailingComments: true, // [eslint] 코드 뒤에 붙은 주석도 max-len 적용 안함
            ignoreUrls: true, // [eslint] url은 max-len 적용 안함
            ignoreStrings: true, // [eslint] 문자열 max-len 적용 안함
            ignoreTemplateLiterals: true, // [eslint] `` 을 사용한 문자열 max-len 적용 안함
            ignoreRegExpLiterals: true // [eslint] 정규식 max-len 적용 안함
        }],
        'no-undef-init': 'error', // [default] undefined 로 초기화 불가
        'no-else-return': 'off', // [회의] else return 허용
        'no-underscore-dangle': 0, // 변수명 내 언더바 사용 허용 (기존에 계속해서 사용되었음)
        camelcase: 0, // 변수명 내 언더바 사용 허용 (기존에 계속해서 사용되었음)
        'class-methods-use-this': 0, // 클래스 메소드가 클래스 내부에서 this로 호출 되지 않아도 되도록 (기존에 계속해서 사용되었음)
        'arrow-body-style': 0, // Arrow 함수 리턴 시 스타일 자유롭도록 (8월 30일자 회의 통해 정함)
        'no-restricted-syntax': 0, // Object.keys, values 함수 사용 시 __proto__ 내 내용을 가져오지 못 하기에 사용 필수
        'guard-for-in': 0, // 해당 옵션 사용 시 for in 문 내 조건문이 무조건 존재해야 됨
        'no-continue': 0, // 기존 사용 된 코드가 매우 많고, lint 대상인 이유가 단순 가독성 이슈
        'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }], // [회의] 한 줄에 모든 property를 적거나 아니면 한 줄에 1개만
        'prefer-destructuring': [ // [회의] 객체 디스트럭처링을 통한 기존 변수값 할당만 린트 적용 해제, 나머지 유지
            'error',
            {
                VariableDeclarator: {
                    array: true,
                    object: true
                },
                AssignmentExpression: {
                    array: true,
                    object: false
                }
            }
        ]
    }
};
