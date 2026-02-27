// // constants/roles.js

export const APPNAME = 'Accounting File Manager'

// export const ROLES = {
// 	sa: 'sa',
// 	s: 's',
// }
// export const PAGES = {
// 	web: 'Web',
// 	Home: 'Home',
// 	Uploads: 'Uploads',
// 	UploadInvoice: 'UploadInvoice',
// 	UploadPackslip: 'UploadPackslip',
// 	CardReceipts: 'CardReceipts',
// }

// export const WEBACTIONS = {
// 	Home: {
// 		ViewInvoices: 'ViewInvoices',
// 		UploadFiles: 'UploadFiles',
// 		ViewFileManager: 'ViewFileManager',
// 		ApproveInvoices: 'ApproveInvoices',
// 		CancelApproveInvoices: 'CancelApproveInvoices',
// 		FilterByVendor: 'FilterByVendor',
// 		FilterByPono: 'FilterByPono',
// 		FilterByDeptManager: 'FilterByDeptManager',
// 		FilterByInvoice: 'FilterByInvoice',
// 		FilterByFinished: 'FilterByFinished',
// 		ViewFIles: 'ViewFIles',
// 		ViewYourInvoices: 'ViewYourInvoices',
// 	},
// 	Uploads: {
// 		RenderUpload: 'RenderUpload',
// 	},
// 	UploadInvoice: {
// 		RenderuploadFilesInvoices: 'RenderuploadFilesInvoices',
// 	},
// 	UploadPackslip: {
// 		RenderuploadFilesPackslip: 'RenderuploadFilesPackslip',
// 		UploadPackslipPostFiles: 'UploadPackslipPostFiles',
// 	},
// 	CardReceipts: {
// 		RenderCardReceipts: 'RenderCardReceipts',
// 	},
// 	FileStorage: {
// 		ViewFileManager: 'ViewFileManager',
// 	},
// }
export const ROLES = {
	superadmin: 'sa',
	accounting: 'ac',
	dept_manager: 'dm',
}
export const PAGES = {
	FileStorage: 'FileStorage',
	FileManager: 'FileManager',
	Home: 'Home',
}

export const APP_ACTIONS = {
	Home: {
		ViewInvoices: 'ViewInvoices', /**TAB HOME**/
		ViewYourInvoices: 'ViewYourInvoices', /**btn table */
		UploadFiles: 'UploadFiles', /**btn table */
		ViewFileManager: 'ViewFileManager', /**btn table */
		ApproveInvoices: 'ApproveInvoices', /**selector table */
		CancelApproveInvoices: 'CancelApproveInvoices',/*btn de cancelar a un lado de el selector de approve */
		FilterByVendor: 'FilterByVendor',
		FilterByPono: 'FilterByPono',
		FilterByDeptManager: 'FilterByDeptManager',
		FilterByInvoice: 'FilterByInvoice',
		FilterByFinished: 'FilterByFinished',
		ViewFIles: 'ViewFIles',/*el ojito para ver todos los archivos cargados del invoice storage */
	},
	FileManager: {
		Uploadfiles: 'Uploadfiles',/*dags and drag and drop */
		ViewUploadFiles: 'ViewUploadFiles', /*drag and drops and media list*/
		PostForm: 'PostForm',
	},
	FileStorage: {
		RenderPage: 'RenderPage', /*TAB FILE STORAGE */
		PostFIles: 'PostFIles', /*btn save */
		Uploadfiles: 'Uploadfiles', /*drag and dorp and media list*/
		ViewFileManager: 'ViewFileManager',
	},
	UploadPackslip: {
		RenderuploadFilesPackslip: 'RenderuploadFilesPackslip', /*TAB FILE STORAGE */
		UploadPackslipPostFiles: 'UploadPackslipPostFiles', /*btn save */

	}




}

export const TABS = {
	Available: 'available',
	ToPay: 'to_pay',
	Finished: 'finished',
}