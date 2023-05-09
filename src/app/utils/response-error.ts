export class ResponseError {
  constructor(
    private status: number,
    private message: string,
    private type: 'warning' | 'error' = 'warning',
    private errors?: any
  ) {}
}
