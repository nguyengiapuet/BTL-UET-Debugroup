import { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import {
	FaEnvelope,
	FaFacebook,
	FaInstagram,
	FaLocationArrow,
	FaPhone,
	FaTiktok,
	FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../contact-us/styles.css";
const Contact = () => {
	const { infoForm, setInfoForm } = useContext(AuthContext);

	useEffect(() => {
		document.title = "Contact us";
	}, []);
	useEffect(() => {
		const savedData = localStorage.getItem("formData");
		if (savedData) {
			setInfoForm(JSON.parse(savedData));
		}
	}, [setInfoForm]);

	useEffect(() => {
		localStorage.setItem("formData", JSON.stringify(infoForm));
	}, [infoForm]);
	const handleSubmit = (e) => {
		e.preventDefault();
		toast.success(
			"Gửi liên hệ thành công! Chúng mình sẽ phản hồi bạn trong thời gian sớm nhất."
		);
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setInfoForm((pre) => ({
			...pre,
			[name]: value,
		}));
	};
	return (
		<div className="relative w-full min-h-screen bg-gray-100 flex items-center justify-center p-8">
			<ToastContainer
				className="mt-10"
				position="top-right"
				autoClose={2000}
			/>

			<div className="relative w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2">
				<div className="p-8 relative">
					<h3 className="text-2xl font-semibold text-teal-500">
						Let's get in touch
					</h3>
					<p className="mt-4 text-gray-600">
						We always listens and accepts all your comments and
						contributions. Please contact us by filling in the form
						below. We will respond to you as soon as possible.
					</p>

					<div className="mt-8 space-y-4">
						<div className="flex items-center space-x-4 text-gray-500">
							<FaLocationArrow />
							<p> E3, 144 Xuân Thủy, Cầu Giấy, Hà Nội</p>
						</div>
						<div className="flex items-center space-x-4 text-gray-500">
							<FaEnvelope />
							<p>Danh@gmail.com</p>
						</div>
						<div className="flex items-center space-x-4 text-gray-500">
							<FaPhone />
							<p>123-456-789</p>
						</div>
					</div>

					<div className="mt-8">
						<p className="text-gray-600">Connect with us:</p>
						<div className="flex space-x-4 mt-4">
							<Link
								className="w-9 h-9 bg-teal-500 hover:bg-teal-600 rounded-md flex items-center justify-center text-white transition"
								to={"https://www.facebook.com/best.the.1238"}
								target="blank"
							>
								<FaFacebook />
							</Link>
							<Link
								className="w-9 h-9 bg-teal-500 hover:bg-teal-600 rounded-md flex items-center justify-center text-white transition"
								to={"https://www.youtube.com/@danhphaninh7715"}
								target="blank"
							>
								<FaYoutube />
							</Link>
							<Link
								className="w-9 h-9 bg-teal-500 hover:bg-teal-600 rounded-md flex items-center justify-center text-white transition"
								to={"https://www.facebook.com/best.the.1238"}
								target="blank"
							>
								<FaInstagram />
							</Link>

							<Link
								className="w-9 h-9 bg-teal-500 hover:bg-teal-600 rounded-md flex items-center justify-center text-white transition"
								to={"https://www.facebook.com/best.the.1238"}
								target="blank"
							>
								<FaTiktok />
							</Link>
						</div>
					</div>
				</div>
				<div className="relative bg-teal-500 p-8 text-white">
					<div className="absolute w-32 h-32 bg-teal-700 opacity-30 rounded-full top-16 -right-10"></div>
					<div className="absolute w-20 h-20 bg-teal-700 opacity-30 rounded-full top-4 right-16"></div>

					<form
						autoComplete="off"
						className="space-y-6 "
						onSubmit={handleSubmit}
					>
						<h3 className="text-2xl font-semibold">Contact us</h3>

						<div className="relative form-group">
							<input
								type="text"
								name="name"
								className="w-full p-3 rounded-full bg-transparent border-2 border-white placeholder-white focus:outline-none focus:border-teal-700 transition"
								placeholder="Username"
								value={infoForm.name}
								onChange={handleChange}
								required
							/>
						</div>

						<div className="relative form-group">
							<input
								type="email"
								name="email"
								value={infoForm.email}
								onChange={handleChange}
								className="w-full p-3 rounded-full bg-transparent border-2 border-white placeholder-white focus:outline-none focus:border-teal-700 transition"
								placeholder="Email"
								required
								pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
							/>
							<p class="error">Vui lòng nhập đúng email</p>
						</div>

						<div className="relative form-group">
							<input
								type="tel"
								name="phone"
								className="w-full p-3 rounded-full bg-transparent border-2 border-white placeholder-white focus:outline-none focus:border-teal-700 transition"
								placeholder="Phone"
								value={infoForm.phone}
								onChange={handleChange}
								required
								pattern="^(0|\+?84)(3|5|7|8|9)[0-9]{8}$"
							/>
							<p class="error">
								Vui lòng nhập đúng số điện thoại
							</p>
						</div>

						<div className="relative">
							<textarea
								name="message"
								rows="4"
								className="w-full p-3 rounded-lg bg-transparent border-2 border-white placeholder-white focus:outline-none focus:border-teal-700 transition"
								placeholder="Message"
								value={infoForm.message}
								onChange={handleChange}
								required
							></textarea>
						</div>
						<button className="btn submit-btn w-full py-3 bg-white text-teal-500 font-semibold rounded-full hover:bg-black  hover:text-white border-white transition ">
							Send
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Contact;
