import { useEffect, useState } from "react";
export function PenQuestion() {
	const [dataPen, setDataPen] = useState({
		js: "",
		output: "",
	});
	const handleOnChangePen = (value, type) => {
		setDataPen({ ...dataPen, [type]: value });
	};
	const editCode = () => {
		const content = `
      <!DOCTYPE html>
      <html>
        <head>
        </head>
        <body>
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
	useEffect(() => {
		editCode();
	}, [dataPen.js]);
	return {
		dataPen,
		handleOnChangePen,
		setDataPen,
	};
}
