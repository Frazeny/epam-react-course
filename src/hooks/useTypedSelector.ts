import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../store/servisces';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
