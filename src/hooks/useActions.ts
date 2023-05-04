import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../store/servisces';
import { useMemo } from 'react';

export const useActions = () => {
	const dispatch = useDispatch();
	return useMemo(() => {
		return bindActionCreators(ActionCreators, dispatch);
	}, [dispatch]);
};

// export const useActions2 = () => {
// 	const dispatch = useDispatch();
// 	const { user, courses, authors } = ActionCreators2;
// 	return {
// 		courses: bindActionCreators(courses, dispatch),
// 		user: bindActionCreators(user, dispatch),
// 		authors: bindActionCreators(authors, dispatch),
// 	};
// };
