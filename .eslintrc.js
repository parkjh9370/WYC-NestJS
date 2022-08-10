module.exports = {
  /** parser, parserOptions
   * ESLint는 기본적으로 순수한 자바스크립트 코드만 이해 가능하기 때문에
   * 자바스크립트 확장 문법(JSX, TypeScript)이나 최신 문법으로 작성한 코드
   * 린트(lint)하기 위해서는 그에 상응하느 파서(parser)를 설정
   */
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  /** plugins
   * 기본 제공 규칙 외에 추가적인 규칙을 사용할 수 있도록 만들어줌
   * 해당(새로운) 규칙을 단순히 설정이 가능한 상태로 만듬
   * 즉, 규칙을 위반하면 오류(error)를 낼지 경고(warn)를 낼지 아니면
   * 해당 규칙을 끌지(off)에 대해서는
   * extends, rules옵션을 통해 추가 설정
   */
  plugins: ['@typescript-eslint/eslint-plugin'],
  /** extends
   * 미리 공개된 설정(Google, Facebook, Airbnb)을 그대로 가져와
   * 기반(base) 설정으로 활용 가능
   * 즉, 추천 설정을 활용해 손쉽게 세팅이 가능하다.
   */
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  /** root
   * Eslint 설정 시 여러 개 설정 파일 사용 가능
   * 특히 Monorepo와 같이 하나의 코드 저장소에 여러개 프로젝트가 공존하는 경우
   * ESlint는 현재 lint 대상 파일이 위치한 폴더 안에 설정 파일이 있는지 우선적
   * 으로 확인해보고 없으면 그 상위 폴더를 한 단계 씩 거슬러 올라가며 설정 파일을
   * 찾는다.
   * root 옵션이 true -> 더 이상 상위 폴더로 올라가지 않음
   * ex) 프로젝트 별 설정 파일에 false 적용, 코드 저장소 최상위 : true
   */
  root: true,
  /** env
   * 자바스크립트 환경마다 전역(global) 변수를 통해 접근이 가능한 고유 객체 설정
   * 미리 선언하지 않고 접근하는 변수에 대해서는 오류를 내기 때문에
   * 각 실행환경(runtime)에서 기본적으로 제공되는 전역 객체를 설정
   * ex) 자바스크크립트 코드가 브라우저 or 노드에서 실행 된다면
   * ESLint로 린트(lint)할 환경을 등록
   */
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  /** rules
   * 규칙 하나 하나를 세세하게 제어하기 위해서 사용
   * 일반적으로 extends 옵션에 설정된 규칙을 수정해서 적용하거나
   *  새로운 규칙을 추가하고 싶을 때 사용
   */
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};

/** settings 옵션
 * 동작하는 플러그인이 프로젝트에 설치된 react와 같은 버전을 자동으로 탐지하도록 설정
 */

/** ignorePatterns, .eslintignore파일
 * ESLint는 기본적으로 node_modules 폴더와 . 으로 시작하는 설정 파일을 무시
 * 그 밖에 다른 파일을 무시하고 싶다면 설정 파일의 ignorePatterns 옵션 사용
 * {
 *   "ignorePatterns": ["build", "dist", "public"]
 *  }
 *
 *  + .eslintignore 파일을 생성해도 된다
 * .eslintignore
 * build
 * dist
 * public
 */
