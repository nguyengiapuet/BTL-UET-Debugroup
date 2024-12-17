import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import SummaryApi from "../../../../common";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import { message } from "antd";

export function usePenData() {
	const params = useParams();
	const { userData } = useContext(AuthContext);
	const [dataPen, setDataPen] = useState({
		html: "",
		css: "",
		js: "",
		title: "Untitled",
		output: "",
		status: "",
		email: "",
	});
	const navigate = useNavigate();

	const handleOnchanePen = (value, type) => {
		setDataPen({ ...dataPen, [type]: value });
		console.log("dataPen>>>>>>>>", dataPen);
	};

	// console.log("dataPen", dataPen);

	const editCode = () => {
		const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              color: white;
              background-color: #000; /* Optional: Set a background color */
            }
            ${dataPen.css}
          </style>
        </head>
        <body>
          ${dataPen.html}
          <script>
            // Ensure the script runs after the DOM is fully loaded
            document.addEventListener('DOMContentLoaded', () => {
              try {
               
                // Your drawing logic here...
                // Example: ctx.fillStyle = 'red'; ctx.fillRect(10, 10, 50, 50);
                ${dataPen.js}
              } catch (err) {
                console.error(err);
              }
            });
          </script>
        </body>
      </html>
    `;
		setDataPen({ ...dataPen, output: content });
	};

	const handleCreatPens = async (isPublic) => {
		try {
			const response = await axios.post(SummaryApi.createPens.url, {
				title: dataPen.title,
				html: dataPen.html,
				css: dataPen.css,
				js: dataPen.js,
				output: dataPen.output,
				status: isPublic ? "public" : "private",
			});

			if (response.data.success) {
				message.success(response.data.message);
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	// Handle save pen: check duplicate name of project by user, if ok -> save pen.
	const handleCheckDuplicatePen = async () => {
		try {
			const response = await axios.post(
				SummaryApi.checkDuplicatePen.url,
				{
					title: dataPen.title,
				}
			);
			const temp = await response.data;
			console.log(temp.message);
			return temp.message;
		} catch (err) {
			console.log(err.message);
		}
	};
	const handleSavePens = async (isPublic) => {
		if (!userData.id) {
			toast.error("Please login to create your pens");
			navigate("/login", { replace: true });
			return;
		}
		try {
			if (params.id === undefined) {
				// if duplicate isDuplicate = "Duplicated" else  = "Non duplicate"
				const isDuplcicate = await handleCheckDuplicatePen();
				console.log("Test duplicate:", isDuplcicate);
				if (isDuplcicate !== "Non Duplicated") {
					return isDuplcicate;
				}
				await handleCreatPens(isPublic);
			} else {
				const response = await axios.put(
					`${SummaryApi.updatePens.url}/${params.id}`,
					{
						title: dataPen.title,
						html: dataPen.html,
						css: dataPen.css,
						js: dataPen.js,
						output: dataPen.output,
						status: isPublic ? "public" : "private",
					}
				);

				if (response.data.success) {
					toast.success(response.data.message);
				}
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	const handleLoadPens = async () => {
		try {
			const response = await axios.get(
				`${SummaryApi.getPens.url}/${params.id}`
			);
			if (response.data.success) {
				console.log("response.data.data", response.data.data);
				setDataPen(response.data.data);

				console.log("response.data.message", response.data.message);
			} else {
				console.log("response.data.message", response.data.message);
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	useEffect(() => {
		if (params.id !== undefined) {
			handleLoadPens();
		}
	}, []);

	useEffect(() => {
		editCode();
	}, [dataPen.html, dataPen.css, dataPen.js]);

	return {
		dataPen,
		setDataPen,
		handleOnchanePen,
		handleSavePens,
	};
}
