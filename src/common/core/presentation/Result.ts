export class Result<T> {
  private _value?: T;

  public isSuccess: boolean;
  public isFailure: boolean;
  public error?: T | string;

  /**
   * Result 클래스 실행 시
   * 생성자로 성공:true 인데 에러 메세지가 있다면 에러 메세지 출력
   * 생성자로 성공:falss 인데 에러 메세지가 없다면 에러 메세지 출력
   * 그게 아니라면 해당 생성자를 변동할 수 없도록 한다. (Object.freeze)
   */
  public constructor(isSuccess: boolean, error?: T | string, value?: T) {
    if (isSuccess && error) {
      throw new Error(
        'InvalidOperation: A result cannot be successful and contain an error',
      );
    }
    if (!isSuccess && !error) {
      throw new Error(
        'InvalidOperation: A failing result needs to contain an error message',
      );
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;

    Object.freeze(this);
  }

  // 성공 인자 value
  // isSuccess : false 라면 인자값을 받을 수 없게 에러 출려
  public get value(): T {
    if (!this.isSuccess) {
      throw new Error(
        "Can't get the value of an error result. Use 'errorValue instead.",
      );
    }

    return this._value!;
  }

  // 에러 값이 먼지 알고 싶을 때
  public errorValue(): T {
    return this.error as T;
  }

  // 해당 함수를 통해 Result class 생성할 수 있다.
  // '성공' 객체를 생성하고 싶을 때 사용,
  // 만약 인자값에 문제가 있다면 에러를 내뿜는다.
  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  // '실패'; 객체를 생성하고 싶을 때 사용,
  // 마찬가지로 인자값에 실패 인자가 정확히 들어가지 않으면 에러를 내뿜는다.
  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error);
  }

  /**
   * 첫번째 인자로 배열이 들어왔을 때
   * 객체 안 [{isFailure: true}},{isFailure: false}] 이면
   * [{isFailure: true}] 를 리턴한다.
   */
  public static combine(results: Result<any>[]): Result<any> {
    for (const result of results) {
      if (result.isFailure) {
        return result;
      }
    }
    return Result.ok();
  }
}

/**
    const isSuc = Result.ok("성공 시 메세지!");
    console.log(isSuc);
    Result: {
        isSuccess: true,
        isFailure: false,
        error: undefined,
        _value: '성공!'
    }
  
    const isFai = Result.fail("에러 메세지");
    console.log(isFai);
    Result {
        isSuccess: false,
        isFailure: true,
        error: '에러 메세지',
        _value: undefined
    }
   */

export type Either<L, A> = Left<L, A> | Right<L, A>;

export class Left<L, A> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return true;
  }

  isRight(): this is Right<L, A> {
    return false;
  }
}

export class Right<L, A> {
  readonly value: A;

  constructor(value: A) {
    this.value = value;
  }

  isLeft(): this is Left<L, A> {
    return false;
  }

  isRight(): this is Right<L, A> {
    return true;
  }
}

export const left = <L, A>(l: L): Either<L, A> => {
  return new Left(l);
};

export const right = <L, A>(a: A): Either<L, A> => {
  return new Right<L, A>(a);
};
