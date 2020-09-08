import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./Meal.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface MealProps {
	breakfastList: string[];
	lunchList: string[];
	dinnerList: string[];
	children?: ReactNode;
}

const Meal = ({
	dinnerList,
	breakfastList,
	lunchList,
	children,
}: MealProps) => {
	return (
		<div className={cx('Meal')}>
			<div className={cx('Meal-Title')}>오늘의 급식</div>
			<div className={cx('Meal-List')}>
				<div className={cx('Meal-List-Card')}>
					<div className={cx('Meal-List-Card-Title')}>- 아침 -</div>
					<div className={cx('Meal-List-Card-Items')}>
						{breakfastList.map((meal: string) => {
							return <div>{meal}</div>;
						})}
					</div>
				</div>

				<div className={cx('Meal-List-Card')}>
					<div className={cx('Meal-List-Card-Title')}>- 점심 -</div>
					<div className={cx('Meal-List-Card-Items')}>
						{lunchList.map((lunch: string) => {
							return <div>{lunch}</div>;
						})}
					</div>
				</div>

				<div className={cx('Meal-List-Card')}>
					<div className={cx('Meal-List-Card-Title')}>- 저녁 -</div>
					<div className={cx('Meal-List-Card-Items')}>
						{dinnerList.map((dinner: string) => {
							return <div>{dinner}</div>;
						})}
					</div>
				</div>
			</div>
			{children && children}
		</div>
	);
};

export default Meal;
