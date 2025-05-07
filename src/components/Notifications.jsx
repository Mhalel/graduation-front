/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import {
	CircleCheckBig,
	Dot,
	Plus,
	Send,
	FileText,
	FilePlus,
	CheckCircle,
	XCircle,
	Eye,
	Zap,
	CircleUser,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import { useLang } from "../hooks/LangContext";
// import NotificationApi from "@/Api/NotificationApi";

function Notifications({ setIsNotificationOpend }) {
	const { lang } = useLang();
	const notificationsWrapper = useRef(null);
	const { auth } = useAuth();
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [noMoreData, setNoMoreData] = useState(false);
	const location = useLocation();
	const limit = 6;

	// // Initial data fetch
	// useEffect(() => {
	// 	const fetchInitialData = async () => {
	// 		setLoading(true);
	// 		try {
	// 			const res = await NotificationApi.getNotifications(auth, 1, limit);
	// 			setData(res.data.data);
	// 			console.log("🚀 ~ fetchInitialData ~ res.data.data:", res.data.data)
	// 			setTotalPages(res.data.totalPages);
	// 			setCurrentPage(1);
	// 			if (res.data.totalPages <= 1) {
	// 				setNoMoreData(true);
	// 			}
	// 		} catch (error) {
	// 			console.error("Error fetching notifications:", error);
	// 		} finally {
	// 			setLoading(false);
	// 		}

	// 	};

	// 	fetchInitialData();
	// }, [auth]);

	// Scroll handler
	// const handleScroll = useCallback(async () => {
	// 	if (!notificationsWrapper.current || isLoadingMore || currentPage >= totalPages) return;

	// 	const { scrollTop, scrollHeight, clientHeight } = notificationsWrapper.current;
	// 	const scrollThreshold = 50; // pixels from bottom

	// 	if (scrollHeight - (scrollTop + clientHeight) < scrollThreshold) {
	// 		if (isLoadingMore || currentPage >= totalPages) return;

	// 		setIsLoadingMore(true);
	// 		try {
	// 			const nextPage = currentPage + 1;
	// 			const res = await NotificationApi.getNotifications(auth, nextPage, limit);

	// 			// Only append new data if we got some
	// 			if (res.data.data.length > 0) {
	// 				setData((prevData) => [...prevData, ...res.data.data]);
	// 				setCurrentPage(nextPage);
	// 				setTotalPages(res.data.totalPages);
	// 				if (nextPage >= res.data.totalPages) {
	// 					setNoMoreData(true);
	// 				}
	// 			}
	// 		} catch (error) {
	// 			console.error("Error loading more notifications:", error);
	// 		} finally {
	// 			setIsLoadingMore(false);
	// 		}
	// 	}
	// }, [isLoadingMore, currentPage, totalPages]);

	// Add scroll listener
	// useEffect(() => {
	// 	const wrapper = notificationsWrapper.current;
	// 	if (wrapper) {
	// 		wrapper.addEventListener("scroll", handleScroll);
	// 		return () => wrapper.removeEventListener("scroll", handleScroll);
	// 	}
	// }, [handleScroll]);

	// Click outside handler
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (notificationsWrapper.current && !notificationsWrapper.current.contains(event.target)) {
				setIsNotificationOpend(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [setIsNotificationOpend]);

	const getNotificationColor = (type, read) => {
		if (read) return "#9a9dfe";

		switch (type) {
			case "consultation":
				return "#3034a1";
			case "approval":
				return "#22c55e";
			case "rejection":
				return "#ef4444";
			default:
				return "#3034a1";
		}
	};

	const DynamicIcon = ({ iconName, size, color }) => {
		switch (iconName) {
			case "plus":
				return <Plus size={size || 16} color={color} />;
			case "dot":
				return <Dot size={size || 16} color={color} />;
			case "circle-check-big":
				return <CircleCheckBig size={size || 16} color={color} />;
			case "send":
				return <Send size={size || 16} color={color} />;
			case "file-plus":
				return <FilePlus size={size || 16} color={color} />;
			case "file-text":
				return <FileText size={size || 16} color={color} />;
			case "circle-check":
				return <CheckCircle size={size || 16} color={color} />;
			case "x-circle":
				return <XCircle size={size || 16} color={color} />;
			case "eye":
				return <Eye size={size || 16} color={color} />;
			case "zap":
				return <Zap size={size || 16} color={color} />;
			case "circle-user":
				return <CircleUser size={size || 16} color={color} />;
			default:
				return <Dot size={size || 16} color={color} />;
		}
	};

	const SkeletonLoader = () => (
		<div className="flex w-full flex-col items-center justify-start gap-y-3">
			{[...Array(3)].map((_, index) => (
				<div
					key={index}
					className="flex w-full animate-pulse items-center justify-between gap-7 rounded-md bg-slate-100 p-2"
				>
					<div className="h-4 w-3/4 rounded bg-gray-300"></div>
					<div className="h-4 w-1/4 rounded bg-gray-300"></div>
				</div>
			))}
		</div>
	);

	const formatDate = (dateString) => {
		const date = parseISO(dateString);
		const now = new Date();
		const differenceInHours = (now - date) / (1000 * 60 * 60);
		const locale = lang === "ar" ? ar : enUS;

		if (differenceInHours < 48) {
			return formatDistanceToNow(date, { addSuffix: true, locale });
		} else {
			return format(date, "yyyy-MM-dd HH:mm", { locale });
		}
	};

	// const markAsRead = async (id) => {
	// 	try {
	// 		await NotificationApi.markAsRead(id, auth);
	// 		setData((prevData) =>
	// 			prevData.map((notification) =>
	// 				notification._id === id ? { ...notification, read: true } : notification,
	// 			),
	// 		);
	// 	} catch (error) {
	// 		console.error("Error marking notification as read:", error);
	// 	}
	// };

	return (
		<div
			ref={notificationsWrapper}
			dir={lang === "ar" ? "rtl" : "ltr"}
			style={
				location.pathname.includes("/admin")
					?
					lang === "ar" ? { left: "2.5rem" } : { right: "2.5rem" }

					: lang === "ar"
						? { left: "2.5rem" }
						: { left: "2.5rem" }
			}
			className="flex h-[60vh] w-[550px] flex-col items-start justify-start gap-2 overflow-y-auto rounded-xl bg-white p-3 shadow-2xl"
		>
			<span className="text-xl font-bold text-[#9a9dfe]">
				{lang === "ar" ? "الإشعارات" : "Notifications"}
			</span>
			<div className="flex h-full w-full flex-col items-center justify-start gap-y-3">
				{loading ? (
					<SkeletonLoader />
				) : data?.length === 0 ? (
					<div className="flex h-full w-full items-center justify-center text">
						<h1 className="text-2xl capitalize text-[#09090B]">
							{lang !== "ar" ? "there is no new notifications" : "لا يوجد اشعارات جديدة"}
						</h1>
					</div>
				) : (
					<>
						{data?.map((notification) => (
							<Link
								dir={lang === "ar" ? "rtl" : "ltr"}
								key={notification._id}
								// onClick={() => markAsRead(notification._id)}
								className={`flex w-full items-start justify-between gap-7 rounded-md p-2 ${notification.read ? "bg-slate-100" : "bg-slate-50 shadow-md"}`}
								to={notification.actionLink || ""}
							>
								<div
									dir={lang === "ar" ? "rtl" : "ltr"}
									style={notification.read ? {} : { color: "#3034a1" }}
									className="flex w-full flex-col items-start justify-between gap-y-3"
								>
									<span>{lang === "ar" ? notification.content.ar : notification.content.en}</span>
									<span className="flex items-center justify-center gap-2 text-sm text-gray-500">
										{formatDate(notification.createdAt)}
										{!notification.read && (
											<Dot size={24} color={getNotificationColor(notification.type, false)} />
										)}
									</span>
								</div>
								<span title={notification.type} className="self-center">
									{notification.icon && (
										<DynamicIcon
											size={28}
											color={getNotificationColor(notification.type, notification.read)}
											iconName={notification.icon}
										/>
									)}
								</span>
							</Link>
						))}
						{isLoadingMore && <SkeletonLoader />}
						{noMoreData && (
							<div className="flex h-full w-full items-center justify-center">
								<h1 className="my-2 text-2xl capitalize">
									{lang !== "ar" ? "No more notifications" : "لا يوجد المزيد من الإشعارات"}
								</h1>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
}

export default Notifications;
