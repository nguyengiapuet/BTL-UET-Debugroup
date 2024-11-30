import axios from "axios";
import SummaryApi from "../../../common";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { Link, Outlet } from "react-router-dom";

const LearnJs = () => {
	return (
		<div className="bg-purple-400 h-[700px] px-[300px] py-[100px] flex justify-center items-center">
			<div className="px-[50px] py-[50px] bg-slate-600 shadow-2xl flex rounded-lg gap-4">
				<div className="px-4 py-2 bg-slate-400 rounded-md cursor-pointer hover:bg-[red]">
					<Link to={"game1"}>Cấp 1</Link>
				</div>
				<button className="px-4 py-2 bg-slate-400 rounded-md cursor-pointer">
					Cấp 2
				</button>
			</div>
		</div>
	);
};
export default LearnJs;
