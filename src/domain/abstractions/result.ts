class Result<TValue = unknown> {
  private readonly _error?: string;

  private readonly _isSuccess: boolean;

  private readonly _value?: TValue;

  private constructor(isSuccess: boolean, error?: string, value?: TValue) {
    const cleanError = error?.trim();

    if (isSuccess && cleanError) {
      throw new Error('A success result may not have an error');
    }

    if (!isSuccess && !cleanError) {
      throw new Error('A failure result must have an error');
    }

    this._error = cleanError;
    this._isSuccess = isSuccess;
    this._value = value;
  }

  public get error() {
    return this._error;
  }

  public get isFailure() {
    return !this._isSuccess;
  }

  public get isSuccess() {
    return this._isSuccess;
  }

  public static fail<TValue = unknown>(error: string) {
    return new Result<TValue>(false, error, undefined);
  }

  public static ok<TValue = unknown>(value?: TValue) {
    return new Result<TValue>(true, undefined, value);
  }

  public get value() {
    if (this.isFailure) {
      throw new Error('You may not access the value of a failed result');
    }

    return this._value;
  }
}

export default Result;
