import { useDispatch } from 'react-redux';

import { AppDispatch } from '../redux/store';

const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

export default useAppDispatch;
