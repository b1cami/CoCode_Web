import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

export const simpleAlert = (
	title: string,
	subTitle: string,
	icon: SweetAlertIcon,
	requestFunction?: any
) => {
	return Swal.fire(title, subTitle, icon).then(() => {
		if (requestFunction !== undefined) {
			requestFunction();
		}
	});
};

export const confirmAlert = (
	title: string,
	subTitle: string,
	icon: SweetAlertIcon,
	requestFunction: any
) => {
	return Swal.fire({
		title,
		text: subTitle,
		icon: icon,
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: '확인',
		cancelButtonText: '취소',
	}).then((result: SweetAlertResult) => {
		if (result.value) {
			requestFunction();
		}
	});
};
