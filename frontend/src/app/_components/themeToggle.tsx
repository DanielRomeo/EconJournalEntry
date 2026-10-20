"use client";

import { useEffect, useState } from "react";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import Styles from "./_styles/themeToggle.module.scss";

type Theme = "dark" | "light";

const ThemeToggle = () => {
	const [theme, setTheme] = useState<Theme>("light");

	useEffect(() => {
		const syncTheme = () => setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
		syncTheme();
		const observer = new MutationObserver(syncTheme);
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
		return () => observer.disconnect();
	}, []);

	const toggleTheme = () => {
		const currentTheme: Theme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
		const nextTheme: Theme = currentTheme === "dark" ? "light" : "dark";
		document.documentElement.dataset.theme = nextTheme;
		localStorage.setItem("journal-entry-theme", nextTheme);
		setTheme(nextTheme);
	};

	return (
		<button className={Styles.toggle} type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
			{theme === "dark" ? <HiOutlineSun /> : <HiOutlineMoon />}
		</button>
	);
};

export default ThemeToggle;
