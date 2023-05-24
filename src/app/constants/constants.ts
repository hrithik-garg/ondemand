export const regexList = {
	mobileNumber: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
	email: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
};

export const enum ModalContentType {
	HtmlContent = 'HtmlContent',
	StringContent = 'StringContent',
	DynamicComponent = 'DynamicComponent',
};

export const youTubeVideoId = '2PPCg-6vLTI';