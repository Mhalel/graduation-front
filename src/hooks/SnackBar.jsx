/* eslint-disable prettier/prettier */
import { createContext, useState, useContext, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "./LangContext";
import { X } from "lucide-react";
import { useAuth } from "./AuthContext";
import { t } from "@/lib/utils";
import { useNotificationsApi } from "./NotificationContext";

const SnackbarContext = createContext();

export const useSnackbar = () => {
	const context = useContext(SnackbarContext);
	if (!context) throw new Error("useSnackbar must be used within a SnackbarProvider");

	return context;
};

// Function to detect and convert URLs to anchor tags
const formatMessageWithLinks = (message) => {
	const urlRegex = /(https?:\/\/[^\s]+)/g;
	return message.split(urlRegex).map((part, index) => {
		if (part.match(urlRegex)) {
			return (
				<a
					key={index}
					href={part}
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-300 underline hover:text-blue-200"
				>
					{part}
				</a>
			);
		}
		return part;
	});
};

export const SnackbarProvider = ({ children }) => {
	const { lang } = useLang();
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarTitle, setSnackbarTitle] = useState("");
	const [snackbarType, setSnackbarType] = useState("default");
	const { account, socket, unseenMessagesCount, setUnseenMessagesCount } = useAuth();
	const { setUnseenNotifications, setUnseenCount } = useNotificationsApi();

	const openSnackbar = (message, options = {}) => {
		const { title = "", type = "default" } = options;

		setSnackbarMessage(message);
		setSnackbarTitle(title);
		setSnackbarType(type);
		setSnackbarOpen(true);

		setTimeout(() => {
			closeSnackbar();
		}, options.duration || 6000);
	};

	const closeSnackbar = () => {
		setSnackbarOpen(false);
		setSnackbarMessage("");
		setSnackbarTitle("");
		setSnackbarType("default");
	};

	const getTypeStyles = (type) => {
		switch (type) {
			case "success":
				return "bg-green-600";
			case "error":
				return "bg-red-600";
			case "warning":
				return "bg-yellow-600";
			case "signal":
				return "animated-gradient";
			case "notification":
				return "bg-[#6C569E]";
			default:
				return "bg-[#6240c0]";
		}
	};

	const variants = {
		initial: {
			x: lang === "ar" ? "-100%" : "100%",
			opacity: 0,
		},
		animate: {
			x: 0,
			opacity: 1,
			transition: {
				type: "spring",
				stiffness: 100,
				damping: 20,
			},
		},
		exit: {
			x: lang === "ar" ? "-100%" : "100%",
			opacity: 0,
			transition: {
				type: "spring",
				stiffness: 100,
				damping: 20,
			},
		},
	};

	useEffect(() => {
		if (!socket) return;

		socket.on("newInvite", (data) => {
			console.log(data, "newInvite");
			setUnseenNotifications((pv) => [...pv, data]);
			setUnseenCount((pv) => pv + 1);
			openSnackbar(t("لديك إشعار جديد", "You have a new notification", lang), { type: "success" });
		});

		socket.on("newConsultation", (data) => {
			console.log(data, "newConsultation");
			setUnseenNotifications((pv) => [...pv, data]);
			setUnseenCount((pv) => pv + 1);
			openSnackbar(t("لديك إشعار جديد", "You have a new notification", lang), { type: "success" });
		});

		socket.on("consultationReview", (data) => {
			console.log(data, "consultationReview");
			setUnseenNotifications((pv) => [...pv, data]);
			setUnseenCount((pv) => pv + 1);
			openSnackbar(t("لديك إشعار جديد", "You have a new notification", lang), { type: "success" });
		});

		socket.on("consultationUpload", (data) => {
			console.log(data, "consultationUpload");
			setUnseenNotifications((pv) => [...pv, data]);
			setUnseenCount((pv) => pv + 1);
			openSnackbar(t("لديك إشعار جديد", "You have a new notification", lang), { type: "success" });
		});
		socket.on("newMessageR", (data) => {
			console.log(data, "newMessageR");
			setUnseenNotifications((pv) => [...pv, data]);
			setUnseenMessagesCount((pv) => pv + 1);
			setUnseenCount((pv) => pv + 1);
			openSnackbar(t(`لديك رسالة جديدة من ${data?.sender}`, `You have a new message from ${data?.sender}`, lang), { type: "notification" });
		});

		socket.on("consultationDocumentReview", (data) => {
			console.log(data, "consultationDocumentReview");
			setUnseenNotifications((pv) => [...pv, data]);
			setUnseenCount((pv) => pv + 1);
			openSnackbar(t("لديك إشعار جديد", "You have a new notification", lang), { type: "success" });
		});
		socket.on("new-task", (data) => {
			console.log(data, "new-task");
			setUnseenNotifications((pv) => [...pv, data]);
			setUnseenCount((pv) => pv + 1);
			openSnackbar(t("لديك إشعار جديد", "You have a new notification", lang), { type: "success" });
		});
		socket.on("landApprovalRequest", (data) => {
			setUnseenNotifications((pv) => [...pv, data]);
			setUnseenCount((pv) => pv + 1);
			openSnackbar(t("طلب الموافقة على أرض جديدة", "New land approval request", lang), { type: "notification" });
		});
		socket.on("investmentRequest", (data) => {
			console.log(data, "investmentRequest");
			setUnseenNotifications((pv) => [...pv, data]);
			setUnseenCount((pv) => pv + 1);
			openSnackbar(t("طلب استثمار جديد", "New investment request", lang), { type: "notification" });
		});

		return () => {
			socket.off("consultationDocumentReview");
			socket.off("consultationReview");
			socket.off("consultationUpload");
			socket.off("newConsultation");
			socket.off("newInvite");
			socket.off("newMessageR");
		};
	}, [socket, account]);

	return (
		<SnackbarContext.Provider value={{ openSnackbar, closeSnackbar }}>
			{children}
			<AnimatePresence>
				{snackbarOpen && (
					<motion.div
						className={`fixed top-44 z-[99999] max-w-[400px] ${lang === "ar" ? "left-10" : "right-10"
							} mx-auto w-fit rounded-lg ${getTypeStyles(
								snackbarType,
							)} p-4 text-lg font-semibold text-white`}
						initial="initial"
						animate="animate"
						exit="exit"
						variants={variants}
					>
						<div className="relative"></div>
						<button
							onClick={closeSnackbar}
							className="absolute right-2 top-2 rounded-full p-1 transition-colors hover:bg-white/20"
							aria-label="Close notification"
						>
							<X size={16} />
						</button>
						{snackbarTitle && <h3 className="mb-2 pr-6 font-bold">{snackbarTitle}</h3>}
						<p className="pr-6">{formatMessageWithLinks(snackbarMessage)}</p>
					</motion.div>
				)}
			</AnimatePresence>
		</SnackbarContext.Provider>
	);
};
