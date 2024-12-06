import { createContext, useContext, useEffect, useState } from "react";
const ModalContext = createContext();
export const useModalContext = () => {
	return useContext(ModalContext);
};
const ModalAnswer = ({ children }) => {
	const [isLoadingModal, setIsLoadingModal] = useState(false);
	const [content, setContent] = useState();
	useEffect(() => {
		isLoadingModal
			? (document.body.style.overflow = "hidden")
			: (document.body.style.overflow = "scroll");
	}, [isLoadingModal]);
	const openModal = (content) => {
		setContent(content);
		setIsLoadingModal(true);
	};
	return (
		<ModalContext.Provider
			value={{
				openModal,
			}}
		>
			{children}
			{isLoadingModal && (
				<div
					className="fixed inset-0 z-20 flex items-center justify-center bg-gray-100/40"
					onClick={() => setIsLoadingModal(!isLoadingModal)}
				>
					{content}
				</div>
			)}
		</ModalContext.Provider>
	);
};
export default ModalAnswer;
