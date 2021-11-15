import React from 'react';

export type AnyEventTypes<T> = React.KeyboardEvent<T> | React.MouseEvent<T> | React.TouchEvent<T>;
