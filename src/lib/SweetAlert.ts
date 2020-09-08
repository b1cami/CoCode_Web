import Swal, { SweetAlertIcon } from 'sweetalert2';

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
