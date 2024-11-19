import { useState, useEffect } from "react";

export function usePenData() {
	const [dataPen, setDataPen] = useState({
		html: "",
		css: "",
		js: "",
		title: "",
		output: "",
	});

	const handleOnchanePen = (value, type) => {
		setDataPen({ ...dataPen, [type]: value });
	};

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

	const handleCreatPens = async () => {};

	const handleSavePens = async () => {};

	const handleLoadPens = async () => {};

	useEffect(() => {
		editCode();
	}, [dataPen.html, dataPen.css, dataPen.js]);

	return {
		dataPen,
		handleOnchanePen,
		handleSavePens,
	};
}
