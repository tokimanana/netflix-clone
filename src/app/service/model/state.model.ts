export type StatusNotification = 'OK' | 'ERROR' | 'INIT';

export type State<T, E> =
  | { status: 'INIT' }
  | { status: 'OK'; value: T }
  | { status: 'ERROR'; error: E };

//Helper functions (plus simple que Builder)
export function initState<T, E>(): State<T, E> {
  return { status: 'INIT' };
}

export function successState<T, E>(value: T): State<T, E> {
  return { status: 'OK', value };
}

export function errorState<T, E>(error: E): State<T, E> {
  return { status: 'ERROR', error };
}

//Types Guards
export function isInit<T, E>(state: State<T, E>): state is { status: 'INIT' } {
  return state.status === 'INIT';
}

export function isSuccess<T, E>(
  state: State<T, E>
): state is { status: 'OK'; value: T } {
  return state.status === 'OK';
}

export function isError<T, E>(
  state: State<T, E>
): state is { status: 'ERROR'; error: E } {
  return state.status === 'ERROR';
}

export function getValueOrDefault<T, E>(state: State<T, E>, defaultValue: T): T {
  return isSuccess(state) ? state.value : defaultValue;
}
