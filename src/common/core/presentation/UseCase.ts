export interface UseCase<IRequest, IResponse> {
  execute(request?: IRequest): Promise<IResponse> | IResponse;
}

/**
 *  UseCase : IRequest, Iresponse 인자 값을 받아
 * 1. excute(Irequest) 함수를 실행하고
 * 2. Promise 또는 Iresponse 값을 리턴하는 인터페이스
 */
