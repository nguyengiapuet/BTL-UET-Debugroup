import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SummaryApi from "../../../../common";
import { useParams } from "react-router-dom";

export function usePenData() {
	const params = useParams();
	const [dataPen, setDataPen] = useState({
		html: "",
		css: "",
		js: "",
		title: "Untitled",
		output: "",
	});

	const handleOnchanePen = (value, type) => {
		setDataPen({ ...dataPen, [type]: value });
	};

	console.log("dataPen", dataPen);

	const editCode = () => {
		const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>body{color: white}${dataPen.css}</style>
        </head>
        <body>
          ${dataPen.html}
          <script>
            try {
              ${dataPen.js}
            } catch(err) {
              console.error(err);
            }
          </script>
        </body>
      </html>
    `;
		setDataPen({ ...dataPen, output: content });
	};

	const handleCreatPens = async () => {
		try {
			const response = await axios.post(SummaryApi.createPens.url, {
				title: dataPen.title,
				html: dataPen.html,
				css: dataPen.css,
				js: dataPen.js,
				output: dataPen.output,
			});

			if (response.data.success) {
				toast.success(response.data.message);
			}
		} catch (err) {
			console.log(err.message);
		}
	};

	const handleSavePens = async () => {
		try {
			if (params.id === undefined) {
				await handleCreatPens();
			} else {
				const response = await axios.put(
					`${SummaryApi.updatePens.url}/${params.id}`,
					{
						title: dataPen.title,
						html: dataPen.html,
						css: dataPen.css,
						js: dataPen.js,
						output: dataPen.output,
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
		handleOnchanePen,
		handleSavePens,
	};
}
