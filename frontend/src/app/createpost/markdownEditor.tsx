// components/MarkdownEditor.tsx
import React from "react";
import Markdown from "react-markdown"; // Direct import
import Styles from "../_styles/CreatePost/MarkdownEditor.module.scss";

interface MarkdownProps {
	value: string;
}

const MarkdownEditor: React.FC<MarkdownProps> = ({ value }) => {
	return (
		<div className={Styles.markdownContainer}>{<Markdown>{value}</Markdown>}</div>
	);
};

export default MarkdownEditor;
