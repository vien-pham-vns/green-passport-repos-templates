import DisplayCheckboxField from "@/components/application-detail/display-checkbox-field";
import { CentralLabBranch } from "@/types/central-lab-form";

const branches = [
	{
		name: "TABK สาขากรุงเทพ / Bangkok Branch",
		address: "2179 ถ.พหลโยธิน แขวงลาดยาว เขตจตุจักร กรุงเทพมหานคร 10900",
		phone: "02-9406881-3, 02-5614388",
		fax: "02-5794895",
		email: "sample_bk1@centrallabthai.com",
		value: CentralLabBranch.BANGKOK,
	},
	{
		name: "TAKK สาขาขอนแก่น / Khon Kaen Branch",
		address: "117/4 หมู่ 14 ต.ในเมือง อ.เมืองขอนแก่น จ.ขอนแก่น 40000",
		phone: "043-247704-6, 086-3419272",
		fax: "043-247703",
		email: "centrallabthai-kk@hotmail.com",
		value: CentralLabBranch.KHON_KAEN,
	},
	{
		name: "TACS สาขาฉะเชิงเทรา / Chachoengsao Branch",
		address: "36/6 หมู่ 8 ต.ท่าสะอ้าน อ.บางปะกง จ.ฉะเชิงเทรา 24130",
		phone: "038-533476-9",
		fax: "038-533475",
		email: "sample_cs@centrallabthai.com",
		value: CentralLabBranch.CHACHOENGSAO,
	},
	{
		name: "TACM สาขาเชียงใหม่ / Chiang Mai Branch",
		address: "164/86 หมู่ 3 ต.ดอนแก้ว อ.แม่ริม จ.เชียงใหม่ 50180",
		phone: "053-896131, 086-3419271",
		fax: "053-896052",
		email: "sample_cm@centrallabthai.com",
		value: CentralLabBranch.CHIANG_MAI,
	},
	{
		name: "TASK สาขาสงขลา / Songkhla Branch",
		address: "9/116 ถ.กาญจนวนิช ต.เขารูปช้าง อ.เมืองสงขลา จ.สงขลา 90110",
		phone: "074-558871-3, 086-3771636",
		fax: "074-558870",
		email: "sample_sk@centrallabthai.com",
		value: CentralLabBranch.SONGKHLA,
	},
	{
		name: "TASS สาขาสมุทรสาคร / Samut Sakhon Branch",
		address: "23/13 หมู่ 9 ต.โคกขาม อ.เมืองสมุทรสาคร จ.สมุทรสาคร 74000",
		phone: "034-410881-3",
		fax: "034-410884",
		email: "sample_ss@centrallabthai.com",
		value: CentralLabBranch.SAMUT_SAKHON,
	},
];

type Branch = {
	name: string;
	address: string;
	phone: string;
	fax: string;
	email: string;
	value: CentralLabBranch;
};

const BranchItem = ({
	branch,
	isSelected,
}: {
	branch: Branch;
	isSelected: boolean;
}) => {
	return (
		<div className="flex items-start gap-2 w-[45%]">
			<DisplayCheckboxField isSelected={isSelected} />
			<div>
				<p className="font-bold">{branch.name}</p>
				<p>{branch.address}</p>
				<p>
					{`Tel. ${branch.phone} Fax. ${branch.fax}, E-mail : ${branch.email}`}
				</p>
			</div>
		</div>
	);
};

export default function ApplicationDetailBranches({
	selectedBranch,
}: {
	selectedBranch: string;
}) {
	return (
		<div className="flex justify-between flex-wrap text-[12px] mb-4 space-y-2">
			{branches.map((branch) => (
				<BranchItem
					key={branch.name}
					branch={branch}
					isSelected={branch.value === selectedBranch}
				/>
			))}
		</div>
	);
}
