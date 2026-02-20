import {AiFillDelete, AiFillEdit, AiFillFile, AiFillFolderOpen} from 'react-icons/ai'
import {BiCollapseVertical, BiLinkAlt, BiSolidShow, BiUnlink} from 'react-icons/bi'
import {
	BsClockFill,
	BsDatabaseFillSlash,
	BsExclamationTriangleFill,
	BsFillPeopleFill,
} from 'react-icons/bs'
import {CiDiscount1} from 'react-icons/ci'
import {
	FaChevronUp,
	FaFolder,
	FaFolderOpen,
	FaLock,
	FaPercentage,
	FaPlay,
	FaStop,
	FaUnlock,
} from 'react-icons/fa'
import {
	FaArrowRightLong,
	FaBoxesStacked,
	FaCartShopping,
	FaCircleCheck,
	FaCircleInfo,
	FaClipboardList,
	FaFileCirclePlus,
	FaImage,
	FaMoneyBillWave,
	FaMoneyCheckDollar,
	FaWarehouse,
} from 'react-icons/fa6'
import {GiPayMoney} from 'react-icons/gi'
import {GoHomeFill} from 'react-icons/go'
import {GrTransaction} from 'react-icons/gr'
import {HiFilter, HiReceiptTax, HiUserCircle} from 'react-icons/hi'
import {HiMiniMinusCircle} from 'react-icons/hi2'
import {IoIosCloseCircle} from 'react-icons/io'
import {IoSearch} from 'react-icons/io5'
import {LuCopy, LuWrench} from 'react-icons/lu'
import {
	MdCheckBox,
	MdEditCalendar,
	MdOutlineAttachEmail,
	MdOutlineCheckBox,
	MdOutlineCheckBoxOutlineBlank,
	MdOutlineControlPointDuplicate,
	MdOutlineDraw,
	MdOutlineExpandLess,
	MdOutlineExpandMore,
} from 'react-icons/md'
import {PiBroomFill} from 'react-icons/pi'
import {RiAddCircleFill, RiExpandUpDownLine, RiProductHuntFill} from 'react-icons/ri'
import {SiMicrosoftexcel} from 'react-icons/si'
import {SlOptionsVertical} from 'react-icons/sl'
import {
	TbCalendarStats,
	TbDownload,
	TbLogout2,
	TbPlayerPlayFilled,
	TbPlayerTrackNextFilled,
	TbReportMoney,
} from 'react-icons/tb'
import {TfiReload} from 'react-icons/tfi'

export const Icons = {
	Options: {
		Options: SlOptionsVertical,
		Delete: AiFillDelete,
		Edit: AiFillEdit,
		Clone: MdOutlineControlPointDuplicate,
		Show: BiSolidShow,
		Download: TbDownload,
		AttachEmail: MdOutlineAttachEmail,
		File: AiFillFile,
		FileAdd: FaFileCirclePlus,
		FolderOpen: AiFillFolderOpen,
		Image: FaImage,
		Draw: MdOutlineDraw,
		Info: FaCircleInfo,
		Minus: HiMiniMinusCircle,
		Add: RiAddCircleFill,
		Excel: SiMicrosoftexcel,
		Stop: FaStop,
		Play: FaPlay,
	},
	Searching: {
		Clear: PiBroomFill,
		Search: IoSearch,
		Filter: HiFilter,
	},
	Pay: {
		Discount: CiDiscount1,
		MoneyCheck: FaMoneyCheckDollar,
		PayMoney: GiPayMoney,
		MoneyBillWave: FaMoneyBillWave,
		Percentage: FaPercentage,
		ReportMoney: TbReportMoney,
		Taxes: HiReceiptTax,
	},
	Misc: {
		Lock: FaLock,
		Unlock: FaUnlock,
		Link: BiLinkAlt,
		Unlink: BiUnlink,
		Arrow: FaChevronUp,
		ArrowLong: FaArrowRightLong,
		Close: IoIosCloseCircle,
		Check: FaCircleCheck,
		PlayerPlayFilled: TbPlayerPlayFilled,
		PlayerTrackNextFilled: TbPlayerTrackNextFilled,
		Clock: BsClockFill,
		NoData: BsDatabaseFillSlash,
		Reload: TfiReload,
		Warning: BsExclamationTriangleFill,
		People: BsFillPeopleFill,
		Home: GoHomeFill,
		User: HiUserCircle,
		Logout: TbLogout2,
		Clipboard: FaClipboardList,
		Copy: LuCopy,
		Calendar: TbCalendarStats,
		EditCalendar: MdEditCalendar,
		Cart: FaCartShopping,
		StackBox: FaBoxesStacked,
		WareHouse: FaWarehouse,
		Transaction: GrTransaction,
		Product: RiProductHuntFill,
		Wrench: LuWrench,
	},
	CHECKBOXTREE: {
		Check: MdCheckBox,
		Uncheck: MdOutlineCheckBoxOutlineBlank,
		HalfCheck: MdOutlineCheckBox,
		ExpandClose: MdOutlineExpandLess,
		ExpandOpen: MdOutlineExpandMore,
		ExpandAll: RiExpandUpDownLine,
		CollapseAll: BiCollapseVertical,
		ParentClose: FaFolder,
		ParentOpen: FaFolderOpen,
		Leaf: FaWarehouse,
	},
}

export default Icons
