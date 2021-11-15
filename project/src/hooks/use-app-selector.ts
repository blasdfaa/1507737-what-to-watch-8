import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootReducer } from '../redux/rootReducer';

export const useAppSelector: TypedUseSelectorHook<RootReducer> = useSelector;

export default useAppSelector;
