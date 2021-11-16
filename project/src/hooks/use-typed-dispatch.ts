import { useDispatch } from 'react-redux';

import { AppDispatch } from '../redux/store';

const useTypedDispatch = (): AppDispatch => useDispatch<AppDispatch>();

export default useTypedDispatch;
